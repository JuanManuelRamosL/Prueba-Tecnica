"use client";

import React from "react";

export default function CardEdit({ product, handleEdit, handleDelete }) {
  return (
    <div className="w-full max-w-lg p-4 border border-gray-300 rounded-lg mb-5">
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
            <h1 className="text-xl font-bold text-center">{product.name}</h1>
            <h1 className="text-xl text-center">Precio: ${product.price}</h1>
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
  );
}
