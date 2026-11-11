// backend/src/configs/config.js
//
// Hỗ trợ 2 môi trường:
//  - Node thông thường (local/Docker): đọc biến môi trường từ file .env (dotenv)
//  - Cloudflare Workers: worker.js gán vars/secrets vào globalThis.__WORKER_ENV__

const onWorkers =
  typeof globalThis.__WORKER_ENV__ === 'object' && globalThis.__WORKER_ENV__ !== null;

if (!onWorkers) {
  require('dotenv').config();
}

const workerEnv = onWorkers ? globalThis.__WORKER_ENV__ : {};

const getEnv = (key) => process.env[key] || workerEnv[key];

const requiredEnvVars = ['MONGO_URI', 'SECRET_KEY'];
const missing = requiredEnvVars.filter((key) => !getEnv(key));
if (missing.length > 0) {
  throw new Error(
    `Thiếu biến môi trường: ${missing.join(', ')}. ` +
      (onWorkers
        ? 'Set trong Cloudflare dashboard → Worker → Settings → Variables and Secrets (hoặc chạy: npx wrangler secret put <TÊN_BIẾN>).'
        : 'Kiểm tra lại file .env ở thư mục backend/.')
  );
}

const config = {
  port: Number(getEnv('PORT')) || 5000,
  mongoUri: getEnv('MONGO_URI'),
  secretKey: getEnv('SECRET_KEY'),
};

module.exports = config;
