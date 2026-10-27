const Category = require('../models/category.model');

// Lấy danh sách danh mục
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });
    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh mục',
      error: err.message,
    });
  }
};

// Tạo danh mục mới (Admin)
const createCategory = async (req, res) => {
  try {
    const { name, slug, count, image, description } = req.body;
    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Danh mục này đã tồn tại' });
    }

    const category = await Category.create({ name, slug, count, image, description });
    return res.status(201).json({ success: true, category });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Lỗi khi tạo danh mục', error: err.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
};
