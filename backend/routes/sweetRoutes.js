const express = require('express');
const router = express.Router();
const sweetController = require('../controllers/sweetController');

router.post('/', sweetController.addSweet); 
router.get('/', sweetController.getAllSweets);
router.put('/:id', sweetController.updateSweet);
router.delete('/:id', sweetController.deleteSweet);
router.put('/restock/:id', sweetController.restockSweet);
router.put('/purchase/:id', sweetController.purchaseSweet);

module.exports = router;