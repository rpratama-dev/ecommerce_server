const router = require('express').Router()
const WhistlistController = require('../controllers/WhistlistController');
const { authentication, checkWhistlist } = require('../middleware/auth');

router.use(authentication);

router.get('/', WhistlistController.index)
router.post('/', WhistlistController.store)
router.delete('/:id', checkWhistlist, WhistlistController.delete)

module.exports = router