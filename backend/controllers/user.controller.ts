import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import validator from "validator";
import OTP from "../models/otp.model";

import jwt from "jsonwebtoken";
import User from "../models/user.model";
import sendMail from "../util/sendOtpEmail.util";
import { emailHTML, UserRegisterEMAIL } from "../constants/constants";
import { createToken } from "../middlewares/auth.middleware";

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
    const otp: string = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.deleteMany({ email });
    await OTP.create({ email, otp });
    await sendMail(email, "OTP for Login", emailHTML(otp));
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
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        response: "invalid",
      });
    }
    const userOtp = await OTP.findOne({ email });
    const user = await User.findOne({ email });
    if (userOtp && user) {
      if (userOtp.otp === otp) {
        const token = await createToken(user._id as string);
        await OTP.deleteOne({ email });
        return res.status(200).json({
          response: "OTP verfifed",
          token: token,
        });
      } else {
        return res.status(400).json({
          response: "bad request wrong otp",
        });
      }
    } else {
      return res.status(404).json({
        response: "RESPONSES.ERROR",
      });
    }
  } catch (err: any) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        response: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        response: "User not found",
      });
    }
    if (!user.password) {
      return res.status(400).json({
        response: "User password is not set",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        response: "Invalid password",
      });
    }

    const token = await createToken(user._id as string);
    return res.status(200).json({
      response: "Login successful",
      token: token,
    });
  } catch (err: any) {
    next(err);
  }
}

export async function updatePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({
        response: "Email, current password, and new password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        response: "User not found",
      });
    }

    // Ensure user.password is defined before comparing
    if (!user.password) {
      return res.status(400).json({
        response: "User password is not set",
      });
    }

    // Verify the current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        response: "Current password is incorrect",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPassword });

    return res.status(200).json({
      response: "Password updated successfully",
    });
  } catch (err: any) {
    next(err);
  }
}
