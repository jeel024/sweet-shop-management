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
        const { name, category, minPrice, maxPrice } = req.query;
        const query = {};

        if (name) query.name = { $regex: name, $options: 'i' };
        if (category) query.category = category;
        if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
        if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };

        const sweets = await Sweet.find(query);
        res.json(sweets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};