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

    const user = await User.findOne({ email })
      .populate({
        path: "tasks",
        select: "title completed",
        populate: {
          path: "category",
          select: "title color", // Укажите только поле 'title' для категории
        },
      })
      .populate({ path: "categories", select: "title color" });

    if (!user) {
      return next(new AppError("An e-mail address doesn't exists", 400));
    }

    const isPasswordCorrect = await user.comparePassword(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(new AppError("Bad credentials, try again please", 401));
    }

    const token = user.generateToken(user._id);

    res.json({
      userInfo: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
      categories: user.categories,
      tasks: user.tasks,
      token,
    });

    res.sendStatus(200);
  } catch (error) {
    // Обработка ошибок
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

    res.json({
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
      categories: user.categories,
      tasks: user.tasks,
      token,
    });
  } catch (error) {}
};

const updateUser = (req: Request, res: Response) => {
  res.send("Update User");
};

// Controllers for admins: delete, update

export default {
  loginUser,
  registerUser,
  updateUser,
};
