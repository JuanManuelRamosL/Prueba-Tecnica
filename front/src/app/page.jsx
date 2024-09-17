"use client";
import Link from "next/link";
// pages/index.js
import { useRouter } from "next/navigation";
import React from "react";

export default function LandingPage() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/home"); // Redirige a la página '/home'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 p-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Bienvenido a tu E-Commerce
        </h1>
        <p className="text-lg text-white mb-8">
          Administra tus productos de manera sencilla y eficiente.
        </p>
        <Link href="/home">
          <button className="px-6 py-3 bg-white text-purple-600 rounded-full text-lg font-semibold hover:bg-purple-100 transition">
            Administrar Productos
          </button>
        </Link>
      </div>
    </div>
  );
}
