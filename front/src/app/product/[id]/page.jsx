"use client";
import useProductStore from "@/store/useProductStore";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const ProductDetail = () => {
  const { selectedProduct, fetchProductById } = useProductStore();
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchProductById(id); // Actualizar el estado con el producto seleccionado
    }
  }, [id, fetchProductById]);

  if (!selectedProduct) {
    return <p>Cargando...</p>; // Mostrar un mensaje de carga si no hay producto seleccionado
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{selectedProduct.name}</h1>
      <img
        src={selectedProduct.image}
        alt={selectedProduct.name}
        className="w-full max-w-md mb-4"
      />
      <p className="text-lg mb-4">{selectedProduct.description}</p>
      <p className="text-xl font-bold">Precio: ${selectedProduct.price}</p>
    </div>
  );
};

export default ProductDetail;
