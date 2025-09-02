// Crear un carrito vacío
export const createCart = async (req, res) => {
  try {
    const cart = await prisma.cart.create({});
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Agregar un producto al carrito
export const addToCart = async (req, res) => {
  const { cartId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const cartProduct = await prisma.cartProduct.create({
      data: {
        cart: { connect: { id: Number(cartId) } },
        product: { connect: { id: productId } },
        quantity,
      },
    });
    res.status(201).json(cartProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener un carrito con productos
export const getCart = async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await prisma.cart.findUnique({
      where: { id: Number(cartId) },
      include: {
        cartProducts: {
          include: { product: true },
        },
      },
    });
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un producto del carrito
export const removeFromCart = async (req, res) => {
  const { cartProductId } = req.params;
  try {
    await prisma.cartProduct.delete({
      where: { id: Number(cartProductId) },
    });
    res.json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    res.status(404).json({ error: "Producto no encontrado en el carrito" });
  }
};
