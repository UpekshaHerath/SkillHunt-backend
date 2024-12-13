const express = require("express");
const router = express.Router();

const { getPublicJobs } = require("../controllers/jobs");

router.route("/").get(getPublicJobs);

module.exports = router;
