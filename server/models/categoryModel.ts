import mongoose, { Document, Types } from "mongoose";

export interface CategoryInterface extends Document {
  categoryName: string;
  color: string;
  user: Types.ObjectId;
  tasks: Types.ObjectId[];
}

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "Title is required"],
  },
  color: {
    type: String,
    required: [true, "Color is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

export default mongoose.model<CategoryInterface>("Category", CategorySchema);
