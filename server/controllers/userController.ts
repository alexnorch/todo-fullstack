import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import Task from "../models/taskModel";
import AppError from "../utils/AppError";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return next(new AppError("Please provide all values", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new AppError("An e-mail address doesn't exists", 400));
    }

    const isPasswordCorrect = await user.comparePassword(
      password,
      user.password!
    );

    if (!isPasswordCorrect) {
      return next(new AppError("Bad credentials, try again please", 401));
    }

    user.password = undefined;

    const token = user.generateToken(user._id);

    await user.populate("categories");
    await user.populate("tasks");

    const tasksWithCategories = await Task.aggregate([
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

    res.json({
      data: { ...user.toObject(), tasks: tasksWithCategories },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    if (!name || !email || !password || !confirmPassword) {
      return next(new AppError("Please provide all values", 400));
    }

    if (password !== confirmPassword) {
      return next(new AppError("Password do NOT match", 400));
    }

    const alreadyExists = await User.findOne({ email });

    if (alreadyExists) {
      return next(new AppError("User already exists", 409));
    }

    const newUser = new User({ name, email, password });
    const user = await newUser.save();
    const token = user.generateToken(user._id);

    res.json({ user, token });
  } catch (error) {
    next(error);
  }
};

const updateUser = (req: Request, res: Response) => {
  res.send("Update User");
};

const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return next(new AppError("Please provide all values", 400));
    }

    const user = await User.findById(req.userId);
    const isPasswordCorrect = await user?.comparePassword(
      oldPassword,
      user.password!
    );

    if (newPassword !== confirmPassword) {
      return next(new AppError("Passwords are not match", 400));
    }

    if (!isPasswordCorrect) {
      return next(new AppError("You provide an invalid old password", 400));
    }

    user!.password = newPassword;
    await user!.save();

    res.send(user);
  } catch (error) {
    next(error);
  }
};

const confirmEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {}
};

// Controllers for admins: delete, update

export default {
  loginUser,
  registerUser,
  updateUser,
  changePassword,
  confirmEmail,
};
