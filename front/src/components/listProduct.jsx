"use client"; // Si estás usando Next.js con el app directory

import React, { useState } from "react";

export default function ListProduct({ product }) {
  return (
    <li
      key={product.id}
      className="flex items-center justify-between p-4 bg-white border rounded-lg shadow hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-12 h-12 object-cover rounded-full"
        />
        <span className="text-lg font-medium text-gray-800">
          {product.name}
        </span>
      </div>
      <span className="text-gray-600">${product.price}</span>
    </li>
  );
}
