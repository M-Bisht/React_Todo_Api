import jwt from "jsonwebtoken";
import { userData } from "../models/userSchema.js";

export const isAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Signup or login first",
    });
  }

  let decodedCookie = jwt.verify(token, process.env.JWT_SECERET);
  req.userId = await userData.findById(decodedCookie._id);
  next();
};
