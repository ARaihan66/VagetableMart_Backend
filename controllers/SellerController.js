import jwt from "jsonwebtoken";

//Login seller
const LoginSeller = async (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.SELLER_EMAIL &&
    password === process.env.SELLER_PASSWORD
  ) {
    const token = await jwt.sign({ email: email }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });

    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Seller Login Successful" });
  } else {
    return res.json({ success: false, message: "Invalid Credentials" });
  }
};
