import { userTodos } from "../models/todoSchema.js";

// creating todo
export const createTodo = async (req, res) => {
  const { title, description } = req.body;

  await userTodos.create({
    title,
    description,
    user: req.userId,
  });

  res.status(201).json({
    success: true,
    message: "Todo created successfully",
  });
};


// todo compeleted?
export const todoCompeleted = async (req, res) => {
  const curUser = await userTodos.findById(req.params.id);

  curUser.isCompleted = !curUser.isCompleted;
  await curUser.save();

  res.status(200).json({
    success: true,
    message: "Todo updated",
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
