"use client";
import { useState, Suspense } from "react";
import useProductStore from "@/store/useProductStore";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

// Componente de Carga
const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <p className="text-xl font-bold">Cargando producto...</p>
  </div>
);

const ProductDetail = () => {
  const { selectedProduct, fetchProductById, deleteProduct, fetchProducts } =
    useProductStore();
  const { id } = useParams();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id, fetchProductById]);

  // Función para manejar la eliminación
  const handleDelete = async () => {
    await deleteProduct(id);
    await fetchProducts();
    router.push("/"); // Redirige al usuario a la página principal después de eliminar el producto
  };

  if (!selectedProduct) {
    return <Loading />;
  }

  return (
    <div className="max-w-[1200px] mx-auto p-4 mt-[80px]">
      <Link href="/" className="w-min flex">
        <svg
          width="30px"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 8L8 12M8 12L12 16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <div className="flex flex-wrap gap-6 mt-6">
        <div className="flex-1 flex justify-center border border-gray-300 rounded-lg p-2 bg-white">
          <img
            src={selectedProduct?.image}
            alt={selectedProduct?.name}
            className="max-w-full h-auto rounded-md"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl font-bold mb-4">{selectedProduct?.name}</h1>
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            Precio: ${selectedProduct?.price}
          </h1>
          <p>{selectedProduct?.description}</p>
          <div className="flex gap-4 mt-4">
            <Link
              href={`/editar/${selectedProduct?.id}`}
              className="inline-block text-white font-bold py-3 px-6 rounded-lg bg-yellow-500 text-lg transition-colors hover:bg-yellow-600 text-center"
            >
              Editar
            </Link>

            {/* Botón para mostrar el modal */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-block text-white font-bold py-3 px-6 rounded-lg bg-red-500 text-lg transition-colors hover:bg-red-600 text-center"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              ¿Estás seguro de que deseas eliminar este producto?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Envolver el componente en Suspense en el export
const ProductDetailWithSuspense = () => (
  <Suspense fallback={<Loading />}>
    <ProductDetail />
  </Suspense>
);

export default ProductDetailWithSuspense;
