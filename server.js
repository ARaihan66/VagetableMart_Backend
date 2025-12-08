import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/UserRoute.js";

const app = express();
const PORT = 8000 || process.env.PORT;

await connectDB();

const allowedOrigin = [""];
// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigin, credentials: true }));

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
