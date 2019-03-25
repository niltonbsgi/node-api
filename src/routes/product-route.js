'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controller/product-controller');
const authService = require('../services/auth-service');


router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/id/:id', controller.getById);
router.post('/', authService.authorize, controller.create);
router.put('/:id', controller.update);
router.delete('/remove/:id', controller.del);

module.exports = router;