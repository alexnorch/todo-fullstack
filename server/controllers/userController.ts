import { Request, Response, NextFunction } from "express";
import multer from "multer";
import sharp from "sharp";
import User, { IUser } from "../models/userModel";
import Task from "../models/taskModel";
import AppError from "../utils/AppError";

const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: Function
) => {
  if (!file.mimetype.startsWith("image")) {
    return cb(new AppError("Only images are accepted", 400), false);
  }

  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const resizePhoto = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) return next();

  req.file.filename = `${req.userId}_${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/uploads/user_photos/${req.file.filename}`);

  next();
};

const uploadPhoto = upload.single("photo");

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

    const formattedData = {
      user: {
        name: user.name,
        email: user.email,
        photo: user.photo,
        id: user._id,
      },
      data: {
        tasks: tasksWithCategories,
        categories: user.categories,
      },
      token,
    };

    res.json({
      result: formattedData,
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

const updateUserPhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (!req.file) {
    return next(new AppError("Please upload an image", 400));
  }

  const updatedUser = await User.findByIdAndUpdate(req.userId, {
    photo: req.file.filename,
  }, { new: true });

  res.send(updatedUser);
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, name } = req.body;
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

  if (!name || !email) {
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

  user.name = name;

  const updatedUser = await user.save();

  res.send(updatedUser);
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

const confirmEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {}
};

export default {
  loginUser,
  registerUser,
  updateUser,
  changePassword,
  confirmEmail,
  uploadPhoto,
  resizePhoto,
  updateUserPhoto,
};
