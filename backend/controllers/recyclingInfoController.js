const { RecyclingInfo } = require('../models');

exports.createRecyclingInfo = async (req, res) => {
  try {
    const { user_id, clothing_type, description, image_url } = req.body;
    const recyclingInfo = await RecyclingInfo.create({ user_id, clothing_type, description, image_url });
    res.status(201).json({ recyclingInfo });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRecyclingInfos = async (req, res) => {
  try {
    const recyclingInfos = await RecyclingInfo.findAll();
    res.status(200).json({ recyclingInfos });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateRecyclingInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { clothing_type, description, image_url } = req.body;
    const recyclingInfo = await RecyclingInfo.findByPk(id);
    if (!recyclingInfo) {
      return res.status(404).json({ error: 'Recycling info not found' });
    }
    recyclingInfo.clothing_type = clothing_type;
    recyclingInfo.description = description;
    recyclingInfo.image_url = image_url;
    await recyclingInfo.save();
    res.status(200).json({ recyclingInfo });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteRecyclingInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const recyclingInfo = await RecyclingInfo.findByPk(id);
    if (!recyclingInfo) {
      return res.status(404).json({ error: 'Recycling info not found' });
    }
    await recyclingInfo.destroy();
    res.status(200).json({ message: 'Recycling info deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
