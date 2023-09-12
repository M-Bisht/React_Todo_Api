import { userTodos } from "../models/todoSchema.js";

// creating todo
export const createTodo = async (req, res) => {
  try {
    const { todo } = await req.body;
    await userTodos.create({
      todo,
      user: req.userId,
    });
    res.status(201).json({
      success: true,
      message: "Todo created successfully",
    });
  } catch (error) {
    next(new Error("Internal server error"));
  }
};

// delete todo
export const deleteTodo = async (req, res) => {
  try {
    await userTodos.findById(req.params.id).deleteOne();
    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    next(new Error("Internal server error"));
  }
};
