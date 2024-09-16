"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useProductStore from "@/store/useProductStore";
import CardEdit from "@/components/cardEdit";
import Pagination from "@/components/pagination";
import SuspenseCard from "@/components/suspense";

export default function Editar() {
  const {
    products,
    fetchProducts,
    deleteProduct,
    fetchProductById,
    filteredProducts,
  } = useProductStore();
  const router = useRouter();

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  //funcion para eliminar producto
  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      await deleteProduct(id);
      fetchProducts(); // Refrescar los productos después de eliminar
    }
  };

  //funcion para dirigir a editar producto
  const handleEdit = (id) => {
    router.push(`/editar/${id}`);
    fetchProductById(id);
  };

  // Filtrar productos a mostrar por página
  const productsToShow =
    filteredProducts.length > 0 ? filteredProducts : products;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsToShow.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(productsToShow.length / productsPerPage);

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-2 md:p-4 mt-[60px] bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Editar Productos</h1>
      <div className="flex flex-col items-center gap-8 md:gap-6">
        {currentProducts.length === 0 ? (
          <>
            <p>cargando...</p>
            <SuspenseCard></SuspenseCard>
          </>
        ) : (
          currentProducts.map((product) => (
            <CardEdit
              key={product.id}
              product={product}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Controles de Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
}
