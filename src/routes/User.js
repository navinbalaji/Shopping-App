import express from "express";
import { successBaseResposneModel } from "../utils/common.js";
import { ORDERS } from "../db/database.js";

export const userModuleRouter = express.Router();

// Handle a GET request to fetch all discounts.
userModuleRouter.get("/user-shopping-data", (req, res) => {
  let userId = req.query.userId;
  if (!userId) {
    // Return a 404 (Not Found) response with a failure message if userId is not provided.
    return res.status(404).json(failureBaseResposneModel("userId is required"));
  }

  let totalPurchaseAmount = 0;
  let discountCodes = [];
  let totalDiscountAmount = [];

  let userOrderData = ORDERS.filter((d) => {
    if (d.userId === parseInt(userId)) {
      if (d.discountCode) {
        discountCodes.push(d.discountCode);
      }
      totalDiscountAmount += d.totalDiscountAmount;
      totalPurchaseAmount += d.totalPurchaseAmount;
      return d;
    }
  });

  res.status(200).json(
    successBaseResposneModel("User Order Fetch Successfully", {
      userId,
      totalPurchaseAmount,
      discountCodes,
      totalDiscountAmount,
      countOfOrders: userOrderData.length,
    })
  );
});
