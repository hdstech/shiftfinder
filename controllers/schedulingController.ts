import { Router } from "express";
import { logger } from "../logger";
import { findAvailableShift } from "../service/shiftService";

const router = Router();

router.get("/getshifts", async (req, res) => {
	const workerId = req.query.workerId as unknown as number; // this should be on the worker model. No need to pass this as a search query parameter
	const facilityId = req.query.facilityId as unknown as number;

	const professionId = req.query.professionId as unknown as string; // this should be on the worker model. No need to pass this as a search query parameter
	logger.profile("Get shifts");

	try {
		const results = await findAvailableShift(
			workerId,
			facilityId,
			professionId
		);

		if (results.ok) {
			if (results.payload?.length === 0) {
				return res.status(404).json(results.payload);
			}
			return res.json(results.payload);
		}
		return res.status(404).json(results.payload);
	} catch (error) {
		logger.error(error);
		return res.status(500).json(error);
	} finally {
		setTimeout(() => {
			logger.profile("Get shifts");
		}, 1000);
	}
});

export default router;
