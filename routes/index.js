const UserController = require('../controllers/UserController');

const router = require('express').Router();
const productRouter = require('./product-router');
const categoryRouter = require('./category-router');
const bannerRouter = require('./banner-router');

router.get("/", (req, res, next) => {
  res.status(200).json({ status: 200, message: "connected" });
})

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use('/products', productRouter)
router.use('/categories', categoryRouter)
router.use('/banners', bannerRouter)

module.exports = router;