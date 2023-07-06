import request from "supertest";
import { app } from "../../app";
import * as scheduleService from "../../service/shiftService";

describe("Scheduling controller", () => {
	it("should return a 404 when no available shift is found", async () => {
		jest
			.spyOn(scheduleService, "findAvailableShift")
			.mockResolvedValue({ ok: true, payload: [] });
		const res = await request(app).get(
			"/v1/schedule/getshifts?workerId=16&facilityId=10&professionId=RN"
		);

		expect(res.statusCode).toBe(404);
		expect(res.body).toStrictEqual([]);
	});

	it("should return a list of shifts", async () => {
		const expected = [
			{
				start: "2023-02-01T10:00:00.000Z",
				end: "2023-02-01T15:00:00.000Z",
			},
			{
				start: "2023-02-01T10:00:00.000Z",
				end: "2023-02-01T15:00:00.000Z",
			},
			{
				start: "2023-02-01T10:00:00.000Z",
				end: "2023-02-01T15:00:00.000Z",
			},
		];

		jest
			.spyOn(scheduleService, "findAvailableShift")
			.mockResolvedValue({ ok: true, payload: expected });
		const res = await request(app).get(
			"/v1/schedule/getshifts?workerId=16&facilityId=10&professionId=RN"
		);

		expect(res.statusCode).toBe(200);
		expect(res.body).toStrictEqual(expected);
	});
});
