import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Create user
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: 400,
        message: "All fields are required",
      });
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res.status(400).json({
        status: 400,
        message: "User already existed",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = await jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      status: 200,
      message: "User created successfully.",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

// Log in user
export const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        message: "All fields are required.",
      });
    }

    const existedUser = await User.findOne({ email });

    if (!existedUser) {
      return res.status(404).json({
        status: 404,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, existedUser.password);

    if (!isMatch) {
      return res.status(404).json({
        status: 404,
        message: "Invalid email or password.",
      });
    }

    const token = await jwt.sign(
      { id: existedUser._id },
      process.env.JWT_TOKEN,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      status: 200,
      message: "User login successful.",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

// Log out user
export const LogOutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.json({ success: true, message: "User Log Out" });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
