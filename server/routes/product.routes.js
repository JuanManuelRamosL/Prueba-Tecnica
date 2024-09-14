import { Router } from "express";
import { getProduct } from "../controllers/getProduct.js";
import { createProduct } from "../controllers/createProduct.js";
import { getProductById } from "../controllers/getProductID.js";
import { deleteProductById } from "../controllers/deleteProducts.js";
import { putProductById } from "../controllers/putProducts.js";

const router = Router()

router.get("/products",getProduct)
router.post("/products",createProduct)
router.put("/products/:id",putProductById)
router.delete("/products/:id",deleteProductById)
router.get("/products/:id",getProductById)

export default router