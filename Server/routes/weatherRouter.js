import { Router } from "express";
import { currentWeather } from "../Controller/WeatherController.js";

const router = Router();
router.get("/current", currentWeather);

export default router;
