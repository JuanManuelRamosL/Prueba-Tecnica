import { Product } from "../models/products.js"

export const getProduct = async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
  };
  