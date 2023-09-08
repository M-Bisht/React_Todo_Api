import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  createTodo,
  deleteTodo,
} from "../controllers/todoRouteFunctions.js";

const router = express.Router();

router.post("/create", isAuth, createTodo);

router.delete("/:id", isAuth, deleteTodo);

export default router;
