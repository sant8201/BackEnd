const Category = require('../models/categoryModels');

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createCategory: async (req, res) => {
    try {
      const newCategory = new Category(req.body);
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedCategory);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
      if (deletedCategory) {
        res.json(deletedCategory);
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = categoryController;
