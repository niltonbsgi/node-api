'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controller/order-controller');

router.get('/', controller.get);
router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.delete('/remove/:id', controller.del);

module.exports = router;