const router = require("express").Router();
const {
  CreateProduct,
  GetAllProducts,
  UpdateProduct,
  DeleteProduct,
} = require("../controller/product.controller");

router.post("/createproduct", CreateProduct);
router.get("/getallproducts", GetAllProducts);
router.put("/updateproduct/:id", UpdateProduct);
router.delete("/deleteproduct/:id", DeleteProduct);

module.exports = router;
