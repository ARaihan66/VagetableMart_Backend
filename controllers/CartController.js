import User from "../models/UserModel.js";

// Update cart item
export const updateCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;

    await User.findByIdAndUpdate(userId, { cartItems });

    res.json({
      success: true,
      message: "User cart updated.",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
