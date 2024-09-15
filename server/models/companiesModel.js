// creating a schema ( very important )
import mongoose from "mongoose";

const companiesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logoSrc: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    websiteUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    year: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Company = mongoose.model("Company", companiesSchema);
