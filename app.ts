import express from "express";
import cors from "cors";
import routes from "./controllers/index";
import { logger } from "./logger";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/v1", routes);

export { app };
