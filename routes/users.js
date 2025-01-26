const express = require("express");
const router = express.Router();
const { upload } = require("../config/multer.config");

const { getUser, updateUser } = require("../controllers/users");

router.route("/").get(getUser);
router.patch("/", upload.single("file"), updateUser);

module.exports = router;
