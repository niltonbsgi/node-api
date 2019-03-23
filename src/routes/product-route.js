'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controller/product-controller');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/id/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/remove/:id', controller.del);

module.exports = router;