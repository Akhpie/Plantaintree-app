import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    blogsVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Settings = mongoose.model("Settings", settingsSchema);
