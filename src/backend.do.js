// backend/src/backend.do.js
//
// Durable Object chạy toàn bộ app Express + Mongoose.
//
// Tại sao cần Durable Object?
// Cloudflare Workers không tái sử dụng được I/O (socket TCP) giữa các request,
// nên connection pool MongoDB trong Worker thường sẽ bị treo từ request thứ 2.
// Durable Object giữ isolate + connection sống giữa các request
// (Cloudflare khuyến nghị cách này cho MongoDB: warm ~35ms thay vì ~300ms/request).

import { DurableObject } from 'cloudflare:workers';
import { handleAsNodeRequest } from 'cloudflare:node';

const NODE_SERVER_PORT = 3000;

let appPromise = null; // cache Express app cho isolate này

export class BackendDO extends DurableObject {
  constructor(state, env) {
    super(state, env);

    if (!appPromise) {
      // Đưa vars/secrets (MONGO_URI, SECRET_KEY...) ra cho config.js đọc được
      globalThis.__WORKER_ENV__ = env;

      // Import sau khi đã gán env để config.js đọc đúng biến môi trường
      appPromise = import('./app.js').then((appModule) => {
        const app = appModule.default ?? appModule;
        // Đăng ký Node server nội bộ (trên Workers listen() không mở port thật)
        app.listen(NODE_SERVER_PORT);
        return app;
      });
    }
  }

  async fetch(request) {
    await appPromise;
    // Bridge request -> Node HTTP server của Express
    return handleAsNodeRequest(NODE_SERVER_PORT, request);
  }
}
