import express from "express";
import mongoose from "mongoose";
import tasksRoute from "./routes/Tasks.js";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// DB Connection
mongoose.connect("mongodb://localhost:27017/todo-api");

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("Connection error", err);
});

db.once("open", () => {
  console.log("Connected to DB");
});

app.use("/todos", tasksRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
