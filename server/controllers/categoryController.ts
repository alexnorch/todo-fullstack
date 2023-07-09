import { Request, Response } from "express";

const getCategories = (req: Request, res: Response) => {
  res.send("All categories");
};

const createCategory = (req: Request, res: Response) => {
  res.send("create category");
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
