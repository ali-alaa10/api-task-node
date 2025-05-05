import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

// Get All Tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Todo.find();
    const tasksWithId = tasks.map((task) => ({
      _id: task._id,
      task: task.task,
      done: task.done,
    }));
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add New Task
router.post("/", async (req, res) => {
  try {
    const todo = new Todo({
      task: req.body.task,
      done: req.body.done || false,
    });
    await todo.save();
    res.status(201).json({
      _id: todo._id,
      task: todo.task,
      done: todo.done,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Task
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const task = await Todo.findByIdAndUpdate(id, dataToUpdate, { new: true });
    res.status(200).json({
      _id: task._id,
      task: task.task,
      done: task.done,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Task
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Todo.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: "Task Not Found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
