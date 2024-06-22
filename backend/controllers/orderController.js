  const { Order, User, Category } = require('../models');
  const path = require('path');

  exports.createOrder = async (req, res) => {
    try {
      const { name, category_id } = req.body;
      const image_url = req.file ? path.relative(path.join(__dirname, '..'), req.file.path) : null;

      const order = await Order.create({
        user_id: req.userId,
        category_id,
        name,
        image_url: image_url ? `/${image_url}` : null
      });

      res.status(201).json({ order });
    } catch (err) {
      console.error('Failed to create order:', err);
      res.status(400).json({ error: err.message });
    }
  };

  exports.getOrders = async (req, res) => {
    try {
      console.log("Fetching orders...");
      const orders = await Order.findAll({
        include: [
          { model: User, attributes: ['id', 'username'] },
          { model: Category, attributes: ['id', 'name'] }
        ]
      });
      res.status(200).json({ orders });
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      res.status(500).json({ error: err.message });
    }
  };

  exports.updateOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category_id } = req.body;
      const image_url = req.file ? path.relative(path.join(__dirname, '..'), req.file.path) : null;
  
      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      order.name = name;
      if (category_id) {
        order.category_id = category_id;
      }
      if (image_url) {
        order.image_url = image_url;
      }
      
      await order.save();
      res.status(200).json({ order });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

const fs = require('fs');

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // 删除与订单关联的图像文件
    if (order.image_url) {
      const imagePath = path.join(__dirname, '..', order.image_url);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Failed to delete image file:', err);
        } else {
          console.log('Image file deleted:', imagePath);
        }
      });
    }

    await order.destroy();
    res.status(200).json({ message: 'Order deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};