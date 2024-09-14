import express from 'express';
import routesProduct from "./routes/product.routes.js"


const app = express();
app.use(express.json())
app.use(routesProduct)
export default app