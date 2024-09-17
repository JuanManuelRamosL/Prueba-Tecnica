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

  // Estado para controlar el modal de confirmación de eliminación
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  //funcion para abrir modal de eliminar producto
  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  //funcion para confirmar eliminar producto
  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete.id);
      fetchProducts(); // Refrescar los productos después de eliminar
      setIsModalOpen(false); // Cerrar el modal después de la eliminación
      setProductToDelete(null);
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
            <SuspenseCard />
          </>
        ) : (
          currentProducts.map((product) => (
            <CardEdit
              key={product.id}
              product={product}
              handleEdit={handleEdit}
              handleDelete={() => openDeleteModal(product)} // Abrir el modal en lugar de eliminar directamente
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

      {/* Modal de confirmación de eliminación */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              ¿Estás seguro de que deseas eliminar el producto{" "}
              <span className="text-red-500">{productToDelete?.name}</span>?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)} // Cerrar modal sin eliminar
                className="px-4 py-2 bg-gray-300 text-black rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm} // Confirmar eliminación
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
