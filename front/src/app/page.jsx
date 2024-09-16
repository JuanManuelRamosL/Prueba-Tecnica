"use client";

import React, { useEffect } from "react";
import useProductStore from "@/store/useProductStore";
import ProductCard from "@/components/cardProduct";

export default function Home() {
  const { products, fetchProducts, filteredProducts, apoyo, setApoyo } =
    useProductStore();

  useEffect(() => {
    if (products.length < 1 || apoyo == true) {
      fetchProducts();
      setApoyo(false);
    }
  }, [fetchProducts, products]);

  const productsToShow =
    filteredProducts.length > 0 ? filteredProducts : products; // Si hay productos filtrados, mostrar esos, sino, todos
  return (
    <div className="p-2 md:p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Productos</h1>
      <div className="flex flex-col items-center gap-8 md:gap-6">
        {productsToShow.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          productsToShow.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
