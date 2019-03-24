'use strict';

const validationContract = require('../validators/fluent-validators');
const repositories = require('../repositories/customer-repositories');


exports.create = async(req, res, next) => {

    let contract = new validationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter ao menos 3 caracteres');
    //contract.isEmail(req.body.email, 'Email inválido');
    contract.hasMinLen(req.body.password, 3, 'A senha deve conter ao menos 3 caracteres');
    
    if(!contract.isValid()){
        res.status(400).send(contract.erros()).end()
        return;
    }

    try{
        await repositories.create(req.body)
        res.status(201).send({
            message:'Cliente cadastrado com sucesso!'
        })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    } 
};