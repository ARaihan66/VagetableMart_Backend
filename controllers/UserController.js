import User from "../models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Create user
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || password) {
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

    const user = await User.create({ user, email, password: hashedPassword });

    const token = await jwt.sign({ id: user_id }, process.env.JWT_TOKEN, {
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
