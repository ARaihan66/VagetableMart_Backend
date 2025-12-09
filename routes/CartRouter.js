import express from "express";
import { updateCart } from "../controllers/CartController.js";

const cartRouter = express.Router();

cartRouter.post("/update", updateCart);

export default cartRouter;
