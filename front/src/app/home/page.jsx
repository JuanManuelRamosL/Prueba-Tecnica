"use client";

import React, { useEffect, useState } from "react";
import useProductStore from "@/store/useProductStore";
import ProductCard from "@/components/cardProduct";
import Pagination from "@/components/pagination";
import SuspenseCard from "@/components/suspense";

export default function Home() {
  const { products, fetchProducts, filteredProducts, apoyo, setApoyo } =
    useProductStore();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // useEffect para cargar los productos
  useEffect(() => {
    if (products.length === 0 || apoyo) {
      fetchProducts();
      setApoyo(false);
    }
  }, [fetchProducts, products, apoyo]);

  // Determina si mostrar productos filtrados o todos los productos
  const productsToShow =
    filteredProducts.length > 0 ? filteredProducts : products;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsToShow.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(productsToShow.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-2 md:p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.length === 0 ? (
          <SuspenseCard></SuspenseCard>
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
