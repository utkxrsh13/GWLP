const router = require('express').Router();
const { predictAndStore, getUserHistory } = require('../controllers/AuthController'); 
const { authenticate } = require('../middlewares/AuthValidation');

router.post('/predict-and-store', authenticate, predictAndStore);
router.get('/history', authenticate, getUserHistory);

module.exports = router;