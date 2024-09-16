"use client";
import Link from "next/link";
import "./nav.css";
import useProductStore from "@/store/useProductStore";
import { useState } from "react";

export default function Nav() {
  const { setSearchTerm } = useProductStore();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Actualiza el término de búsqueda en el store
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container-buscador">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Buscar productos..."
          className="p-2 rounded-md text-black"
        />
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link href="/">
            <p className="text-white hover:text-gray-400">Productos</p>
          </Link>
        </li>
        <li>
          <Link href="/crear">
            <p className="text-white hover:text-gray-400">Crear Productos</p>
          </Link>
        </li>
        <li>
          <Link href="/editar">
            <p className="text-white hover:text-gray-400">Editar Productos</p>
          </Link>
        </li>
        <li>
          <Link href="/carrito">
            <p className="text-white hover:text-gray-400">carrito</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
