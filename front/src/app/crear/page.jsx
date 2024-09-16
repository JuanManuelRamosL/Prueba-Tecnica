"use client"; // Si estás usando Next.js con el app directory

import React, { useState } from "react";
import useProductStore from "@/store/useProductStore";
import ListProduct from "@/components/listProduct";

export default function CreateProductForm() {
  const { createProduct, products } = useProductStore();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = await createProduct(formData);
    if (!newProduct) {
      setError("Hubo un problema al crear el producto.");
    } else {
      setError(null); // Limpiar el error si el producto se crea bien
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-black bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Precio</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-black bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-black bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Imagen URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-black bg-white"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Crear Producto
        </button>
      </form>

      <h2 className="text-xl font-bold mt-8">Productos Actuales</h2>
      <ul className="space-y-4">
        {products.map((product) => (
          <ListProduct product={product}></ListProduct>
        ))}
      </ul>
    </div>
  );
}
