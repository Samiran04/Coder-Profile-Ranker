const express = require('express');
const router = express.Router();
const passport = require('passport');

const users_controller = require('../controllers/usres_controller');

router.get('/sign-up', users_controller.checkUser, users_controller.signUp);
router.get('/sign-in', users_controller.checkUser, users_controller.signIn);

router.get('/:email', passport.checkAuthentication, users_controller.profile);
router.get('/destroy-session', passport.checkAuthentication, users_controller.destroySession);
router.post('/create', users_controller.create);
router.post('/create-session', passport.authenticate('local', 
{failureRedirect: '/users/sign-in'}), users_controller.createSession);

module.exports = router;