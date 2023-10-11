import express from "express";
import { successBaseResposneModel } from "../utils/common.js";
import { DISCOUNT } from "../db/database.js";

export const discountModuleRouter = express.Router();

// Handle a GET request to fetch all discounts.
discountModuleRouter.get("/all-discount", (req, res) => {
  // Respond with a 200 (OK) status and a JSON object containing a success message and the list of discounts.
  res.status(200).json(successBaseResposneModel("Discount Fetch Successfully", DISCOUNT));
});
