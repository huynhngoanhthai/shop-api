const express = require("express");
const productsController = require("../controllers/productsController");
const { jwtAuth } = require("../middlewares/jwtAuth");

const router = express.Router();

router.get("/getall", jwtAuth, productsController.getAll);

router.post("/createProduct", jwtAuth, productsController.createProduct);

router
  .route("/:id")
  .get(jwtAuth, productsController.getProductDetail)
  .delete(jwtAuth, productsController.deleteProduct)
  .patch(jwtAuth, productsController.updateProduct);
module.exports = router;
