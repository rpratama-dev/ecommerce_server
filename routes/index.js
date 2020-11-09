const UserController = require('../controllers/UserController');

const router = require('express').Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ status: 200, message: "connected" });
})

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(authentication)



module.exports = router;