const express = require("express");
const router = express.Router();
const { upload } = require("../config/multer.config");

const { getPublicJobs, imageTest } = require("../controllers/jobs");

router.route("/").get(getPublicJobs);
router.post("/test", upload.single("image"), imageTest);

module.exports = router;
