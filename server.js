// Entry point cho môi trường Node thông thường (local dev, Docker, Render, Railway...)
// Khi deploy lên Cloudflare Workers sẽ dùng worker.js (xem wrangler.toml).
//
// Lưu ý: từ bản này, DB sẽ kết nối ở request đầu tiên (lazy) thay vì khi khởi động.

const app = require('./src/app');
const config = require('./src/configs/config');

app.listen(config.port, () => {
  console.log(`🚀 Server LUXE STORE running on http://localhost:${config.port}`);
});
