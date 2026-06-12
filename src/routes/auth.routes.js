import { Router } from "express";
import {
  registeruser,
  login,
  logoutUser,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userRegisterValidator,
  userLoginValidator,
} from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"; 

let router = Router();

router.route("/register").post(userRegisterValidator(), validate, registeruser);

router.route("/login").post(userLoginValidator(), validate, login);

//secure routes
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
