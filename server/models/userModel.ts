import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  image: string;
  categories: [];
  tasks: [];
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
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    maxlength: 20,
  },
  image: String,
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

export default mongoose.model<User>("User", UserSchema);
