const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 测试数据库连接
db.sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// 同步数据库
db.sequelize.sync({ alter: true }) // 使用 alter: true 来强制同步结构，确保表结构更新
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error syncing database: ' + err));

// 路由
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/recycling-info', require('./routes/recyclingInfoRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));

// 静态文件服务
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
