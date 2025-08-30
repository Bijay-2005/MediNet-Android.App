const {signup, login, getProfile}=require('../controller/AuthController');
const {signupvalidation, loginvalidation}=require('../Middlewares/Authvalidation');
const authMiddleware = require('../Middlewares/authMiddleware');

const router = require('express').Router();

router.post('/signup', signupvalidation, signup);
router.post('/login',loginvalidation,login);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;