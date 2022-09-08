const catchAsync = require("../middlewares/catchAsync");
const Products = require("../models/productsModels");

exports.getAll = catchAsync(async (req, res) => {
  const products = (await Products.find()) || null;

  res.status(200).json({
    success: true,
    data: products,
  });
});

exports.createProduct = catchAsync(async (req, res) => {
  const { title, description, photo, price } = req.body;

  const product = await Products.create({ title, description, photo, price });

  res.status(201).json({
    success: true,
    data: product,
  });
});

exports.getProductDetail = catchAsync(async (req, res) => {
  const id = req.params.id;
  const product = await Products.findById(id);

  res.status(200).json({
    success: true,
    data: product,
  });
});
exports.deleteProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const product = await Products.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    data: product,
  });
});

exports.updateProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { title, description, photo, price } = req.body;
  const product = await Products.findByIdAndUpdate(id, {
    title,
    description,
    photo,
    price,
  });

  res.status(200).json({
    success: true,
    data: product,
  });
});
