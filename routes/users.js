const express = require("express");
const router = express.Router();

const { getUser, updateUser } = require("../controllers/users");

router.route("/").get(getUser).patch(updateUser);

module.exports = router;
