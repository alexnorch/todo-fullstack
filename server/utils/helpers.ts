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
        as: "category",
      },
    },
    {
      $addFields: {
        category: { $arrayElemAt: ["$category.categoryName", 0] },
      },
    },
  ]);

  return populatedTask[0];
};
