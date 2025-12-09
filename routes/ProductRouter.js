import express from "express";
import {
  addProduct,
  changeStock,
  productById,
  productList,
} from "../controllers/ProductController.js";
import authSeller from "../middlewares/AuthSeller.js";
import upload from "../configs/multer.js";

const ProductRouter = express.Router();

ProductRouter.post("/add", upload.array(["images"]), authSeller, addProduct);
ProductRouter.get("/list", productList);
ProductRouter.get("/id", productById);
ProductRouter.post("/stock", authSeller, changeStock);

export default ProductRouter;
