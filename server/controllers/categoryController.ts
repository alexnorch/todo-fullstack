import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

// Models
import Task from "../models/taskModel";
import Category, { ICategory } from "../models/categoryModel";
import User, { IUser } from "../models/userModel";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, color } = req.body;

  if (!title || !color) {
    return next(new AppError("Please provide all values", 400));
  }

  const titleLowerCase = title.toLowerCase();

  const user: IUser | null = await User.findById(req.userId);
  const isAlreadyExists: ICategory | null = await Category.findOne({
    title: titleLowerCase,
  });

  if (isAlreadyExists) {
    return next(new AppError("This category is already exists", 400));
  }

  const category = new Category({
    title: titleLowerCase,
    color,
    user: req.userId,
  });

  const createdCategory = await category.save();

  // Saving category in user data
  user!.categories.push(createdCategory._id);
  await user!.save();

  res.send(createdCategory);
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const userId = req.userId;

    const category: ICategory | null = await Category.findById(id).select(
      "+user"
    );

    if (!category) {
      return next(new AppError("Category was not found", 404));
    }

    if (category.user.toString() !== userId) {
      return next(new AppError("You are not allowed to do this", 403));
    }

    await Task.deleteMany({ user: userId, category: category._id });

    const deletedCategory = await category.deleteOne();

    res.send(deletedCategory);
  } catch (error) {
    next(error);
  }
};

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find({ user: req.userId })
      .select("title color tasks")
      .populate({ path: "tasks", select: "completed title color" });

    if (!categories) {
      return next(new AppError("The category wasn't found", 404));
    }

    res.send(categories);
  } catch (error) {}
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, color } = req.body;
    const category: ICategory | null = await Category.findOne({
      _id: id,
      user: req.userId,
    });

    if (!title || !color) {
      return next(new AppError("Please provide all values", 400));
    }

    if (!category) {
      return next(new AppError("Category was not found", 404));
    }

    category.title = title.toLowerCase();
    category.color = color;

    const updatedCategory = await category.save();
    const populatedTasks = await updatedCategory.populate("tasks");

    res.send(populatedTasks);
  } catch (error) {}
};

export default {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
