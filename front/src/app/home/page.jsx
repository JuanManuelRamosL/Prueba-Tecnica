"use client";

import React, { useEffect } from "react";
import useProductStore from "@/store/useProductStore"; // Asegúrate de que la ruta sea correcta

export default function Home() {
  const { products, fetchProducts } = useProductStore();

  // Fetch de productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <h1>Productos</h1>
      <div>
        {products.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          products.map((product) => (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <p>Precio: ${product.price}</p>
              <p>{product.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
