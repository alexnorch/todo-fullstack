import mongoose from "mongoose";
import { Document, Types } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  name: string;
  email: string;
  isEmailConfirmed: boolean;
  password: string | undefined;
  photo: string;
  categories: Types.ObjectId[];
  tasks: Types.ObjectId[];
  comparePassword: (candidate: string, hashed: string) => Promise<boolean>;
  generateToken: (userId: string) => Promise<object>;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  isEmailConfirmed: {
    type: Boolean,
    default: false,
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

export default mongoose.model<IUser>("User", UserSchema);
