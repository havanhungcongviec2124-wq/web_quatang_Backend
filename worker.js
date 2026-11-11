// backend/worker.js — Entry point chạy trên Cloudflare Workers.
//
// - server.js : entry cho môi trường Node thông thường (local, Docker, Render...)
// - worker.js : entry cho Cloudflare Workers (wrangler.toml -> main = "worker.js")
//
// Mọi request được forward vào Durable Object BackendDO (src/backend.do.js)
// — nơi giữ app Express + connection MongoDB sống giữa các request.

import { BackendDO } from './src/backend.do.js';

// Wrangler yêu cầu export class Durable Object từ entry point
export { BackendDO };

export default {
  async fetch(request, env) {
    // Dùng 1 Durable Object duy nhất (singleton) cho toàn bộ backend
    const id = env.BACKEND.idFromName('luxestore-backend');

    // locationHint: đặt DO gần MongoDB Atlas (apac = Châu Á - Thái Bình Dương)
    // Chỉ có tác dụng lần đầu DO được tạo. Đổi thành weur/wnam/... nếu Atlas ở vùng khác.
    const stub = env.BACKEND.get(id, { locationHint: 'apac' });

    return stub.fetch(request);
  },
};
