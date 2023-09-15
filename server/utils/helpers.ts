import Task from "../models/taskModel";

export const populateTask = async (taskId: string) => {
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
