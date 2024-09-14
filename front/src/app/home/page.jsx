"use client";

import React, { useEffect } from "react";
import useProductStore from "@/store/useProductStore";

export default function Home() {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
                    <h1 className="text-xl font-bold text-center">{product.name}</h1>
                    <h1 className="text-xl text-center">Precio: ${product.price}</h1>
                  </div>
                  <div className="w-full flex flex-col items-center gap-5 mt-5">
                    <div className="w-full flex justify-center">
                      <p className="w-full max-w-md text-center text-lg">{product.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center gap-4 mt-5">
                <button className="w-full max-w-xs bg-blue-600 text-white py-3 px-5 rounded-lg text-lg font-bold transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Comprar
                </button>
                <button className="w-full max-w-xs flex items-center justify-center">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current text-gray-800"
                  >
                    <path
                      d="M2 2H3.30616C3.55218 2 3.67519 2 3.77418 2.04524C3.86142 2.08511 3.93535 2.14922 3.98715 2.22995C4.04593 2.32154 4.06333 2.44332 4.09812 2.68686L4.57143 6M4.57143 6L5.62332 13.7314C5.75681 14.7125 5.82355 15.2031 6.0581 15.5723C6.26478 15.8977 6.56108 16.1564 6.91135 16.3174C7.30886 16.5 7.80394 16.5 8.79411 16.5H17.352C18.2945 16.5 18.7658 16.5 19.151 16.3304C19.4905 16.1809 19.7818 15.9398 19.9923 15.6342C20.2309 15.2876 20.3191 14.8247 20.4955 13.8988L21.8191 6.94969C21.8812 6.62381 21.9122 6.46087 21.8672 6.3335C21.8278 6.22177 21.7499 6.12768 21.6475 6.06802C21.5308 6 21.365 6 21.0332 6H4.57143ZM10 21C10 21.5523 9.55228 22 9 22C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20C9.55228 20 10 20.4477 10 21ZM18 21C18 21.5523 17.5523 22 17 22C16.4477 22 16 21.5523 16 21C16 20.4477 16.4477 20 17 20C17.5523 20 18 20.4477 18 21Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
