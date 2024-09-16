"use client";
import { useState, useEffect } from "react";
import useProductStore from "../../../store/useProductStore"; // Importa tu store de Zustand
import { useParams, useRouter } from "next/navigation";

const EditProductForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const { editProduct, fetchProducts, selectedProduct, setApoyo } =
    useProductStore();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  console.log(id);
  // Cargar los productos solo una vez cuando el componente se monta
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Cargar los datos del producto en el formulario cuando selectedProduct cambie
  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        price: selectedProduct.price,
        description: selectedProduct.description,
        image: selectedProduct.image,
      });
    }
  }, [selectedProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      name: formData.name,
      price: formData.price,
      description: formData.description,
      image: formData.image,
    };

    const response = await editProduct(id, updatedProduct);
    if (response) {
      setApoyo(true);
      alert("Producto actualizado con éxito");
      router.push("/");
    } else {
      alert("Error al actualizar el producto");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>

      {/* Grid layout con disposición para responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario: se muestra primero en mobile */}
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

        {/* Card del producto: se muestra en el lado izquierdo en pantallas grandes */}
        {selectedProduct && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">
              {selectedProduct.name}
            </h2>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-90 h-64 object-cover mb-4 rounded"
            />
            <p className="text-gray-700 mb-2">
              Descripción: {selectedProduct.description}
            </p>
            <p className="text-gray-700 font-bold">
              Precio: ${selectedProduct.price}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProductForm;
