import * as repo from "../../dbConfig/repository";
import { findAvailableShift } from "../../service/shiftService";

describe("Shift service", () => {
	describe("findAvailableShift", () => {
		it("should fail if worker found", async () => {
			jest.spyOn(repo, "isUserActive").mockResolvedValue(false);
			const result = await findAvailableShift(1, 2, "3");

			expect(result).toMatchObject({
				ok: false,
				payload: "Worker not active or not registered",
			});
		});

		it("should fail if facility is inactive", async () => {
			jest.spyOn(repo, "isUserActive").mockResolvedValue(true);
			jest.spyOn(repo, "isFacilityActive").mockResolvedValue(false);
			const result = await findAvailableShift(1, 2, "3");

			expect(result).toMatchObject({
				ok: false,
				payload: "Facility inactive",
			});
		});

		it("should fail if worker does not have appropriate documents", async () => {
			jest.spyOn(repo, "isUserActive").mockResolvedValue(true);
			jest.spyOn(repo, "isFacilityActive").mockResolvedValue(true);
			jest.spyOn(repo, "workerHasDocuments").mockResolvedValue(false);
			const result = await findAvailableShift(1, 2, "3");

			expect(result).toMatchObject({
				ok: false,
				payload: "Appropriate documents required",
			});
		});

		it("should return shifts", async () => {
			jest.spyOn(repo, "isUserActive").mockResolvedValue(true);
			jest.spyOn(repo, "isFacilityActive").mockResolvedValue(true);
			jest.spyOn(repo, "workerHasDocuments").mockResolvedValue(true);

			const expectedPayload = [{}];
			jest
				.spyOn(repo, "findAvailableShiftDb")
				.mockResolvedValue(expectedPayload);
			const result = await findAvailableShift(1, 2, "3");

			expect(result).toMatchObject({
				ok: true,
				payload: expectedPayload,
			});
		});
	});
});
