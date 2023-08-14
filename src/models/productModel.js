const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  photos: [{ type: String }],
  attributes: [
    {
      name: { type: String },
      value: { type: String },
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
