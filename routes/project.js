const express = require('express');
const router = express.Router();

const project_controller = require('../controllers/project_controller');

router.post('/create', project_controller.createProject);

module.exports = router;