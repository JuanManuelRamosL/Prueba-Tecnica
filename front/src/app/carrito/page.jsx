"use client";

import useProductStore from "@/store/useProductStore";
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
      <h1 className="text-2xl font-bold mb-6 text-center">Tu Carrito</h1>
      {cart.length === 0 ? (
        <p className="text-center">El carrito está vacío.</p>
      ) : (
        <div className="flex flex-col items-center gap-6">
          {cart.map((product) => (
            <div
              key={product.id}
              className="w-full max-w-lg p-4 border border-gray-300 rounded-lg mb-5"
            >
              <div className="flex flex-col items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-32 h-32 object-cover mb-4"
                />
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-sm">Cantidad: {product.quantity}</p>
                <p className="text-lg font-semibold">${product.price}</p>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleRemove(product.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="w-full max-w-lg p-4 border border-gray-300 rounded-lg mt-5">
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
            className="bg-red-600 text-white py-3 px-6 rounded-lg"
          >
            Vaciar Carrito
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
