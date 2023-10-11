import express from "express";
import { successBaseResposneModel, failureBaseResposneModel } from "../utils/common.js";
import { ORDERS } from "../db/database.js";

export const orderModuleRouter = express.Router();

// Handle a GET request to fetch orders by userId.
orderModuleRouter.get("/orders", (req, res) => {
  let userId = req.query.userId;
  if (!userId) {
    // Return a 404 (Not Found) response with a failure message if userId is not provided.
    return res.status(404).json(failureBaseResposneModel("userId is required"));
  }

  // Return a 200 (OK) response with a success message and a filtered list of orders based on userId.
  return res.status(200).json(
    successBaseResposneModel(
      "Orders Fetch Successfully",
      ORDERS.filter((e) => e.userId === parseInt(userId))
    )
  );
});

// Handle a GET request to fetch all orders.
orderModuleRouter.get("/all-orders", (req, res) => {
  // Return a 200 (OK) response with a success message and the entire list of orders.
  res.status(200).json(successBaseResposneModel("Orders Fetch Successfully", ORDERS));
});

// Handle a GET request to fetch orders by orderId.
orderModuleRouter.get("/orders-by-orderid", (req, res) => {
  let orderId = req.query.orderId;
  if (!orderId) {
    // Return a 404 (Not Found) response with a failure message if orderId is not provided.
    return res.status(404).json(failureBaseResposneModel("orderId is required"));
  }

  // Return a 200 (OK) response with a success message and a filtered list of orders based on orderId.
  return res.status(200).json(
    successBaseResposneModel(
      "Orders Fetch Successfully",
      ORDERS.filter((e) => e.orderId === orderId)
    )
  );
});
