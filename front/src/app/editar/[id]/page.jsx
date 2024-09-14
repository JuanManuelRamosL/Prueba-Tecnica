"use client";
import { useState, useEffect } from "react";
import useProductStore from "../../../store/useProductStore"; // Importa tu store de Zustand

const EditProductForm = ({ productId }) => {
  const { products, editProduct, fetchProducts } = useProductStore();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    // Cargar los productos desde el estado o desde la API
    fetchProducts();

    const productToEdit = products.find((product) => product.id === productId);
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        price: productToEdit.price,
        description: productToEdit.description,
        image: productToEdit.image,
      });
    }
  }, [products, productId, fetchProducts]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      name: formData.name,
      price: formData.price,
      description: formData.description,
      image: formData.image,
    };

    const response = await editProduct(productId, updatedProduct);
    if (response) {
      alert("Producto actualizado con éxito");
    } else {
      alert("Error al actualizar el producto");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Precio</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Imagen URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Editar Producto
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;
