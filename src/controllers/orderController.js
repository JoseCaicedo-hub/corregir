// Crear una orden con productos
export const createOrder = async (req, res) => {
  const { total, direction, status, products } = req.body;
  // products: [{ productId, stock, price }]
  try {
    const order = await prisma.order.create({
      data: {
        total,
        direction,
        status,
        orderProducts: {
          create: products.map(p => ({
            product: { connect: { id: p.productId } },
            stock: p.stock,
            price: p.price,
          })),
        },
      },
      include: {
        orderProducts: true,
      },
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las órdenes con sus productos
export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderProducts: {
          include: {
            product: true,
          },
        },
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
