import express from "express";
import { ITEMS, SHOPPING_CART, ORDERS } from "../db/database.js";
import { generateRandomId } from "../utils/common.js";

export const cartModuleRouter = express.Router();

cartModuleRouter.post("/add-to-cart", (req, res) => {
  const { itemId, items, userId, discountCode = null } = req.body;

  // Check if the item exists.
  const item = ITEMS.find((item) => item.id === itemId);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  // Create or update the user's shopping cart.
  let userCart = SHOPPING_CART.find((cart) => cart.userId === userId);

  if (!userCart) {
    userCart = { userId, cartItems: [] };
    SHOPPING_CART.push(userCart);
  }

  // Check if the item is already in the cart.
  const cartItem = userCart.cartItems.find((item) => item.itemId === itemId);

  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    userCart.cartItems.push({ itemId, quantity });
  }

  

  ORDERS.push({
    orderId: generateRandomId(),
    userId,
    items,
    discountCode: discountCode,
  });
  removeUserCartItems(userId)
  recalculateTheItemStocks(items);

  res.status(200).json({ message: "Item added to the cart successfully" });
});

const recalculateTheItemStocks = (items) => {
  if (items.length === 0) {
    return;
  }
  for (const item of items) {
    for (const exsitingItems of ITEMS) {
      if (item.itemId === exsitingItems.itemId) {
        exsitingItems.quantity = exsitingItems.quantity - item.quantity;
      }
    }
  }
  return;
};

const removeUserCartItems = (userId) => {
  SHOPPING_CART = SHOPPING_CART.filter((user) => user.userId !== userId);
};
