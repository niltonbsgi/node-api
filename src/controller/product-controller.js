'use strict';

const validationContract = require('../validators/fluent-validators');
const repositories = require('../repositories/product-repositories');

exports.get = async(req, res, next) =>{
    try{
        const data = await repositories.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.getBySlug = async(req, res, next) =>{
    try{
        const data = await repositories.getBySlug(req.params.slug);
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.getById = async(req, res, next) =>{
    try{
        const data = await repositories.getById(req.params.id)
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }    
};

exports.create = async(req, res, next) => {

    let contract = new validationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter ao menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O Slug deve conter ao menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O Description deve conter ao menos 3 caracteres');
    
    if(!contract.isValid()){
        res.status(400).send(contract.erros()).end()
        return;
    }

    try{
        await repositories.create(req.body)
        res.status(201).send({
            message:'Produto cadastrado com sucesso!'
        })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    } 
};

exports.update = async(req, res, next) => {
    
    try{
        await repositories.update(req.params.id, req.body)
        res.status(200).send({
            message:'Produto cadastrado com sucesso!'
        })
    }catch (e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.del = async(req, res, next) => {
    repositories
        .del(req.params.id)
        .then(x => {
            res.status(201).send({
                message: 'Produto removido com sucesso!'
            });
        })
        .catch( e => {
            res.status(400).send({
                message: 'Falha ao removido produto!', 
                data: e
            });
        })
};