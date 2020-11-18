const BannerController = require('../controllers/BannerController');
const { authentication, authorize, checkBanner } = require('../middleware/auth');

const router = require('express').Router()

router.get('/active', BannerController.activeBanner)

router.use(authentication);
router.use(authorize);

router.get('/', BannerController.index)
router.post('/', BannerController.store)
router.get('/:id', checkBanner, BannerController.show)
router.put('/:id', checkBanner, BannerController.update)
router.patch('/:id', checkBanner, BannerController.patch)
router.delete('/:id', checkBanner, BannerController.delete)

module.exports = router