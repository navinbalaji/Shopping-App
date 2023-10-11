import express from "express";
import { successBaseResposneModel } from "../utils/common.js";
import { ITEMS } from "../db/database.js";

export const itemModuleRouter = express.Router();

// Handle a GET request to fetch all items.
itemModuleRouter.get("/all-items", (req, res) => {
  // Respond with a 200 (OK) status and a JSON object containing a success message and the list of items.
  res.status(200).json(successBaseResposneModel("Items Fetch Successfully", ITEMS));
});
