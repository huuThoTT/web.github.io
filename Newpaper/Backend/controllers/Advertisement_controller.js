const Advertisement = require('../models/Advertisement_model');

const advertisementController = {
  create: async (req, res) => {
    try {
      const newAdvertisement = new Advertisement(req.body);
      await newAdvertisement.save();
      res.status(201).json(newAdvertisement);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },
  getAll: async (req, res) => {
    try {
      if (req.user.role === 'guest') {
        const advertisements = await Advertisement.find({ isActive: true });
        return res.json(advertisements);
      } else {
        return res.json([]);
      }
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },
  getById: async (req, res) => {
    try {
      const advertisement = await Advertisement.findById(req.params.id);
      res.json(advertisement);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const updatedAdvertisement = await Advertisement.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedAdvertisement);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      await Advertisement.findByIdAndDelete(req.params.id);
      res.json({ message: 'Advertisement deleted' });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },
  toggle: async (req, res) => {
    try {
      const advertisement = await Advertisement.findById(req.params.id);
      advertisement.isActive = !advertisement.isActive;
      await advertisement.save();
      res.json(advertisement);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }
};

module.exports = advertisementController;
