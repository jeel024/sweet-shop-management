const express = require('express');
const router = express.Router();
const sweetController = require('../controllers/sweetController');

router.post('/', sweetController.addSweet); 
router.get('/', sweetController.getAllSweets);
router.put('/:id', sweetController.updateSweet);
router.delete('/:id', sweetController.deleteSweet);

module.exports = router;