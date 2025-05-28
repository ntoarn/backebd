// server.js
require("dotenv").config(); // Đọc biến môi trường từ .env

const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");

const app = jsonServer.create();
const router = jsonServer.router(process.env.DB_FILE || "db.json");
  
app.db = router.db;

const rules = auth.rewriter({
  users: 600,
  messages: 640,
 
});

app.use(cors());         
app.use(rules);            
app.use(auth);         
app.use(router);        

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 JSON Server Auth is running on port ${PORT}`);
});
