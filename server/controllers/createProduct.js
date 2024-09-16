import { Product } from "../models/products.js";

export const createProduct = async (req, res) => {
  const { name, price, description, image } = req.body;

  // Validaciones manuales
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'El nombre es requerido y debe ser una cadena de texto.' });
  }

  if (!price || isNaN(price) || parseFloat(price) <= 0) {
    return res.status(400).json({ error: 'El precio es requerido y debe ser un número válido mayor a 0.' });
  }

  if (!description || description.length < 10) {
    return res.status(400).json({ error: 'La descripción es requerida y debe tener al menos 10 caracteres.' });
  }

  if (!image || image.length < 10) {
    return res.status(400).json({ error: 'La imagen es requerida.' });
  }

  try {
    // Crear el producto si las validaciones son correctas
    const newProduct = await Product.create({
      name: name.trim(),
      price: parseFloat(price),
      image: image ? image.trim() : null,
      description: description.trim(),
    });

    console.log(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ error: "Hubo un problema al crear el producto." });
  }
};

