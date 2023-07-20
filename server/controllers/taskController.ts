import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import AppError from "../utils/AppError";

// models and interfaces
import Task from "../models/taskModel";
import Category from "../models/categoryModel";
import User, { UserInterface } from "../models/userModel";

const getTasks = (req: Request, res: Response) => {
  console.log(req.userId);
  res.send({ userId: req.userId });
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const { title, categoryName } = req.body;
  const user: UserInterface | null = await User.findById(req.userId);
  const category = await Category.findOne({ title: categoryName });

  // If user doesn't have any categories, he can't create his task
  if (user!.categories.length < 1) {
    return next(
      new AppError("Firstly you have to create your first category", 400)
    );
  }

  // If user tries to push the task to non-existent category
  if (!category)
    return next(
      new AppError("Invalid category. Please provide a new category", 400)
    );

  if (!title || !categoryName) {
    return next(new AppError("Please, provide all values", 400));
  }

  // Creating a new task
  const task = new Task({ title, category: categoryName, user: req.userId });
  const createdTask = await task.save();

  user!.tasks.push(createdTask._id);
  await user!.save();

  res.send({ user });
};

const updateTask = (req: Request, res: Response) => {
  res.send("Update Task");
};

const deleteTask = (req: Request, res: Response) => {
  res.send("Delete Task");
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
