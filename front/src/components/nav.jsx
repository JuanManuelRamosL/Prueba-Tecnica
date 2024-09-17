"use client";
import Link from "next/link";
import useProductStore from "@/store/useProductStore";
import { useState } from "react";

export default function Nav() {
  const { setSearchTerm } = useProductStore();
  const [inputValue, setInputValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Actualiza el término de búsqueda en el store
  };

  return (
    <nav className="w-full fixed top-0 left-0 flex flex-col md:flex-row justify-between items-center bg-gray-800 p-4 z-50">
      {/* Logo / Search */}
      <div className="flex items-center w-full md:w-auto mb-4 md:mb-0 gap-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white text-2xl"
        >
          &#9776;
        </button>
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Buscar productos..."
          className="w-full p-2 rounded-[27px] text-black md:w-[400px]"
        />
      </div>

      {/* Menu Items */}
      <ul
        className={`flex flex-col md:flex-row gap-4 md:gap-8 items-center list-none transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-y-0" : "-translate-y-[calc(200%+1rem)]"
        } md:translate-y-0 absolute md:relative top-full left-0 right-0 bg-gray-800 md:bg-transparent p-4 md:p-0`}
      >
        <li>
          <Link
            href="/home"
            className="flex gap-2 items-center text-white font-bold text-lg hover:text-gray-400 transition-all duration-300 transition-all duration-300"
          >
            <svg
              width="30px"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0004 9V6C16.0004 3.79086 14.2095 2 12.0004 2C9.79123 2 8.00037 3.79086 8.00037 6V9M3.59237 10.352L2.99237 16.752C2.82178 18.5717 2.73648 19.4815 3.03842 20.1843C3.30367 20.8016 3.76849 21.3121 4.35839 21.6338C5.0299 22 5.94374 22 7.77142 22H16.2293C18.057 22 18.9708 22 19.6423 21.6338C20.2322 21.3121 20.6971 20.8016 20.9623 20.1843C21.2643 19.4815 21.179 18.5717 21.0084 16.752L20.4084 10.352C20.2643 8.81535 20.1923 8.04704 19.8467 7.46616C19.5424 6.95458 19.0927 6.54511 18.555 6.28984C17.9444 6 17.1727 6 15.6293 6L8.37142 6C6.82806 6 6.05638 6 5.44579 6.28984C4.90803 6.54511 4.45838 6.95458 4.15403 7.46616C3.80846 8.04704 3.73643 8.81534 3.59237 10.352Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Productos
          </Link>
        </li>
        <li>
          <Link
            href="/crear"
            className="flex gap-2 items-center text-white font-bold text-lg hover:text-gray-400 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-[30px]"
              fill="#fff"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
            </svg>
            Crear Productos
          </Link>
        </li>
        <li>
          <Link
            href="/editar"
            className="flex gap-2 items-center text-white font-bold text-lg hover:text-gray-400 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-[25px]"
              fill="#fff"
            >
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
            </svg>
            Editar Productos
          </Link>
        </li>
      </ul>
    </nav>
  );
}
