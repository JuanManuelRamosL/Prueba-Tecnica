import request from 'supertest';
import app from '../app';  // Aquí importa tu aplicación Express
import { Product } from '../models/products';

// Mock de la base de datos (usando Jest)
jest.mock('../models/products');

describe('GET /products', () => {
  it('debería devolver una lista de productos', async () => {
    // Simula la respuesta de la base de datos
    const mockProducts = [
      { id: 1, name: 'Producto 1', price: 100, description: 'Descripción 1' },
      { id: 2, name: 'Producto 2', price: 200, description: 'Descripción 2' }
    ];

    // Simula que `Product.findAll` devuelve los productos simulados
    Product.findAll.mockResolvedValue(mockProducts);

    const res = await request(app).get('/products'); // Aquí ajusta la ruta según sea necesario

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockProducts);
    expect(Product.findAll).toHaveBeenCalled();  // Verifica que `findAll` fue llamado
  });

  it('debería manejar errores al obtener productos', async () => {
    // Simula un error en la base de datos
    Product.findAll.mockRejectedValue(new Error('Database error'));

    const res = await request(app).get('/products');

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({ error: 'Database error' });
  });
});
