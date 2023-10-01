import Task from "../models/taskModel";
import { IUser } from "../models/userModel";

const aggregateTask = async (user: IUser) => {
  return await Task.aggregate([
    {
      $match: {
        _id: { $in: user.tasks },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryInfo",
      },
    },
    {
      $addFields: {
        category: { $arrayElemAt: ["$categoryInfo.title", 0] },
      },
    },
    {
      $project: { categoryInfo: 0 },
    },
  ]);
};

const formatUserData = (user: IUser, tasksWithCategories: any, token: any) => {
  const formattedData = {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      photo: user.photo,
      email: user.email,
      isEmailConfirmed: user.isEmailConfirmed,
      registerDate: user.createdAt,
    },
    data: {
      tasks: tasksWithCategories,
      categories: user.categories,
    },
    token,
  };

  return formattedData;
};

const populateTask = async (taskId: string) => {
  const populatedTask = await Task.aggregate([
    {
      $match: { _id: taskId },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryInfo",
      },
    },
    {
      $project: {
        title: 1,
        completed: 1,
        color: 1,
        category: {
          $arrayElemAt: ["$categoryInfo.title", 0],
        },
      },
    },
  ]);

  return populatedTask[0];
};

export { aggregateTask, formatUserData, populateTask };
