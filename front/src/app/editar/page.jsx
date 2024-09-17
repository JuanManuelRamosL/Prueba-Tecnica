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

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete.id);
      fetchProducts();
      setIsModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleEdit = (id) => {
    router.push(`/editar/${id}`);
    fetchProductById(id);
  };

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.length === 0 ? (
          <>
            <p>Cargando...</p>
            <SuspenseCard />
          </>
        ) : (
          currentProducts.map((product) => (
            <CardEdit
              key={product.id}
              product={product}
              handleEdit={handleEdit}
              handleDelete={() => openDeleteModal(product)}
            />
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
      />

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              ¿Estás seguro de que deseas eliminar el producto{" "}
              <span className="text-red-500">{productToDelete?.name}</span>?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
