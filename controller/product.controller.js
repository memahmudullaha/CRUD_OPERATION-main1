const Product = require("../model/product.model");

const CreateProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Create Product Successfully",
      data: product,
    });
  } catch (error) {
    const status = error.name === "ValidationError" || error.name === "CastError" ? 400 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};
const GetAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 5; 
    const skip = (page - 1) * limit;

    const totalData = await Product.countDocuments();
    const products = await Product.find().skip(skip).limit(limit);

    res.json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalData / limit),
      totalData: totalData,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const UpdateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    const status = error.name === "CastError" ? 400 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    const status = error.name === "CastError" ? 400 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

module.exports = {
  CreateProduct,
  GetAllProducts,
  UpdateProduct,
  DeleteProduct,
};
