const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./src/configs/config');
const { seedDatabase } = require('./src/utils/seeder');

const authRouter = require('./src/routers/auth.router');
const categoryRouter = require('./src/routers/category.router');
const productRouter = require('./src/routers/product.router');
const orderRouter = require('./src/routers/order.router');
const voucherRouter = require('./src/routers/voucher.router');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/vouchers', voucherRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'LUXE STORE Backend API is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

// Connect Database & Start Server
const connectDB = async () => {
  try {
    console.log('⏳ Đang kết nối tới MongoDB Atlas...');
    await mongoose.connect(config.mongoUri);

    console.log('✅ MongoDB connected thành công!');
    console.log(`   → Database: ${mongoose.connection.name}`);
    console.log(`   → Host: ${mongoose.connection.host}`);

    // Auto-seed initial data if collections are empty
    await seedDatabase();

    app.listen(config.port, () => {
      console.log(`🚀 Server LUXE STORE running on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connected THẤT BẠI!');
    console.error('   → Chi tiết lỗi:', err.message);
    process.exit(1);
  }
};

connectDB();

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB đã ngắt kết nối');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB lỗi:', err.message);
});