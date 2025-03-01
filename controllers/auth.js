const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  CustomAPIError,
} = require("../errors");

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  } catch (e) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "The email already exists" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // compare the password
  const isPasswordCorrect = await user.comparePasswords(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
