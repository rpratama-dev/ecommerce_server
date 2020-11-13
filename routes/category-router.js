const CategoryController = require('../controllers/CategoryController');
const { authentication, authorize, cekCategory } = require('../middleware/auth');

const router = require('express').Router()


router.use(authentication);
router.use(authorize);

router.get('/', CategoryController.index)
router.post('/', CategoryController.store)
router.get('/:id', cekCategory, CategoryController.show)
router.put('/:id', cekCategory, CategoryController.update)
router.delete('/:id', cekCategory, CategoryController.delete)

module.exports = router