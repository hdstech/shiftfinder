import { logger } from "./logger";
import { app } from "./app";

const port = process.env.PORT || 5000;

app.listen(port, () => logger.info(`listen on port: ${port}`));
