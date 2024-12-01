const express = require("express");
const router = express.Router();

const { getUser, updateUser } = require("../controllers/users");

router.route("/").patch(updateUser).get(getUser);

module.exports = router;
