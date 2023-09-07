import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  createTodo,
  deleteTodo,
  todoCompeleted,
} from "../controllers/todoRouteFunctions.js";

const router = express.Router();

router.post("/create", isAuth, createTodo);

// router.patch("/edit", isAuth, editTodo);

router.route("/:id").patch(isAuth, todoCompeleted).delete(isAuth, deleteTodo);

export default router;
