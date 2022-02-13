import mongoose from "mongoose";

const BlogSchema = mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: [true, "Please add blog title"],
      trim: true,
    },
    content: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    blogImageUrl: {
      type: String,
      default: "/images/no-photo.jpg",
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot be more than 500 characters long"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);
