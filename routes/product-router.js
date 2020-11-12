const ProductController = require('../controllers/ProductController');
const { authentication, authorize } = require('../middleware/auth');

const router = require('express').Router();

// For admin and customer no need authentication 
router.get("/", ProductController.index); 
router.get("/:id", ProductController.show);

router.use(authentication);

// For Admin Only
router.post("/", authorize, ProductController.store);
router.put("/:id", authorize, ProductController.update);
router.delete("/:id", authorize, ProductController.delete);
// router.patch("/:id", authorize, ProductController.patch);

module.exports = router
