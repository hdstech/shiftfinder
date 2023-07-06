import {
	findAvailableShiftDb,
	isFacilityActive,
	isUserActive,
	workerHasDocuments,
} from "../dbConfig/repository";

/**
 *
 * @param workerId
 * @param facilityId
 * @param professionId
 * @returns object containing available shifts or errors
 */
export const findAvailableShift = async (
	workerId: number,
	facilityId: number,
	professionId: string
) => {
	try {
		if (!(await isUserActive(workerId))) {
			return { ok: false, payload: "Worker not active or not registered" };
		}

		if (!(await isFacilityActive(facilityId))) {
			return { ok: false, payload: "Facility inactive" };
		}

		if (!(await workerHasDocuments(workerId, facilityId))) {
			return { ok: false, payload: "Appropriate documents required" };
		}

		const response = await findAvailableShiftDb(
			workerId,
			facilityId,
			professionId
		);

		return { ok: true, payload: response };
	} catch (error) {
		return { ok: false, error };
	}
};
