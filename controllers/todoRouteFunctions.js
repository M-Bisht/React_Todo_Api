import { userTodos } from "../models/todoSchema.js";

// creating todo
export const createTodo = async (req, res) => {
  const { todo } = req.body;

  await userTodos.create({
    todo,
    user: req.userId,
  });

  res.status(201).json({
    success: true,
    message: "Todo created successfully",
  });
};

// delete todo
export const deleteTodo = async (req, res) => {
  await userTodos.findById(req.params.id).deleteOne();

  res.status(200).json({
    success: true,
    message: "Todo deleted successfully",
  });
};
