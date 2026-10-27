// backend/config.js
require('dotenv').config();

const requiredEnvVars = ['MONGO_URI', 'SECRET_KEY', 'PORT'];

const missing = requiredEnvVars.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error('❌ Thiếu biến môi trường trong file .env:', missing.join(', '));
  process.exit(1);
}

const config = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI,
  secretKey: process.env.SECRET_KEY,
};

module.exports = config;