const CategoryController = require('../controllers/CategoryController');
const { authentication, authorize, checkCategory } = require('../middleware/auth');

const router = require('express').Router()

router.use(authentication);
router.use(authorize);

router.get('/', CategoryController.index)
router.post('/', CategoryController.store)
router.get('/:id', checkCategory, CategoryController.show)
router.put('/:id', checkCategory, CategoryController.update)
router.delete('/:id', checkCategory, CategoryController.delete)

module.exports = router