import { Router } from "express";
import UserRouter from "./userRouter.js";
import weatherRouter from "./weatherRouter.js";
const router = Router();

router.use("/api", UserRouter);
router.use("/weather", weatherRouter);

export default router;
