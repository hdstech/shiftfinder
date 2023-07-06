import { Router } from "express";
import schedulingRoutes from "./schedulingController";

const router = Router();

router.use("/schedule", schedulingRoutes);

export default router;
