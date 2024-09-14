import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { createProduct } from '../controllers/createProduct.js';
import { Product } from '../models/products.js';

// Configura una instancia de Express para las pruebas
const app = express();
app.use(bodyParser.json());
app.post('/products', createProduct);

// Mocks de productos
jest.mock('../models/products.js', () => ({
  Product: {
    create: jest.fn(),
  },
}));

describe('POST /products', () => {
  it('debería crear un producto y devolverlo', async () => {
    const newProduct = {
      name: 'iPhone 14',
      price: 999,
      description: 'El último iPhone',
      image: 'http://example.com/image.png',
    };

    // Simula la respuesta de Product.create
    Product.create.mockResolvedValue(newProduct);

    const response = await request(app)
      .post('/products')
      .send(newProduct);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newProduct);
  });

  it('debería devolver un error 400 si falta el nombre', async () => {
    const productWithoutName = {
      price: 999,
      description: 'El último iPhone',
      image: 'http://example.com/image.png',
    };

    const response = await request(app)
      .post('/products')
      .send(productWithoutName);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('El nombre es requerido y debe ser una cadena de texto.');
  });

  it('debería manejar errores al crear el producto', async () => {
    // Simula un error en la base de datos
    Product.create.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/products')
      .send({
        name: 'iPhone 14',
        price: 999,
        description: 'El último iPhone',
        image: 'http://example.com/image.png',
      });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Hubo un problema al crear el producto.');
  });
});
