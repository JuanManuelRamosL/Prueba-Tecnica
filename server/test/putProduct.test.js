import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { putProductById } from '../controllers/putProducts.js';
import { Product } from '../models/products.js';

// Configura una instancia de Express para las pruebas
const app = express();
app.use(bodyParser.json()); // Habilita que Express maneje JSON en el body
app.put('/products/:id', putProductById); // Configura la ruta para actualizar productos

// Simula el comportamiento del modelo Product
jest.mock('../models/products.js', () => ({
  Product: {
    findByPk: jest.fn(), // Mock para simular la búsqueda de un producto por ID
    save: jest.fn(), // Mock para simular el guardado de un producto
  },
}));

describe('PUT /products/:id', () => {
  // Prueba 1: Verifica que se pueda actualizar un producto correctamente
  it('debería actualizar un producto y devolver el producto actualizado', async () => {
    const productId = 1; // ID del producto a actualizar
    const updatedProductData = {
      name: 'Nuevo nombre',
      price: 200,
      description: 'Descripción actualizada',
      image: 'url-de-imagen-actualizada',
    };

    // Simula la existencia del producto en la base de datos
    const mockProduct = {
      id: productId,
      ...updatedProductData,
      save: jest.fn(), // Simula que el método save es una función mock
    };

    Product.findByPk.mockResolvedValue(mockProduct); // Simula que findByPk encuentra el producto

    // Simula la solicitud PUT para actualizar el producto
    const response = await request(app)
      .put(`/products/${productId}`)
      .send(updatedProductData);

    // Verificaciones
    expect(response.status).toBe(200); // Verifica que el código de estado sea 200
    expect(response.body.message).toBe('Producto actualizado con éxito.'); // Verifica que el mensaje sea el esperado
    expect(response.body.product.name).toBe(updatedProductData.name); // Verifica que el nombre actualizado sea el correcto
  });

  // Prueba 2: Verifica que se maneje un ID inválido correctamente
  it('debería devolver un error 400 si el ID no es válido', async () => {
    const invalidId = 'abc'; // Un ID no numérico, por lo que es inválido
    const productData = {
      name: 'Producto test',
      price: 100,
      description: 'Descripción test',
      image: 'url-de-imagen',
    };

    // Simula la solicitud PUT con un ID inválido
    const response = await request(app)
      .put(`/products/${invalidId}`)
      .send(productData);

    // Verificaciones
    expect(response.status).toBe(400); // Verifica que el código de estado sea 400 (Bad Request)
    expect(response.body.error).toBe('El ID proporcionado no es válido.'); // Verifica que el mensaje de error sea correcto
  });

  // Prueba 3: Verifica que se manejen correctamente los campos obligatorios vacíos
  it('debería devolver un error 400 si algún campo está vacío', async () => {
    const productId = 1;
    const incompleteProductData = {
      name: 'Producto test',
      price: 100,
      description: '', // Descripción vacía, lo que causará un error
      image: 'url-de-imagen',
    };

    // Simula la solicitud PUT con datos incompletos
    const response = await request(app)
      .put(`/products/${productId}`)
      .send(incompleteProductData);

    // Verificaciones
    expect(response.status).toBe(400); // Verifica que el código de estado sea 400
    expect(response.body.error).toBe('Todos los campos son obligatorios.'); // Verifica que el mensaje de error sea correcto
  });

  // Prueba 4: Verifica que se maneje correctamente cuando el producto no es encontrado
  it('debería devolver un error 404 si el producto no existe', async () => {
    const productId = 1;
    const productData = {
      name: 'Producto test',
      price: 100,
      description: 'Descripción test',
      image: 'url-de-imagen',
    };

    // Simula que findByPk no encuentra el producto
    Product.findByPk.mockResolvedValue(null);

    // Simula la solicitud PUT cuando el producto no existe
    const response = await request(app)
      .put(`/products/${productId}`)
      .send(productData);

    // Verificaciones
    expect(response.status).toBe(404); // Verifica que el código de estado sea 404 (Not Found)
    expect(response.body.error).toBe('Producto no encontrado.'); // Verifica que el mensaje de error sea correcto
  });

  // Prueba 5: Verifica que se maneje un error en la base de datos al intentar actualizar el producto
  it('debería manejar errores al actualizar el producto', async () => {
    const productId = 1;
    const productData = {
      name: 'Producto test',
      price: 100,
      description: 'Descripción test',
      image: 'url-de-imagen',
    };

    // Simula la existencia del producto, pero con un error al guardar
    const mockProduct = {
      id: productId,
      ...productData,
      save: jest.fn().mockRejectedValue(new Error('Database error')), // Simula que save lanza un error
    };

    Product.findByPk.mockResolvedValue(mockProduct);

    // Simula la solicitud PUT que genera un error en la base de datos
    const response = await request(app)
      .put(`/products/${productId}`)
      .send(productData);

    // Verificaciones
    expect(response.status).toBe(500); // Verifica que el código de estado sea 500 (Internal Server Error)
    expect(response.body.error).toBe('Hubo un problema al actualizar el producto.'); // Verifica que el mensaje de error sea correcto
  });
});