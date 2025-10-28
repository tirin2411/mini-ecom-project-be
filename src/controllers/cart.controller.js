import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";
import Product from "../models/product.model.js";

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({
      where: { userId },
      attributes: ['userId'],
      include: [
        {
          model: CartItem,
          as: "items",
          attributes: ['quantity'],
          include: [{ model: Product, as: "product", attributes: ['id', 'name', 'price'] }],
        },
      ],
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json({ cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addtoCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;
  let cart = await Cart.findOne({ where: { userId } });
  if (!cart) {
    cart = await Cart.create({ userId });
  }

  let existingItem = await CartItem.findOne({
    where: {
      cartId: cart.id,
      productId: productId,
    },
  });

  if (existingItem) {
    existingItem.quantity += quantity;
    await existingItem.save();
    return res.json({ message: "Updated quantity", item: existingItem });
  } else {
    const newItem = await CartItem.create({
      cartId: cart.id,
      productId: productId,
      quantity,
    });
    return res.json({ message: 'Added new item', item: newItem });
  }

};

const removeFromCart = async (req, res) => {
  const { id } = req.params;
  await Cart.destroy({ where: { id } });
  res.json({ message: "Removed" });
};

export default { getCart, addtoCart, removeFromCart };
