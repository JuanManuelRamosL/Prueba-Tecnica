"use client";
import { useState, useEffect } from "react";
import useProductStore from "../../../store/useProductStore"; // Importa tu store de Zustand
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

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
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

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
      setIsModalOpen(true); // Mostrar modal de éxito
    } else {
      alert("Error al actualizar el producto");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
      <Link href="/editar" className="w-min flex mb-8">
        <svg
          width="30px"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 8L8 12M8 12L12 16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
              className="w-full px-4 py-2 border rounded-md h-32 resize-none"
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
            className="px-4 py-2 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-600 cursor-pointer"
          >
            Editar Producto
          </button>
        </form>

        {selectedProduct && (
          <div className="bg-white shadow-md rounded-lg border border-gray-300 p-6 flex">
            <div className="flex-shrink-0 w-1/3 mr-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="flex-grow">
              <h1 className="text-xl font-bold mb-2">{selectedProduct.name}</h1>
              <h1 className="text-gray-700 text-xl font-bold mb-2">
                Precio: ${selectedProduct.price}
              </h1>
              <p className="text-gray-700">
                Descripción: {selectedProduct.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal de éxito */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Producto actualizado con éxito
            </h2>
            <button
              onClick={() => router.push("/")} // Redirige al hacer clic en aceptar
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProductForm;
