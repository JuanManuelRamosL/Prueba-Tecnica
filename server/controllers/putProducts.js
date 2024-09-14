import { Product } from "../models/products.js";

export const putProductById = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image } = req.body;

  // Validación: Verificar que el ID sea un número válido
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "El ID proporcionado no es válido." });
  }

  // Validaciones básicas para los campos obligatorios
  if (!name || !price || !description || !image) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  try {
    // Buscar el producto por ID
    const product = await Product.findByPk(id);

    // Si el producto no existe, devolver un error 404
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    // Actualizar los campos del producto
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;

    // Guardar los cambios en la base de datos
    await product.save();

    // Enviar el producto actualizado en la respuesta
    res.status(200).json({ message: "Producto actualizado con éxito.", product });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: "Hubo un problema al actualizar el producto." });
  }
};
