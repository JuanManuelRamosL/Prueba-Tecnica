"use client";
import useProductStore from "@/store/useProductStore";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const ProductDetail = () => {
  const { selectedProduct, fetchProductById } = useProductStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id, fetchProductById]);

  if (!selectedProduct) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="max-w-[1200px] mx-auto p-4 mt-[80px]">
      <Link href="/" className="w-min flex">
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

      <div className="flex flex-wrap gap-6 mt-6">
        <div className="flex-1 flex justify-center border border-gray-300 rounded-lg p-2 bg-white">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="max-w-full h-auto rounded-md"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl font-bold mb-4">{selectedProduct.name}</h1>
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            Precio: ${selectedProduct.price}
          </h1>
          <p>{selectedProduct.description}</p>
          <div className="flex gap-4 mt-4">
            <Link
              href={`/editar/${selectedProduct.id}`}
              className="inline-block text-white font-bold py-3 px-6 rounded-lg bg-yellow-500 text-lg transition-colors hover:bg-yellow-600 text-center"
            >
              Editar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
