// server.js
require("dotenv").config(); // Đọc biến môi trường từ .env

const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");

const app = jsonServer.create();
const router = jsonServer.router(process.env.DB_FILE || "db.json");

// Gắn router db vào app (bắt buộc với json-server-auth)
app.db = router.db;

// Optional: Cấu hình quyền
const rules = auth.rewriter({
  // Mặc định: chỉ users mới có quyền sửa chính mình
  users: 600,
  messages: 640,
  // Bạn có thể viết thêm mapping route tùy chỉnh nếu cần
  // "/posts/:category": "/posts?category=:category",
});

// Middleware theo đúng thứ tự:
app.use(cors());           // ✅ Bổ sung CORS
app.use(rules);            // ✅ Rewriter phải trước auth
app.use(auth);             // ✅ Auth middleware
app.use(router);           // ✅ Router cuối cùng

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 JSON Server Auth is running on port ${PORT}`);
});
