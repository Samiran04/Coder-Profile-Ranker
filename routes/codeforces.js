const express = require('express');
const router = express.Router();
const passport = require('passport');

const codeforces_controller = require('../controllers/codeforces_controller');

router.post('/enter-data', passport.checkAuthentication, codeforces_controller.enterData);
router.get('/remove-data', passport.checkAuthentication, codeforces_controller.removeData);

module.exports = router;