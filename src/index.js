import express from "express";
import "dotenv/config";
import { cartModuleRouter } from "./routes/AddToCart.js";
import { orderModuleRouter } from "./routes/Orders.js";
import { discountModuleRouter } from "./routes/Discount.js";
import { itemModuleRouter } from "./routes/Items.js";
import { userModuleRouter } from "./routes/User.js";

const shoppingApp = express();

//middle ware parsing json
shoppingApp.use(express.json());

/**
 *
 * Server Status
 * ping implementation
 */
shoppingApp.use("/ping", (req, res) => res.send("pong"));

/**
 * Import routes
 */

shoppingApp.use("/api/cart", cartModuleRouter);
shoppingApp.use("/api/order", orderModuleRouter);
shoppingApp.use("/api/discount", discountModuleRouter);
shoppingApp.use("/api/item", itemModuleRouter);
shoppingApp.use("/api/user", userModuleRouter);

/**
 *
 * Sever port configuration and listening
 */

const PORT = process.env.PORT || 8090;

shoppingApp.listen(PORT, () => {
  console.log("\x1b[34m", `SERVER is listing on PORT ${PORT} 🚀`);
});
