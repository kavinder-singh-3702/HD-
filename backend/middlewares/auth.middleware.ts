import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export async function createToken(_id: string): Promise<string> {
  if (!ACCESS_TOKEN_SECRET) {
    throw new Error("Access token secret is not defined");
  }
  const token = jwt.sign({ _id }, ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
  return token;
}

export async function verifyToken(req: any, res: Response, next: NextFunction) {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        status: "FAIL",
        message: "Missing Token",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
    req._id = decoded;
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(400).json({
        status: "FAIL",
        message: "Token Expired",
      });
    }
    res.status(400).json({
      status: "FAIL",
      message: "Something Went Wrong",
    });
  }
}
