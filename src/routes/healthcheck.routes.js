import { Router } from "express";
import healthcheck from "../controllers/healthcheck.controller.js";


let router = Router();

router.route("/").get(healthcheck);

export default router;
