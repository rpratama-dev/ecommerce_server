const CategoryController = require('../controllers/CategoryController');
const { authentication, authorize, checkCategory } = require('../middleware/auth');

const router = require('express').Router()

router.get('/', CategoryController.index)
router.get('/:id/products', CategoryController.productCategory)

router.use(authentication);
router.use(authorize);

router.post('/', CategoryController.store)
router.get('/:id', checkCategory, CategoryController.show)
router.put('/:id', checkCategory, CategoryController.update)
router.delete('/:id', checkCategory, CategoryController.delete)

module.exports = router