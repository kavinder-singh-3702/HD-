import { Router } from "express";
import * as UserController from "../controllers/user.controller";

const router = Router();

router
  .post("/register", UserController.register)
  .post("/verify-register-otp", UserController.verifyRegisterOtp);

export default router;
