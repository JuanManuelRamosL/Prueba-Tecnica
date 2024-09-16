"use client";

import useProductStore from "@/store/useProductStore";
import { Link } from "lucide-react";
import { useEffect } from "react";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useProductStore();

  const totalPrice = cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center mt-[60px]">
        Tu Carrito
      </h1>
      {cart.length === 0 ? (
        <p className="text-center">El carrito está vacío.</p>
      ) : (
        <div className="flex flex-col items-center bg-white gap-6">
          {cart.map((product) => (
            <div
              key={product.id}
              className="max-w-lg p-4 border border-gray-300 rounded-lg mb-5"
            >
              <div className="flex items-center">
                <div className="flex flex-col items-start">
                  <h1 className="text-lg font-bold">{product.name}</h1>
                  <p className="text-xl">Cantidad: {product.quantity}</p>
                  <p className="text-xl font-bold">${product.price}</p>
                </div>
                <div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-32 h-auto object-cover mb-4"
                  />
                </div>
              </div>
              <div className="flex justify-around mt-4">
                <button
                  onClick={() => handleRemove(product.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-red-600 transition-all duration-300"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="max-w-lg p-4 border border-gray-300 rounded-lg mt-5">
            <h2 className="text-xl font-bold text-center">
              Total: ${totalPrice.toFixed(2)}
            </h2>
          </div>
        </div>
      )}

      {cart.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleClearCart}
            className="bg-red-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-red-600 transition-all duration-300"
          >
            Vaciar Carrito
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
