const router = require('express').Router();
const { signup, login ,logout} = require('../controllers/AuthController');
const { signupValidation, loginValidation } = require('../middlewares/AuthValidation');

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.post("/logout", logout);

module.exports = router;