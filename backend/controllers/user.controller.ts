import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import validator from "validator";
import OTP from "../models/otp.model";

import jwt from "jsonwebtoken";
import User from "../models/user.model";
import sendMail from "../util/sendOtpEmail.util";
import { UserRegisterEMAIL } from "../constants/constants";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let { email } = req.body;
    const { name, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        response: "invalid credentials",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        response: "Invalid email address",
      });
    }

    email = email.toLowerCase();

    const userExists = await User.findOne({
      $or: [{ email }],
    });
    if (userExists) {
      return res.status(400).json({
        response: "User already exists",
      });
    }

    let user = new User({
      name,
      email,
      password,
    });
    await user.save();

    user = user.toObject();
    delete user.password;
    await sendMail(email, "Welcome to Linqsat", UserRegisterEMAIL(name));
    return res.status(201).json({
      response: "OTP send Successfully",
      data: user,
    });
  } catch (err: any) {
    next(err);
  }
}
export async function verifyRegisterOtp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, otp, name, password } = req.body;
    if (!name || !email || !password || !otp) {
      return res.status(400).json({
        response: "Invalid Credentials",
      });
    }
    const userOtp = await OTP.findOne({ email });
    if (userOtp) {
      if (userOtp.otp === otp) {
        let user = new User({
          name,
          email,
          password,
        });
        await user.save();

        user = user.toObject();
        delete user.password;
        await OTP.deleteOne({ email });

        return res.status(201).json({
          response: "Registered successfully",
          data: user,
        });
      } else {
        return res.status(400).json({
          response: "wrong parameters",
        });
      }
    } else {
      return res.status(404).json({
        response: "Invalid OTP password",
      });
    }
  } catch (err) {
    next(err);
  }
}
