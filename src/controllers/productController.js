const Product = require('../models/productModel');

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find().populate('categories');
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate('categories');
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createProduct: async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).populate('categories');
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (deletedProduct) {
        res.json(deletedProduct);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = productController;
