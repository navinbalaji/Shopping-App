import express from "express";
import { ITEMS, ORDERS, DISCOUNT, ORDER_THRESHOULD, ORDER_DISCOUNT_VALUE } from "../db/database.js";
import { generateRandomId } from "../utils/common.js";

export const cartModuleRouter = express.Router();

// Handle a POST request to add an item to the cart.
cartModuleRouter.post("/add-to-cart", (req, res) => {
  const { items, userId, discountCode, quantity } = req.body;

  if (!items || items.length == 0) {
    return res.status(404).json({ error: "item arry not found" });
  }

  let errorArray = [];
  let itemArray = [];

  // Check if the item exists.
  items?.forEach((d) => {
    let itemFound = 0;

    ITEMS.forEach((item) => {
      if (d.itemId == item.itemId) {
        if (item.quantity === 0 || item.quantity < d.quantity) {
          errorArray.push(`Item ${d.itemId} out of stock`);
        } else {
          itemArray.push({ ...item, quantity: d.quantity });
        }
        itemFound = 1;
      }
    });

    if (!itemFound) {
      errorArray.push(`Item ${d.itemId} not found`);
    }
  });

  if (errorArray.length > 0) {
    return res.status(404).json({ error: errorArray });
  }

  // Check if a discount is available based on a threshold.

  // If the discount threshold is met, generate a random discount code.
  let isDiscountAvailable = checkIfThreshould(userId);
  let discountCodeGenerated = null;
  let totalAmount = 0;

  if (isDiscountAvailable && !discountCode) {
    discountCodeGenerated = generateRandomId();
    saveDiscountCode(discountCodeGenerated);
  } else {
    // Calculate the total amount without a discount.
    itemArray?.forEach((d) => {
      totalAmount = d.price * parseInt(d.quantity);
    });
  }

  // Apply a discount if a discount code is provided.
  if (discountCode) {
    totalAmount -= ORDER_DISCOUNT_VALUE;
  }

  // Update item quantities to reflect the added item to the cart.
  recalculateTheItemStocks(itemArray);

  // Create an order data object.
  const orderData = {
    orderId: generateRandomId(),
    userId,
    items,
    totalPurchaseAmount: totalAmount,
    discountCode: discountCode,
    discountCodeGenerated: discountCodeGenerated,
    totalDiscountAmount:ORDER_DISCOUNT_VALUE
  };

  // Add the order data to the list of orders.
  ORDERS.push(orderData);

  res.status(200).json({ message: "Item added to the cart successfully", orderData });
});

// Function to update item quantities in the stock.
const recalculateTheItemStocks = (items) => {
  for (const item of items) {
    for (const existingItem of ITEMS) {
      if (item.itemId == existingItem.itemId) {
        existingItem.quantity = existingItem.quantity - item.quantity;
      }
    }
  }

  return;
};

// Function to check if a user has met the order threshold.
const checkIfThreshould = (userId) => {
  return ORDERS.filter((e) => e.userId == userId).length == ORDER_THRESHOULD ? true : false;
};

// Function to save a generated discount code.
const saveDiscountCode = (discountCode) => DISCOUNT.push(discountCode);
