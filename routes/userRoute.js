import express from "express";
import {
  loginUser,
  logoutUser,
  signupUser,
  user
} from "../controllers/userRouteFunctions.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/user", isAuth, user);

export default router