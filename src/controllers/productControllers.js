import prisma from "../prismaClient.js";

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un producto
export const createProduct = async (req, res) => {
  const { name, description, price, stock, active } = req.body;
  try {
    const product = await prisma.product.create({
      data: { name, description, price, stock, active },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, active } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, description, price, stock, active },
    });
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: "Producto no encontrado" });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(404).json({ error: "Producto no encontrado" });
  }
};
