import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();

const allowedOrigin = [""];
// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigin, credentials: true }));

const PORT = 8000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
