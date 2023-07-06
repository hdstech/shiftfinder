import { createLogger, format, transports } from "winston";

export const logger = createLogger({
	format: format.combine(format.timestamp(), format.json()),
	level: process.env.NODENV === "production" ? "info" : "debug",
	transports: [new transports.Console()],
	exceptionHandlers: [new transports.File({ filename: "exceptions.log" })],
	rejectionHandlers: [new transports.File({ filename: "rejections.log" })],
});
