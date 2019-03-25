'use strict';

const validationContract = require('../validators/fluent-validators');
const repositories = require('../repositories/customer-repositories');
const md5 = require('md5');
const emailservice = require('../services/email-service');
const authservice = require('../services/auth-service');

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
        await repositories.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })

        emailservice.send(
            req.body.email, 
            'Bem vindo ao node store(Teste de envio de email)', 
            global.EMAIL_TMPL.replace('{0}', req.body.name));

        res.status(201).send({
            message:'Cliente cadastrado com sucesso!'
        })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    } 
};


exports.authenticate = async(req, res, next) => {

    try{
        const customer = await repositories.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if(!customer){
            res.status(404).send({
                message: 'Usuário ou senha inválido'
            });
            return;
        }

        const token = await authservice.generateToken({ 
            email: customer.email, 
            name: customer.name 
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email, 
                name: customer.name
            }
        })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    } 
};