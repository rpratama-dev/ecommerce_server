const ProductController = require('../controllers/ProductController');
const { authentication, authorize } = require('../middleware/auth');

const router = require('express').Router();

// For admin and customer no need authentication 
router.get("/", ProductController.index); 
router.get("/:id", ProductController.show);

router.use(authentication);
router.use(authorize);

// For Admin Only
router.post("/", ProductController.store);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);
// router.patch("/:id", ProductController.patch);

module.exports = router
