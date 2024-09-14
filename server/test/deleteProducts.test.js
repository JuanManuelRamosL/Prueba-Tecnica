import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { deleteProductById } from '../controllers/deleteProducts.js';
import { Product } from '../models/products.js';

// Configura una instancia de Express para las pruebas
const app = express();
app.use(bodyParser.json());
app.delete('/products/:id', deleteProductById);

// Mocks de productos
jest.mock('../models/products.js', () => ({
  Product: {
    findByPk: jest.fn(),
    destroy: jest.fn(),
  },
}));

describe('DELETE /products/:id', () => {
  it('debería eliminar un producto y devolver un mensaje de éxito', async () => {
    const productId = 1;

    // Simula la existencia del producto
    Product.findByPk.mockResolvedValue({
      id: productId,
      destroy: jest.fn(),
    });

    const response = await request(app).delete(`/products/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Producto con ID ${productId} eliminado con éxito.`);
  });

  it('debería devolver un error 400 si el ID no es válido', async () => {
    const invalidId = 'abc';

    const response = await request(app).delete(`/products/${invalidId}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('El ID proporcionado no es válido.');
  });

  it('debería devolver un error 404 si el producto no existe', async () => {
    const productId = 1;

    // Simula que el producto no existe
    Product.findByPk.mockResolvedValue(null);

    const response = await request(app).delete(`/products/${productId}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Producto no encontrado.');
  });

  it('debería manejar errores al eliminar el producto', async () => {
    const productId = 1;

    // Simula la existencia del producto
    Product.findByPk.mockResolvedValue({
      id: productId,
      destroy: jest.fn().mockRejectedValue(new Error('Database error')),
    });

    const response = await request(app).delete(`/products/${productId}`);

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Hubo un problema al eliminar el producto.');
  });
});
