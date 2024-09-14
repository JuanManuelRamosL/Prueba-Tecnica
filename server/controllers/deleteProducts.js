import { Product } from "../models/products.js";

export const deleteProductById = async (req, res) => {
  const { id } = req.params;

  // Validación: Verificar que el ID sea un número válido
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "El ID proporcionado no es válido." });
  }

  try {
    // Buscar el producto por ID
    const product = await Product.findByPk(id);

    // Si el producto no existe, devolver un error 404
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    // Si el producto existe, eliminarlo
    await product.destroy();
    res.status(200).json({ message: `Producto con ID ${id} eliminado con éxito.` });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Hubo un problema al eliminar el producto." });
  }
};
