const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Plase provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Plase provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["Interview", "Declined", "Pending", "Applied", "Rejected", "Accepted", "Withdrawn", "Offered", "Hired", "Not Hired"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId, // every time when creating a Job, we will asign that to a user
      ref: "User",
      required: [true, "Please provide user"],
    },
    location: {
      type: String,
      required: [true, "Please provide location"],
      maxlength: 100,
    },
    salary: {
      type: String,
      required: [true, "Please provide salary"],
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
      maxlength: 5000,
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "freelance", "contract", "internship", "temporary", "remote"],
      default: "full-time",
    },
    requirements: {
      type: [String],
      required: [true, "Please provide requirements"],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
