"use client";
import useProductStore from "@/store/useProductStore";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const ProductDetail = () => {
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const { selectedProduct, fetchProductById, addToCart } = useProductStore();
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchProductById(id); // Actualizar el estado con el producto seleccionado
    }
  }, [id, fetchProductById]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setFeedbackMessage(`"${product.name}" añadido al carrito`);
  };

  if (!selectedProduct) {
    return <p>Cargando...</p>; // Mostrar un mensaje de carga si no hay producto seleccionado
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/">
        <h1 className="text-blue-500 hover:underline text-lg mb-4 inline-block">
          Volver
        </h1>
      </Link>
      <h1 className="text-3xl font-bold mb-4">{selectedProduct.name}</h1>
      <img
        src={selectedProduct.image}
        alt={selectedProduct.name}
        className="w-90 max-w-md mb-4"
      />
      <p className="text-lg mb-4">{selectedProduct.description}</p>
      <p className="text-xl font-bold">Precio: ${selectedProduct.price}</p>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevenir que el click en el botón dispare la redirección
          handleAddToCart(selectedProduct);
        }}
        className="w-full max-w-xs bg-blue-600 text-white py-3 px-5 rounded-lg text-lg font-bold transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Comprar
      </button>
      <Link href="/editar">
        <button className="w-full max-w-xs bg-yellow-500 text-white py-3 px-5 rounded-lg text-lg font-bold transition-colors hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">
          Editar
        </button>
      </Link>
      {feedbackMessage && (
        <div className="mt-3 bg-green-100 text-green-800 py-2 px-4 rounded-lg">
          {feedbackMessage}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
