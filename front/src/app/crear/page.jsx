"use client"; // Si estás usando Next.js con el app directory

import React, { useState, useEffect } from "react";
import useProductStore from "@/store/useProductStore";
import ListProduct from "@/components/listProduct";

export default function CreateProductForm() {
  const { createProduct, products, fetchProducts } = useProductStore();
  const [lista, setLista] = useState(null);

  // Estado local para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // Nuevo estado para el mensaje de éxito

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = await createProduct(formData);
    if (!newProduct) {
      setError("Hubo un problema al crear el producto.");
      setSuccessMessage(""); // Limpiar el mensaje de éxito si hay error
    } else {
      setError(null); // Limpiar el error si el producto se crea bien
      setSuccessMessage("¡Se ha creado un producto con éxito!"); // Mostrar el mensaje de éxito
    }
  };

  // useEffect para cargar los productos cuando el componente se monta
  useEffect(() => {
    fetchProducts();
    setLista(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>

      {error && <div className="text-red-500">{error}</div>}
      {successMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      {/* Mostrar mensaje de éxito */}

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
      {lista ? (
        <ul className="space-y-4">
          {products.map((product) => (
            <ListProduct key={product.id} product={product}></ListProduct>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
