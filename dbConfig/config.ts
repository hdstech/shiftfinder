import { Pool, QueryConfig } from "pg";
import { logger } from "../logger";

export const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "postgres",
	password: "postgres",
	port: 5432,
});

pool.on("error", (err, _) => {
	logger.error("Unexpected error on idle client", err);
	process.exit(-1);
});

export const query = async <T extends string | QueryConfig<any[]>>(
	queryParams: T
) => {
	const client = await pool.connect();
	try {
		const res = await client.query(queryParams);
		return res.rows;
	} catch (error) {
		logger.error(error);
	} finally {
		client.release();
	}
};
