import { userTodos } from "../models/todoSchema.js";
import { userData } from "../models/userSchema.js";
import { cookie } from "../utils/cookie.js";
import bcrypt from "bcrypt";

// Signup
export const signupUser = async (req, res, next) => {
  try {
    const { name, email, password } = await req.body;
    let findUserEmail = await userData.findOne({ email });

    if (findUserEmail) {
      return next(new Error("User already existed"));
    }

    let hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userData.create({
      name,
      email,
      password: hashPassword,
    });

    cookie(newUser, res, 201, "Signup successfully");
  } catch (error) {
    next(new Error("Internal server error"));
  }
};

// login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let matchUserDetails = await userData
      .findOne({ email })
      .select("+password");

    if (!matchUserDetails) {
      return next(new Error("Invalid email or password"));
    }

    let matchUserPassword = await bcrypt.compare(
      password,
      matchUserDetails.password
    );

    if (!matchUserPassword) {
      return next(new Error("Invalid email or password"));
    }

    cookie(matchUserDetails, res, 200, "Login successfully");
  } catch (error) {
    next(new Error("Internal server error"));
  }
};

// logout
export const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout successfully",
    });
};

// user
export const user = async (req, res) => {
  try {
    const curUser = await userTodos.find({ user: req.userId });
    res.status(200).json({
      success: true,
      curUser,
    });
  } catch (error) {
    next(new Error("Internal server error"));
  }
};
