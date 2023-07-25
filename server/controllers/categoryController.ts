import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

// Models
import Task from "../models/taskModel";
import Category, { CategoryInterface } from "../models/categoryModel";
import User, { UserInterface } from "../models/userModel";

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
  const user: UserInterface | null = await User.findById(req.userId);
  const isAlreadyExists: CategoryInterface | null = await Category.findOne({
    categoryName: titleLowerCase,
  });

  if (isAlreadyExists) {
    return next(new AppError("This category is already exists", 400));
  }

  const category = new Category({
    categoryName: titleLowerCase,
    color,
    user: req.userId,
  });

  const newCategory = await category.save();

  // Saving category in user data
  user!.data.push(newCategory._id);
  await user!.save();

  res.send(newCategory);
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const userId = req.userId;
    const category: CategoryInterface | null = await Category.findById(id);

    if (!category) {
      return next(new AppError("Category was not found", 404));
    }

    if (category.user.toString() !== userId) {
      return next(new AppError("You are not allowed to do this", 403));
    }

    await Task.deleteMany({ user: userId, category: category._id });
    await category.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Successfully deleted",
    });
  } catch (error) {}
};

const getCategories = async (req: Request, res: Response) => {
  res.send("All categories");
};

const updateCategory = (req: Request, res: Response) => {
  res.send("update Category");
};

export default {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
