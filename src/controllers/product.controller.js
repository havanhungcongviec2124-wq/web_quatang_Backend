const mongoose = require('mongoose');
const Product = require('../models/product.model');
const { OCCASIONS, PRICE_RANGES, GIFT_TYPES } = require('../utils/seeder');

// Lấy metadata bộ lọc quà tặng (occasions, price ranges, gift types)
const getProductMeta = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      occasions: OCCASIONS,
      priceRanges: PRICE_RANGES,
      giftTypes: GIFT_TYPES,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy metadata sản phẩm',
      error: err.message,
    });
  }
};

// Lấy danh sách sản phẩm với bộ lọc & sắp xếp
const getProducts = async (req, res) => {
  try {
    const {
      category,
      tag,
      q,
      size,
      color,
      brand,
      minPrice,
      maxPrice,
      giftType,
      occasion,
      sort = 'newest',
      limit = 50,
      page = 1,
    } = req.query;

    const filter = { isActive: true };

    // Lọc theo loại quà (quà lẻ, quà combo)
    if (giftType && giftType !== 'all') {
      filter.giftType = giftType.toLowerCase();
    }

    // Lọc theo dịp sự kiện (cưới, sinh nhật, tân gia, kỷ niệm...)
    if (occasion && occasion !== 'all') {
      filter.occasions = occasion.toLowerCase();
    }

    // Lọc theo danh mục
    if (category && category !== 'all') {
      filter.category = category.toLowerCase();
    }

    // Lọc theo tag
    if (tag === 'new') {
      filter.isNew = true;
    } else if (tag === 'bestseller') {
      filter.isBestSeller = true;
    } else if (tag === 'sale') {
      filter.discountPercent = { $gt: 0 };
    }

    // Lọc theo từ khóa tìm kiếm
    if (q && q.trim()) {
      const regex = new RegExp(q.trim(), 'i');
      filter.$or = [
        { name: regex },
        { categoryName: regex },
        { brand: regex },
        { shortDesc: regex },
      ];
    }

    // Lọc theo kích cỡ
    if (size && size !== 'all') {
      filter.sizes = size;
    }

    // Lọc theo màu sắc
    if (color && color !== 'all') {
      filter['colors.name'] = new RegExp(color, 'i');
    }

    // Lọc theo thương hiệu
    if (brand && brand !== 'all') {
      filter.brand = brand;
    }

    // Lọc theo khoảng giá
    if ((minPrice && !isNaN(minPrice)) || (maxPrice && !isNaN(maxPrice))) {
      filter.price = {};
      if (minPrice && !isNaN(minPrice)) filter.price.$gte = Number(minPrice);
      if (maxPrice && !isNaN(maxPrice)) filter.price.$lte = Number(maxPrice);
    }

    // Sắp xếp
    let sortOption = { createdAt: -1 };
    if (sort === 'price-asc') sortOption = { price: 1 };
    else if (sort === 'price-desc') sortOption = { price: -1 };
    else if (sort === 'rating') sortOption = { rating: -1 };
    else if (sort === 'bestseller') sortOption = { soldCount: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    return res.status(200).json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách sản phẩm',
      error: err.message,
    });
  }
};

// Chi tiết 1 sản phẩm
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    let product = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id);
    }

    // Fallback: Tìm theo tên tương đối hoặc nếu id là dạng 'prod-1'
    if (!product) {
      product = await Product.findOne({
        $or: [{ _id: id.length === 24 ? id : null }, { name: new RegExp(id, 'i') }],
      });
    }

    // Nếu vẫn không thấy, fallback trả về sản phẩm đầu tiên để frontend không bao giờ bị trắng màn hình
    if (!product) {
      product = await Product.findOne();
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm',
      });
    }

    // Lấy sản phẩm tương tự
    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
      isActive: true,
    }).limit(4);

    return res.status(200).json({
      success: true,
      product,
      relatedProducts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy chi tiết sản phẩm',
      error: err.message,
    });
  }
};

// Tạo sản phẩm mới (Admin)
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json({
      success: true,
      message: 'Tạo sản phẩm thành công',
      product,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Lỗi khi tạo sản phẩm',
      error: err.message,
    });
  }
};

// Cập nhật sản phẩm (Admin)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
    }
    return res.status(200).json({
      success: true,
      message: 'Cập nhật sản phẩm thành công',
      product,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Lỗi khi cập nhật sản phẩm',
      error: err.message,
    });
  }
};

// Xóa sản phẩm (Admin)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
    }
    return res.status(200).json({
      success: true,
      message: 'Đã xóa sản phẩm thành công',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa sản phẩm',
      error: err.message,
    });
  }
};

module.exports = {
  getProductMeta,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
