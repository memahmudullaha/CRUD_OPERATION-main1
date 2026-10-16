const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "..env") });
const port = process.env.port || 2340;
const Connection = require("./config/Database.config");
app.use(express.json());
const productRoutes = require("./Routes/product.routes");

app.use("/api/v1/product", productRoutes);

const startServer = async () => {
  try {
    await Connection();
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exitCode = 1;
  }
};

startServer();
