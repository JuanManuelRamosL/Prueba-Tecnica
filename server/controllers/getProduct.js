import { Product } from "../models/products.js"

export const getProduct = async(req,res)=>{
    const products = await Product.findAll()
    res.json(products)
}