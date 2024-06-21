const { Order, User } = require('../models');
const path = require('path');

exports.createOrder = async (req, res) => {
  try {
    const { name } = req.body;
    const image_url = req.file ? path.relative(path.join(__dirname, '..'), req.file.path) : null;

    console.log('Creating order with data:', { name, image_url });

    const order = await Order.create({
      user_id: req.userId,
      name,
      image_url: image_url ? `/${image_url}` : null
    });

    console.log('Order created:', order);

    res.status(201).json({ order });
  } catch (err) {
    console.error('Failed to create order:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [User] });
    res.status(200).json({ orders });
  } catch (err) {
    console.error('Failed to fetch orders:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const image_url = req.file ? req.file.path : null;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    order.name = name;
    if (image_url) {
      order.image_url = image_url;
    }
    await order.save();
    res.status(200).json({ order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await order.destroy();
    res.status(200).json({ message: 'Order deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
