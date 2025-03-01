require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const { createFolderStructure } = require("../config/multer.config");
const { specs, swaggerUi } = require("../swagger");
const app = express();

// connect DB
const connectDB = require("../db/connect");

const authenticateUser = require("../middleware/authentication");

// routers
const authRouter = require("../routes/auth");
const jobsRouter = require("../routes/jobs");
const usersRouter = require("../routes/users");
const publicJobsRouter = require("../routes/publicJobs");

// error handler
const notFoundMiddleware = require("../middleware/not-found");
const errorHandlerMiddleware = require("../middleware/error-handler");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
    credentials: true,
  })
);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/public-job", publicJobsRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);
app.use("/api/v1/users", authenticateUser, usersRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Create folder structure for uploads
createFolderStructure();

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
