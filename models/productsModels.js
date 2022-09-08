const mongoose = require("mongoose");
const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    minlength: [3, "Must be at least 3 character "],
  },
  description: {
    type: String,
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },

  shopkeeper: String,

  category: {
    type: String,
  },
});

const Products = mongoose.model("products", productsSchema);

module.exports = Products;
