const express = require('express');
const router = express.Router();

const code_controller = require('../controllers/code_controller');

router.post('/create', code_controller.createFile);

module.exports = router;