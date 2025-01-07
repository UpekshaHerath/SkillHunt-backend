const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const multer = require("multer");

const getPublicJobs = async (req, res) => {
  const jobs = await Job.find({}).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const imageTest = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Get the base URL from request
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  // Generate the file URL
  const fileUrl = `${baseUrl}/uploads/${
    req.file.destination.split("uploads/")[1]
  }/${req.file.filename}`;

  res.status(200).json({
    message: "File uploaded successfully!",
    file: {
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: fileUrl,
    },
  });
};

const imageTestMultiple = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  // Get the base URL from request
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  // Generate the file URLs
  const files = req.files.map((file) => {
    return {
      filename: file.filename,
      path: file.path,
      url: `${baseUrl}/uploads/${file.destination.split("uploads/")[1]}/${file.filename}`,
    };
  });

  res.status(200).json({
    message: "Files uploaded successfully!",
    files: files,
  });
};

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(job);
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getPublicJobs,
  imageTest,
  imageTestMultiple,
};
