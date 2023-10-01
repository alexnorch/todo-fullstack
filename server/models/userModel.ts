import mongoose from "mongoose";
import { Document, Types } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  isEmailConfirmed: boolean;
  password: string | undefined;
  photo: string;
  categories: Types.ObjectId[];
  tasks: Types.ObjectId[];
  createdAt: Date;
  comparePassword: (candidate: string, hashed: string) => Promise<boolean>;
  generateToken: (userId: string) => Promise<object>;
  generateConfirmToken: (userId: string) => Promise<object>;
}

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  isEmailConfirmed: {
    type: Boolean,
    default: false,
    required: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    select: false,
  },
  photo: {
    type: String,
    default: "http://surl.li/jkwuu",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const password = this.password || "";

  this.password = await bcrypt.hash(password, 10);
});

UserSchema.methods.comparePassword = async function (
  candidate: string,
  hashed: string
) {
  return bcrypt.compare(candidate, hashed);
};

UserSchema.methods.generateToken = function (userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "", {
    expiresIn: "24h",
  });
};

UserSchema.methods.generateConfirmToken = function (userId: string) {
  return jwt.sign({ userId }, process.env.JWT_EMAIL_SECRET || "", {
    expiresIn: "2h",
  });
};
export default mongoose.model<IUser>("User", UserSchema);
