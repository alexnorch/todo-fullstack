import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

// models and interfaces
import Task from "../models/taskModel";
import Category, { CategoryInterface } from "../models/categoryModel";
import User, { UserInterface } from "../models/userModel";

const getTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find({ user: req.userId }).populate({
    path: "category",
    select: "title color",
  });

  res.send({ tasks });
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const { title, category } = req.body;

  try {
    if (!title || !category) {
      return next(new AppError("Please, provide all values", 400));
    }

    const user: UserInterface | null = await User.findById(req.userId);
    const userCategory: CategoryInterface | null = await Category.findOne({
      categoryName: category.toLowerCase(),
    });

    // If user doesn't have any categories, he can't create his task
    if (user!.data.length === 0) {
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
    });

    const createdTask = await task.save();

    userCategory.tasks.push(createdTask._id);

    await userCategory.save();

    const populatedTask = await Task.aggregate([
      {
        $match: { _id: createdTask._id },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $addFields: {
          category: { $arrayElemAt: ["$category.categoryName", 0] },
        },
      },
    ]);

    const resultTask = populatedTask[0];

    res.send(resultTask);
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

    if (task.user.toString() !== userId) {
      return next(new AppError("You are not allowed to do this", 403));
    }

    const populatedTask = await Task.aggregate([
      {
        $match: { _id: task._id },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $addFields: {
          category: { $arrayElemAt: ["$category.categoryName", 0] },
        },
      },
    ]);

    await task.deleteOne();
    const populatedResult = populatedTask[0];

    res.status(200).json(populatedResult);
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
