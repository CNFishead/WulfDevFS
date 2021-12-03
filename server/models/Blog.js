import mongoose from "mongoose";

const BlogSchema = mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: [true, "Please add blog title"],
      trim: true,
    },
    content: {
      type: Object,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);
