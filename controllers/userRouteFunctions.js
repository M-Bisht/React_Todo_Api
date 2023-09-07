import { userTodos } from "../models/todoSchema.js";
import { userData } from "../models/userSchema.js";
import { cookie } from "../utils/cookie.js";
import bcrypt from "bcrypt";

// Signup
export const signupUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  let findUserEmail = await userData.findOne({ email });

  if (findUserEmail) {
    return res.status(404).json({
      success: false,
      message: "User already existed",
    });
  }

  let hashPassword = await bcrypt.hash(password, 10);
  const newUser = await userData.create({
    name,
    email,
    password: hashPassword,
  });
  cookie(newUser, res, 201, "Signup successfully");
};

// login
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  let matchUserDetails = await userData.findOne({ email }).select("+password");

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
  const curUser = await userTodos.find({ user: req.userId });
  res.status(200).json({
    success: true,
    curUser,
  });
};
