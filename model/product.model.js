const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product: String,
  price: Number,
  Description: String,
  Quantity: Number,
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
