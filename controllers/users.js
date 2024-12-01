const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getUser = async (req, res) => {
  const user = await User.findById(req.user.userId).lean();
  if (!user) {
    throw new NotFoundError(`No user with id: ${req.user.userId}`);
  }
  delete user.password;
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const {
      name,
      email,
      mobileNumber,
      bio,
      country,
      city,
      postalCode,
      CV_URL,
    } = req.body;

    if (!name || !email) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Name and email are required." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, mobileNumber, bio, country, city, postalCode, CV_URL },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found." });
    }

    res
      .status(StatusCodes.OK)
      .json({ msg: "User updated successfully.", user: updatedUser });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong.", error: error.message });
  }
};

module.exports = {
  getUser,
  updateUser,
};
