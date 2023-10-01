import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/userModel";
import AppError from "../utils/AppError";
import { aggregateTask, formatUserData } from "../utils/helpers";
import { RequestHandler } from "../types";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const getUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.send(user);
  } catch (error) {}
};

const loginUser: RequestHandler = async (req, res, next) => {
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

    const tasksWithCategories = await aggregateTask(user);
    const formattedData = formatUserData(user, tasksWithCategories, token);

    res.json(formattedData);
  } catch (error) {
    next(error);
  }
};

const registerUser: RequestHandler = async (req, res, next) => {
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

const updateUserPhoto: RequestHandler = async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("Please upload an image", 400));
  }

  const photo = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(
    req.userId,
    { photo },
    { new: true }
  );

  res.send(updatedUser);
};

const updateUser: RequestHandler = async (req, res, next) => {
  const { email, firstName, lastName } = req.body;
  const user = (await User.findById(req.userId)) as IUser;
  const isEmailAlreadyExists = (await User.findOne({ email })) as IUser;

  if (user.isEmailConfirmed) {
    return next(
      new AppError(
        "You can't change email address, because it's already confirmed",
        400
      )
    );
  }

  if (!lastName || !firstName || !email) {
    return next(new AppError("Please provide all values", 400));
  }

  if (isEmailAlreadyExists && email !== user.email) {
    return next(
      new AppError(
        "The email address is already taken. Please choose another one.",
        400
      )
    );
  }

  if (user.email !== email) {
    user.email = email;
  }

  user.firstName = firstName;
  user.lastName = lastName;

  const updatedUser = await user.save();

  res.send(updatedUser);
};

const changePassword: RequestHandler = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return next(new AppError("Please provide all values", 400));
    }

    const user = (await User.findById(req.userId)) as IUser;
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

    user.password = newPassword;
    await user.save();

    res.send(user);
  } catch (error) {
    next(error);
  }
};

const verificationEmail: RequestHandler = async (req, res, next) => {
  const user = (await User.findById(req.userId)) as IUser;
  const confirmToken = user.generateConfirmToken(req.userId);

  const message = {
    from: "taskifyfree@gmail.com",
    to: "oleksandr.harashchenko@gmail.com",
    subject: "Taskify Support | E-mail address confirmation",
    text: `Confirmation string = http://localhost:5000/api/user/confirmEmail?token=${confirmToken}`,
  };

  transporter.sendMail(message, (err, info) => {
    if (!err) {
      console.log("Successfully sent");
    }
  });

  res.send("OK");
};

const confirmEmail: RequestHandler = async (req, res, next) => {
  const token = req.query.token as string;

  if (!token) {
    return next(new AppError("Invalid link. Please try again", 404));
  }

  const decoded: any = await jwt.verify(
    token,
    process.env.JWT_EMAIL_SECRET || ""
  );
  const user = await User.findById(decoded.userId);

  if (!user) {
    return next(new AppError("Invalid jwt token. Please try again later", 400));
  }

  user.isEmailConfirmed = true;
  await user.save();

  res.redirect("http://localhost:3000/settings");
};

export default {
  loginUser,
  registerUser,
  updateUser,
  changePassword,
  confirmEmail,
  updateUserPhoto,
  verificationEmail,
  getUser,
};
