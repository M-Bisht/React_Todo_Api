import mongoose from "mongoose";

export const mongoDBserver = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "react-todo-backend",
    })
    .then(() => {
      console.log("mongoDB connected");
    })
    .catch(() => {
      console.log("mongoDB failed to connected");
    });
};
