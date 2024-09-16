"use client";

import React, { useEffect, useState } from "react";
import useProductStore from "@/store/useProductStore";
import ProductCard from "@/components/cardProduct";
import Pagination from "@/components/pagination";

export default function Home() {
  const { products, fetchProducts, filteredProducts, apoyo, setApoyo } =
    useProductStore();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    if (products.length < 1 || apoyo === true) {
      fetchProducts();
      setApoyo(false);
    }
  }, [fetchProducts, products]);

  const productsToShow =
    filteredProducts.length > 0 ? filteredProducts : products;

  // Calcular el índice de los productos que se van a mostrar según la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsToShow.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(productsToShow.length / productsPerPage);

  // Funciones para cambiar de página
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-2 md:p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Productos</h1>
      <div className="flex flex-col items-center gap-8 md:gap-6">
        {currentProducts.length === 0 ? (
          <div className="w-full max-w-lg p-4 border border-gray-300 rounded-lg mb-5 animate-pulse">
            <div className="flex flex-col items-center">
              <div className="w-full h-40 bg-gray-300 rounded mb-4"></div>
              <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
              <div className="w-1/2 h-6 bg-gray-300 rounded mb-4"></div>
              <div className="w-5/6 h-4 bg-gray-200 rounded mb-2"></div>
              <div className="w-5/6 h-4 bg-gray-200 rounded mb-2"></div>
            </div>
          </div>
        ) : (
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {/* Paginación */}
      {productsToShow.length > productsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
    </div>
  );
}
