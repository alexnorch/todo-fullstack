import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

// models and interfaces
import Task from "../models/taskModel";
import Category, { ICategory } from "../models/categoryModel";
import User, { IUser } from "../models/userModel";
import { populateTask } from "../utils/helpers";

interface IQuery {
  category?: string;
  completed?: boolean;
  user: string;
}

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  const { category, isCompleted } = req.query;
  const user = req.userId;

  let query: IQuery = { user };

  if (req.query.category) {
    const userCategory: any = await Category.findOne({ title: category, user });
    query.category = userCategory._id;
  }

  if (req.query.isCompleted) {
    query.completed = Boolean(isCompleted);
  }

  const tasks = await Task.find(query);

  res.send(tasks);
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const { title, category } = req.body;

  try {
    if (!title || !category) {
      return next(new AppError("Please, provide all values", 400));
    }

    const user: IUser | null = await User.findById(req.userId);
    const userCategory: ICategory | null = await Category.findOne({
      title: category.toLowerCase(),
    });

    // If user doesn't have any categories, he can't create his task
    if (user!.categories.length === 0) {
      return next(
        new AppError("Firstly you have to create your first category", 400)
      );
    }

    // If user tries to push the task to non-existent category
    if (!userCategory)
      return next(
        new AppError("Invalid category. Please provide a new category", 400)
      );

    // Creating a new task
    const task = new Task({
      title,
      category: userCategory._id,
      user: req.userId,
      color: userCategory.color,
    });

    const createdTask = await task.save();

    user!.tasks.push(createdTask._id);
    await user!.save();

    const result = await populateTask(createdTask._id);

    res.send(result);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: _id } = req.params;
    const { title, completed } = req.body;

    if (!title) {
      return next(new AppError("Please provide all values", 400));
    }

    const task = await Task.findOne({ _id, user: req.userId });

    if (!task) {
      return next(new AppError("Task was not found", 404));
    }

    task.title = title;
    task.completed = completed;

    const changedTask = await task.save();
    const resultTask = await populateTask(changedTask._id);

    res.send(resultTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: _id } = req.params;
    const userId = req.userId;

    const task = await Task.findOne({ _id, user: userId });

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

    if (task.user.toString() !== userId) {
      return next(new AppError("You are not allowed to do this", 403));
    }

    const deletedTask = await populateTask(task._id);
    await task.deleteOne();

    res.status(200).json(deletedTask);
  } catch (error) {}
};

const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);

    if (!task) {
      return next(new AppError("There is no such task", 400));
    }

    res.send({ task });
  } catch (error) {
    console.log(error);
  }
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
};
