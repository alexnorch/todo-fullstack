import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

// models and interfaces
import Task from "../models/taskModel";
import Category from "../models/categoryModel";
import User, { UserInterface } from "../models/userModel";

const getTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find({ user: req.userId }).populate({
    path: "category",
    select: "title color",
  });

  res.send({ tasks });
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const { title, categoryName } = req.body;

  try {
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
    const task = new Task({ title, category: category._id, user: req.userId });
    const createdTask = await task.save();
    user!.tasks.push(createdTask._id);

    // Returning data back to the client
    await user!.save();
    await createdTask.populate({ path: "category", select: "title color" });

    res.send({ createdTask });
  } catch (error) {
    console.log(error);
  }
};

const updateTask = (req: Request, res: Response) => {
  res.send("Update Task");
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: _id } = req.params;
    const userId = req.userId;

    const task = await Task.findOne({ _id, user: userId });

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

    // if (task.user.toString() !== userId) {
    //   return next(new AppError("You are not allowed to do this", 403));
    // }

    const deletedDocument = await task.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Successfully deleted",
      deletedDocument,
    });
  } catch (error) {}
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
