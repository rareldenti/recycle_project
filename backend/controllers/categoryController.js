const { Category } = require('../models');

exports.createCategory = async (req, res) => {
  try {
    const { category_name, description, image_url } = req.body;
    const category = await Category.create({ category_name, description, image_url });
    res.status(201).json({ category });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({ categories });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name, description, image_url } = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    category.category_name = category_name;
    category.description = description;
    category.image_url = image_url;
    await category.save();
    res.status(200).json({ category });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    await category.destroy();
    res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
