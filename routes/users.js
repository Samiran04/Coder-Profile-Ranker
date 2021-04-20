const express = require('express');
const router = express.Router();
const passport = require('passport');

const users_controller = require('../controllers/usres_controller');
const project_controller = require('../controllers/project_controller');
const code_controller = require('../controllers/code_controller');

router.get('/sign-up', users_controller.checkUser, users_controller.signUp);
router.get('/sign-in', users_controller.checkUser, users_controller.signIn);

router.get('/destroy-session', passport.checkAuthentication, users_controller.destroySession);
router.get('/:email', passport.checkAuthentication, users_controller.profile);
router.get('/:email/:name', passport.checkAuthentication, project_controller.displayProject);
router.get('/:email/:project/:name', passport.checkAuthentication, code_controller.openCode);
router.post('/create', users_controller.create);
router.post('/create-session', passport.authenticate('local', 
{failureRedirect: '/users/sign-in'}), users_controller.createSession);

module.exports = router;