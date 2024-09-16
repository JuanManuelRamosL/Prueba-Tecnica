// "use client";
// import useProductStore from "@/store/useProductStore";
// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";

// const ProductDetail = () => {
//   const [feedbackMessage, setFeedbackMessage] = useState(null);
//   const { selectedProduct, fetchProductById, addToCart } = useProductStore();
//   const router = useRouter();
//   const { id } = useParams();

//   useEffect(() => {
//     if (id) {
//       fetchProductById(id);
//     }
//   }, [id, fetchProductById]);

//   const handleAddToCart = (product) => {
//     addToCart(product);
//     setFeedbackMessage(`"${product.name}" añadido al carrito`);
//   };

//   if (!selectedProduct) {
//     return <p>Cargando...</p>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Link href="/">
//         <h1 className="text-blue-500 hover:underline text-lg mb-4 inline-block">
//           Volver
//         </h1>
//       </Link>
//       <h1 className="text-3xl font-bold mb-4">{selectedProduct.name}</h1>
//       <img
//         src={selectedProduct.image}
//         alt={selectedProduct.name}
//         className="w-90 max-w-md mb-4"
//       />
//       <p className="text-lg mb-4">{selectedProduct.description}</p>
//       <p className="text-xl font-bold">Precio: ${selectedProduct.price}</p>
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           handleAddToCart(selectedProduct);
//         }}
//         className="w-full max-w-xs bg-blue-600 text-white py-3 px-5 rounded-lg text-lg font-bold transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         Comprar
//       </button>
//       <Link href="/editar">
//         <button className="w-full max-w-xs bg-yellow-500 text-white py-3 px-5 rounded-lg text-lg font-bold transition-colors hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">
//           Editar
//         </button>
//       </Link>
//       {feedbackMessage && (
//         <div className="mt-3 bg-green-100 text-green-800 py-2 px-4 rounded-lg">
//           {feedbackMessage}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetail;

"use client";
import useProductStore from "@/store/useProductStore";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const ProductDetail = () => {
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const { selectedProduct, fetchProductById, addToCart } = useProductStore();
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id, fetchProductById]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setFeedbackMessage(`"${product.name}" añadido al carrito`);
  };

  if (!selectedProduct) {
    return <p>Cargando...</p>;
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
        <div className="flex-1 flex justify-center border border-gray-300 rounded-lg p-2">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="max-w-full h-auto rounded-md"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl font-bold mb-4">{selectedProduct.name}</h1>
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            Precio: ${selectedProduct.price}
          </h1>
          <p>{selectedProduct.description}</p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(selectedProduct);
              }}
              className="flex gap-2 justify-center text-white font-bold py-3 px-6 rounded-lg bg-blue-500 text-lg transition-colors hover:bg-blue-600 cursor-pointer"
            >
              <svg
                width="30px"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2H3.30616C3.55218 2 3.67519 2 3.77418 2.04524C3.86142 2.08511 3.93535 2.14922 3.98715 2.22995C4.04593 2.32154 4.06333 2.44332 4.09812 2.68686L4.57143 6M4.57143 6L5.62332 13.7314C5.75681 14.7125 5.82355 15.2031 6.0581 15.5723C6.26478 15.8977 6.56108 16.1564 6.91135 16.3174C7.30886 16.5 7.80394 16.5 8.79411 16.5H17.352C18.2945 16.5 18.7658 16.5 19.151 16.3304C19.4905 16.1809 19.7818 15.9398 19.9923 15.6342C20.2309 15.2876 20.3191 14.8247 20.4955 13.8988L21.8191 6.94969C21.8812 6.62381 21.9122 6.46087 21.8672 6.3335C21.8278 6.22177 21.7499 6.12768 21.6475 6.06802C21.5308 6 21.365 6 21.0332 6H4.57143ZM10 21C10 21.5523 9.55228 22 9 22C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20C9.55228 20 10 20.4477 10 21ZM18 21C18 21.5523 17.5523 22 17 22C16.4477 22 16 21.5523 16 21C16 20.4477 16.4477 20 17 20C17.5523 20 18 20.4477 18 21Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Agregar al Carrito
            </button>
            <Link
              href="/editar"
              className="inline-block text-white font-bold py-3 px-6 rounded-lg bg-yellow-500 text-lg transition-colors hover:bg-yellow-600 text-center"
            >
              Editar
            </Link>
          </div>
          {feedbackMessage && (
            <div className="mt-3 bg-green-100 text-green-800 py-2 px-4 rounded-lg">
              {feedbackMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
