const ProductController = require('../controllers/ProductController');
const UserController = require('../controllers/UserController');
const { authentication, authorize } = require('../middleware/auth');

const router = require('express').Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ status: 200, message: "connected" });
})

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(authentication);

router.get("/products", authorize, ProductController.index);
router.post("/products", authorize, ProductController.store);
router.get("/products/:id", authorize, ProductController.show);
router.put("/products/:id", authorize, ProductController.update);
router.patch("/products/:id", authorize, ProductController.patch);
router.delete("/products/:id", authorize, ProductController.delete);



module.exports = router;