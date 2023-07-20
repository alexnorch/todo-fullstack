import { Request, Response } from "express";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

// Models
import Category, { CategoryInterface } from "../models/categoryModel";
import User, { UserInterface } from "../models/userModel";

const getCategories = async (req: Request, res: Response) => {
  res.send("All categories");
};

const createCategory = async (req: Request, res: Response) => {
  const { title, color } = req.body;

  const user: UserInterface | null = await User.findById(req.userId);
  const category = new Category({
    title,
    color,
    user: req.userId,
  });
  const savedCategory = await category.save();

  user?.categories.push(savedCategory._id);
  await user!.save();

  res.send({ user });
};

const updateCategory = (req: Request, res: Response) => {
  res.send("update Category");
};

const deleteCategory = (req: Request, res: Response) => {
  res.send("Delete category");
};

export default {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
