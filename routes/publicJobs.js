const express = require("express");
const router = express.Router();
const { upload } = require("../config/multer.config");

const { getPublicJobs, imageTest, imageTestMultiple } = require("../controllers/jobs");

router.route("/").get(getPublicJobs);
router.post("/test", upload.single("file"), imageTest);
router.post("/test-multiple", upload.array("files", 2), imageTestMultiple);

module.exports = router;
