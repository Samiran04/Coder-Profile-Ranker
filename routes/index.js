const express = require('express');
const router = express.Router();

const home_controller = require('../controllers/home_controller');

router.get('/', home_controller.home);
router.use('/users/', require('./users'));
router.use('/codechef', require('./codechef'));
router.use('/codeforces', require('./codeforces'));

module.exports = router;