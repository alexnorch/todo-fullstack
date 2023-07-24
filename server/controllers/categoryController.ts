import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

// Models
import Category, { CategoryInterface } from "../models/categoryModel";
import User, { UserInterface } from "../models/userModel";

const getCategories = async (req: Request, res: Response) => {
  res.send("All categories");
};

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, color } = req.body;

  if (!title || !color) {
    return next(new AppError("Please provide all values", 400));
  }

  const lowerTitle = title.toLowerCase();

  const user: UserInterface | null = await User.findById(req.userId);
  const category = new Category({
    title: lowerTitle,
    color,
    user: req.userId,
  });

  const newCategory = await category.save();
  user?.categories.push(newCategory._id);
  await user!.save();

  const createdCategory = {
    color: newCategory.color,
    title: newCategory.title,
    _id: newCategory._id,
  };

  res.send({ createdCategory });
};

const updateCategory = (req: Request, res: Response) => {
  res.send("update Category");
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // When user deletes the category, all corresponding tasks also should be deleted
  try {
    const { id: _id } = req.params;
    const userId = req.userId;

    const task = await Category.findOne({ _id });

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

    if (task.user.toString() !== userId) {
      return next(new AppError("You are not allowed to do this", 403));
    }

    const deletedDocument = await task.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Документ успешно удален",
      deletedDocument,
    });
  } catch (error) {}
};

export default {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
