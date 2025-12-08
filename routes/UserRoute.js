import express from "express";
import {
  createUser,
  logInUser,
  LogOutUser,
} from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.post("/login", logInUser);
userRouter.get("/logout", LogOutUser);

export default userRouter;
