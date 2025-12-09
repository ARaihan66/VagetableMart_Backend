import express from "express";
import {
  isSellerAuth,
  loginSeller,
  logoutSeller,
} from "../controllers/SellerController.js";
import authSeller from "../middlewares/AuthSeller.js";

const sellerRouter = express.Router();

sellerRouter.post("/login", loginSeller);
sellerRouter.get("/is-auth", authSeller, isSellerAuth);
sellerRouter.get("/logout", logoutSeller);

export default sellerRouter;
