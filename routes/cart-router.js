const router = require('express').Router()
const CartController = require('../controllers/CartController');
const { cekCart } = require('../middleware/auth');


router.get('/', CartController.index)
router.post('/', CartController.store)

router.patch('/:id', cekCart, CartController.patch)
router.delete('/:id', cekCart, CartController.delete)

module.exports = router