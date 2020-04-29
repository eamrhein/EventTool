const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = mongoose.model("users");
const keys = require("../../config/keys").secretOrkey;

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const register = async (data) => {
  const { message, isValid } = validateRegisterInput(data);

  if (!isValid) {
    throw new Error(message);
  }

  const { email, password } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("This user already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User(
    {
      email,
      password: hashedPassword,
      apikeys: [],
      jobs: [],
    },
    (err) => {
      if (err) throw err;
    }
  );

  user.save();

  const token = jwt.sign({ id: user._id }, keys);

  return {
    token,
    loggedIn: true,
    ...user._doc,
    password: null,
    id: user._id,
  };
};

const logout = async (data) => {
  const { _id } = data;

  const user = await User.findById(_id);
  if (!user) throw new Error("This user does not exist");

  const token = "";

  return { token, loggedIn: false, ...user._doc, password: null };
};

const login = async (data) => {
  const { message, isValid } = validateLoginInput(data);

  if (!isValid) {
    throw new Error(message);
  }

  const { email, password } = data;
  const user = await User.findOne({ email });
  if (!user) throw new Error("This user does not exist");
  const isValidPassword = await bcrypt.compareSync(password, user.password);
  if (!isValidPassword) throw new Error("Invalid password");
  console.log(keys);
  const token = jwt.sign({ id: user.id }, keys);
  return {
    id: user._id,
    token,
    loggedIn: true,
    ...user._doc,
    password: null,
  };
};

const verifyUser = async (data) => {
  try {
    const { token } = data;
    const decoded = jwt.verify(token, keys);
    const { id } = decoded;
    const user = await User.findById(id);
    const loggedIn = await User.findById(id).then((user) => {
      return !!user;
    });
    return { loggedIn, id: user._id };
  } catch (err) {
    return { loggedIn: false };
  }
};

module.exports = { register, login, logout, verifyUser };
