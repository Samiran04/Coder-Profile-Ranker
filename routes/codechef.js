const express = require('express');
const router = express.Router();
const passport = require('passport');

const codechef_controller = require('../controllers/codechef_controller');

router.post('/enter-data', passport.checkAuthentication, codechef_controller.enterData);
router.get('/remove-data', passport.checkAuthentication, codechef_controller.removeData);

module.exports = router;