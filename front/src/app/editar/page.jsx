"use client";

import { useRouter } from "next/navigation"; // Cambia la importación aquí
import React, { useEffect } from "react";
import useProductStore from "@/store/useProductStore";

export default function Editar() {
  const { products, fetchProducts, deleteProduct, fetchProductById } =
    useProductStore();
  const router = useRouter(); // Mantén el uso del router

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      await deleteProduct(id);
      fetchProducts(); // Refrescar los productos después de eliminar
    }
  };

  const handleEdit = (id) => {
    router.push(`/editar/${id}`); // Redirigir a la página de edición con el ID del producto
    fetchProductById(id);
  };

  return (
    <div className="p-2 md:p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Productos</h1>
      <div className="flex flex-col items-center gap-8 md:gap-6">
        {products.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="w-full max-w-lg p-4 border border-gray-300 rounded-lg mb-5"
            >
              <div className="flex flex-col items-center">
                <div className="w-full flex justify-center items-center max-h-[50%]">
                  <img
                    src={product.image}
                    alt="Imagen del Producto"
                    className="min-w-[10%] max-w-full min-h-[50%] max-h-[80%]"
                  />
                </div>
                <div className="w-full flex flex-col items-center p-4">
                  <div className="w-full flex flex-col items-center">
                    <h1 className="text-xl font-bold text-center">
                      {product.name}
                    </h1>
                    <h1 className="text-xl text-center">
                      Precio: ${product.price}
                    </h1>
                  </div>
                  <div className="w-full flex flex-col items-center gap-5 mt-5">
                    <div className="w-full flex justify-center">
                      <p className="w-full max-w-md text-center text-lg">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center gap-4 mt-5">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="w-full max-w-xs bg-yellow-500 text-white py-3 px-5 rounded-lg text-lg font-bold transition-colors hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="w-full max-w-xs bg-red-600 text-white py-3 px-5 rounded-lg text-lg font-bold transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
