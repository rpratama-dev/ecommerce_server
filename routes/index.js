const UserController = require('../controllers/UserController');
const { authentication, authorizeCustomer } = require('../middleware/auth');

const router = require('express').Router();
const productRouter = require('./product-router');
const categoryRouter = require('./category-router');
const bannerRouter = require('./banner-router');
const whistlistRouter = require('./whistlist-router');
const cartRouter = require('./cart-router');

router.get("/", (req, res, next) => {
  res.status(200).json({ status: 200, message: "connected" });
})

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use('/products', productRouter)
router.use('/categories', categoryRouter)
router.use('/banners', bannerRouter)

router.use(authentication);
router.use(authorizeCustomer)

router.use('/whistlists', whistlistRouter)
router.use('/carts', cartRouter)

module.exports = router;