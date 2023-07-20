import mongoose from "mongoose";

interface Task extends mongoose.Document {
  title: string;
  completed: boolean;
  category: string;
  user: string;
}

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model<Task>("Task", TaskSchema);
