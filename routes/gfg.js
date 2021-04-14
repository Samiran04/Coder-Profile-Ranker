const express = require('express');
const router = express.Router();
const passport = require('passport');

const gfg_controller = require('../controllers/gfg_controller');

router.post('/enter-data', passport.checkAuthentication, gfg_controller.enterData);
router.get('/remove-data', passport.checkAuthentication, gfg_controller.removeData);

module.exports = router;