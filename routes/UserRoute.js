import express from "express";
import {
  createUser,
  isAuth,
  loginUser,
  logoutUser,
} from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/is-auth", isAuth);
userRouter.get("/logout", logoutUser);

export default userRouter;
