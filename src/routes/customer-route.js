'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controller/customer-controller');

router.post('/', controller.create);
router.post('/authenticate', controller.authenticate);
// router.delete('/remove/:id', controller.del);

module.exports = router;