const Sweet = require('../models/Sweet');

exports.addSweet = async (req, res) => {
    try {
        const { name, category, price, quantity } = req.body;
        if (!name || !category || !price || !quantity) {
            return res.status(400).json({ message: 'All fields are required'});
        }
        const sweet = new Sweet({ name, category, price, quantity });
        await sweet.save();
        res.status(201).json(sweet);
    } catch (err) { 
        res.status(500).json({ error: err.message });
    }
};

exports.getAllSweets = async (req, res) => {
    try {
        const { name, category, minPrice, maxPrice, sortBy, sortOrder } = req.query;
        const query = {};

        if (name) query.name = { $regex: name, $options: 'i' };
        if (category) query.category = category;
        if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
        if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };

        let sort = {};
        if (sortBy) {
            sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }

        const sweets = await Sweet.find(query).sort(sort);
        res.json(sweets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.updateSweet = async (req, res) => {
    try {
        console.log(req.params.id);
        const id = req.params.id || req.query.id;
        const sweet = await Sweet.findByIdAndUpdate(id, req.body, { new: true });
        if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
        res.json(sweet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteSweet = async (req, res) => {
    try {
        const sweet = await Sweet.findByIdAndDelete(req.params.id);
        if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
        res.json({ message: 'Sweet deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.restockSweet = async (req, res) => {
    try {
        const { quantity } = req.body;
        const sweet = await Sweet.findById(req.params.id);
        if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
        sweet.quantity += Number(quantity);
        await sweet.save();
        res.json(sweet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.purchaseSweet = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid purchase quantity' });
    }

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    sweet.quantity -= Number(quantity);
    await sweet.save();

    res.json({ message: 'Purchase successful', sweet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
