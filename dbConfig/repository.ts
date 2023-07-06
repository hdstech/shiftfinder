import { logger } from "../logger";
import * as db from "./config";

export const findAvailableShiftDb = async (
	workerId: number = 16,
	facility: number,
	profession: string
) => {
	// first check if worker is active. this should be on their profile. if not, don't search
	//

	const text = `
    select s."start", s."end" from "DocumentWorker" dw 
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
        w.id = $1
        and s.facility_id = $2
        and w."profession" = $3
        and s.worker_id is null
    order by s."start" 
    limit 50
    `;
	const values = [workerId, facility, profession];
	const r = await db.query({
		text,
		values,
	});

	return r;
};

export const isUserActive = (workerId: number): Promise<boolean> => {
	return db
		.query({
			text: `select * from "Worker" w where w.id = $1 and w.is_active = true`,
			values: [workerId],
		})
		.then((r) => {
			if (r?.length === 0) {
				logger.info(`User ${workerId} not active`);
				return false;
			}
			return true;
		});
};

export const isFacilityActive = (facilityId: number) => {
	return db
		.query({
			text: 'select * from "Facility" f where id = $1 and is_active = true',
			values: [facilityId],
		})
		.then((r) => {
			if (r?.length === 0) {
				logger.info(`Inactive facility: ${facilityId}`);
				return false;
			}
			return true;
		});
};

export const workerHasDocuments = (workerId: number, facilityId: number) => {
	const text = `
    select * from "DocumentWorker" dw 
    inner join "FacilityRequirement" fr 
        on fr.document_id = dw.document_id 
    where dw.worker_id = $1
        and fr.facility_id = $2`;
	const values = [workerId, facilityId];

	return db.query({ text, values }).then((r) => {
		if (r?.length === 0) {
			logger.info(
				`Worker ${workerId} does not have required document for facility ${facilityId}`
			);
			return false;
		}
		return true;
	});
};
