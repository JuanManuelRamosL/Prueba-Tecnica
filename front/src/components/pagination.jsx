export default function Pagination({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
}) {
  return (
    <div className="flex justify-center mt-6 space-x-4">
      <button
        onClick={prevPage} // Asegúrate de que `prevPage` esté correctamente referenciado
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:bg-gray-200"
      >
        Anterior
      </button>
      <p className="text-lg font-bold">
        Página {currentPage} de {totalPages}
      </p>
      <button
        onClick={nextPage} // Asegúrate de que `nextPage` esté correctamente referenciado
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:bg-gray-200"
      >
        Siguiente
      </button>
    </div>
  );
}
