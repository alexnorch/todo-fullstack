import { Request, Response } from "express";
import User from "../models/userModel";

const loginUser = (req: Request, res: Response) => {
  res.send("Login");
};

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .sendStatus(400)
        .json({ errorMessage: "Please provide all values" });
    }

    const alreadyExists = await User.findOne({ email });

    if (alreadyExists) {
      return res.sendStatus(400).json({ errorMessage: "User already exists" });
    }

    const user = new User({ name, email, password });
    const registeredUser = await user.save();

    res.sendStatus(202).json({ registeredUser });
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
