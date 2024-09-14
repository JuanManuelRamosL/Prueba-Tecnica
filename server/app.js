import express from 'express';
import routesProduct from "./routes/product.routes.js"
import cors from 'cors';

const app = express();
app.use(express.json())
app.use(cors());
app.use(routesProduct)
export default app