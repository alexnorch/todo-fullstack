import mongoose from "mongoose";
import { Document, Types } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

export interface IUser extends Document {
  name: string;
  email: string;
  isEmailConfirmed: boolean;
  confirmString: boolean;
  password: string | undefined;
  photo: string;
  categories: Types.ObjectId[];
  tasks: Types.ObjectId[];
  comparePassword: (candidate: string, hashed: string) => Promise<boolean>;
  generateToken: (userId: string) => Promise<object>;
  generateConfirmString: () => string;
  verifyConfirmString: (str: string) => boolean;
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
  confirmString: {
    type: String,
    default: null
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

UserSchema.methods.generateConfirmString = async function () {
  const confirmationStr = uuidv4()
  this.confirmString = confirmationStr

  await this.save()

  console.log(this.confirmString)

  return confirmationStr
}

UserSchema.methods.verifyConfirmString = function (str: string) {

  console.log('provided string', str)
  console.log('model string', this.confirmString)

  return this.confirmString === str
}

export default mongoose.model<IUser>("User", UserSchema);
