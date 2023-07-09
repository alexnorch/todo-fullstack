import { Request, Response } from "express";

const getTasks = (req: Request, res: Response) => {
  res.send("All Tasks");
};

const createTask = (req: Request, res: Response) => {
  res.send("Create Task");
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
