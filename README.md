## Shift Finder

This is a REST endpoint that allows a worker to find available shifts at a facility after the following requirements are met

- The Facility must be active
- The Shift must be active
- The Worker must be active
- The Shift must not be claimed by someone else
- The Worker must have all of the facility's required documents
- The professions between the Shift and Worker must match

## API Design choices and assumptions

Endpoint: `/v1/schedule/findshifts?workerId=1&facilityId=2&professionId=3`

The above endpoint is constructed like this to facilitate searching explicity with parameters.
In the actual application, `workerId` and `professionId` would not be part of this endpoint, as it is assumed that the autenticated user
will be searching for shifts for themselves. The authenticated user will have `workerId` and `professionId` as part of their identity on the server.

Since we did not get into creating authentication for our endpoint, this is how we shall search for the shifts.

#### Assumption 1: We want quick and useful feedback to user

Because we want to get useful information back to the user, I decided to separate the database queries into smaller logical pieces. This also prevents
the server from having to perform any unnecessary heavy queries.

- First check if the current user is active (which I suspect would never happen, but you know, things happen). If the user is not active, we don't need to search.
- Check if the facility is active. This is a binary search (either active or not). If the facility isn't active, we save ourselves an expensive query and quickly provide feedback to the user.
- Check if the user has the required documents. This query is a little more intense, but much quicker than the final query. If required documents are missing, provide this feedback to the user
- Finally, we perform the search for available shifts. This query joins several table and is the most computationally intensive one for the DB. At this point, the user will be able to see if there are available slots.

#### Assumption 2: We want to provide useful logging for debugging and analytics

Searching for shifts can be computationally expensive and because of the steps listed above, we will surely want to log as much useful information as possible. This includes

- Any check failures (user inactive, facility inactive, or required documents)
- Database connection errors
- Any other uncaught errors (syntax errors, server issues, etc)

>NOTE: The logging implementation would include the currently authenticate workerId as part of the log information. Authentication was not setup in this project.


## What I would do speed up operations

1. I would add pagination to the request. In implementation for this exercise, I hard coded a cap of 50, but this would be a parameter passed in to reduce the rows we fetch, thus reducing the request roundtrip.
2. Though I would not do this for the sake of traceability and user experience, to speed up the operation, we could write a sophisticated query that performs all checks (active user, active facility, required documents, unfilled shifts). This would be faster, but we would lose the ability to glean more information about the search.

Example

```sql
select s."start", s."end"  from "DocumentWorker" dw 
    inner join "Worker" w 
        on w.id = dw.worker_id 
    inner join "Facility" f 
    	on f.id = w.id 
    inner join "FacilityRequirement" fr 
        on fr.document_id = dw.document_id 
    inner join "Shift" s 
        on s.facility_id = fr.facility_id 
        and	s."profession" = w."profession" 
    where 
    	f.is_active = true
        and w.is_active = true
        and s.facility_id = 10
        and s.worker_id is null
    	and w.id = 16
    	and w."profession" = 'RN'
    order by s."start" 
    limit 50
```
3. We could store denormalized data in a record database that contains collections of records `Document` + `Worker` and records for `Facility` + `Requirement`. This would speed up read speeds vs relational databases. Document databases are inherently indexed based and point to records that contains the fullness of the data you need as opposed to having to join data stored in separate locations.
4. Maybe a part of point three above, but we may be able to cache some of the data needed to perform this search operation in something like a Redis cache, which would also speed up operations.