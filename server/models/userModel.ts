import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

export default mongoose.model("User", UserSchema);
