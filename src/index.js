import express from "express";
import "dotenv/config";
import { cartModuleRouter } from "./routes/AddToCart.js";

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

shoppingApp.use("/api", cartModuleRouter);

/**
 *
 * Sever port configuration and listening
 */

const PORT = process.env.PORT || 8090;

shoppingApp.listen(PORT, () => {
  console.log("\x1b[34m", `SERVER is listing on PORT ${PORT} 🚀`);
});
