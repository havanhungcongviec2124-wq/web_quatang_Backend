const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./configs/config');
const { seedDatabase } = require('./utils/seeder');

const authRouter = require('./routers/auth.router');
const categoryRouter = require('./routers/category.router');
const productRouter = require('./routers/product.router');
const orderRouter = require('./routers/order.router');
const voucherRouter = require('./routers/voucher.router');

const app = express();

app.use(cors());
app.use(express.json());

// ── Kết nối MongoDB (lazy + cache) ──────────────────────────────────────────
// Phù hợp cả Node truyền thống lẫn Cloudflare Workers:
// mỗi isolate của Worker chỉ kết nối 1 lần rồi dùng lại cho các request sau.
let connectionPromise = null;

const connectDB = () => {
  if (mongoose.connection.readyState === 1) return Promise.resolve();
  if (!connectionPromise) {
    connectionPromise = (async () => {
      console.log('⏳ Đang kết nối tới MongoDB Atlas...');
      await mongoose.connect(config.mongoUri);
      console.log(`✅ MongoDB connected thành công! (${mongoose.connection.name} @ ${mongoose.connection.host})`);

      // Tự seed dữ liệu nếu collection trống (chạy đúng 1 lần / isolate)
      await seedDatabase();
    })();
    // Nếu lỗi thì reset để request kế tiếp được thử kết nối lại
    connectionPromise.catch(() => {
      connectionPromise = null;
    });
  }
  return connectionPromise;
};

// Đảm bảo DB sẵn sàng trước mỗi request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('❌ MongoDB lỗi:', err.message);
    res.status(503).json({
      success: false,
      message: 'Không kết nối được database',
      error: err.message,
    });
  }
});

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

module.exports = app;
