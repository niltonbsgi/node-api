'use strict';

const validationContract = require('../validators/fluent-validators');
const repositories = require('../repositories/order-repositories');
const guid = require('guid');  

exports.get = async(req, res, next) => {
    try{
        const data = await repositories.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.create = async(req, res, next) => {
    try{
        await repositories.create({
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(201).send({
            message:'Pedido cadastrado com sucesso!'
        })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    } 
};