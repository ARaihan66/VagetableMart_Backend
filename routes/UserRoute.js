import express from "express";
import { createUser, logInUser } from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.post("/login", logInUser);

export default userRouter;
