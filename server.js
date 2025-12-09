import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/UserRoute.js";
import sellerRouter from "./routes/SellerRoute.js";
import ProductRouter from "./routes/ProductRouter.js";
import { updateCart } from "./controllers/CartController.js";

const app = express();
const PORT = 8000 || process.env.PORT;

await connectDB();

const allowedOrigin = [""];
// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigin, credentials: true }));

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", ProductRouter);
app.use("/api/cart", updateCart);

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
