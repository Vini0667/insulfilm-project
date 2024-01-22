// Requiring packages
    const express = require(`express`);

// Requiring my files
    const service_service = require(`../service/service_service`);
    const material_service_service = require(`../service/material_service_service`);
    const material_service = require(`../service/material_service`);
    const extract_service = require(`../service/extract_service`);
    const client_service = require(`../service/client_service`);
    const { registerServiceValidation } = require (`../helpers/service_helper`);

// Defining variables
    const router = express.Router();

// Routes

// Get routes
    router.get(`/register`, (req, res) => {
        client_service.findAllClient().then((clients) => {
            material_service.findAllMaterial().then((materials) => {
                res.render(`service/register-service`, {
                    title: `Cadastro de Serviço`,
                    materials: materials,
                    clients: clients
                });
            }).catch((error) => {
                req.flash(`error_msg`, `Ouve um erro interno na busca dos dados dos materiais! ERRO: ${error}`);
                res.redirect(`/`);    
            })
        }).catch((error) => {
            req.flash(`error_msg`, `Ouve um erro interno na busca dos dados dos clientes! ERRO: ${error}`);
            res.redirect(`/`);
        });
    });

// Post routes
    router.post(`/register`, registerServiceValidation, (req, res) => { // Refatorar toda essa merda antes de dar merge
        console.log(req.body);
        req.body.serviceType = req.body.serviceType === `true`;
        let serviceType = req.body.serviceType ? `carro` : `blindex`;
        let newService = {
            serviceType: req.body.serviceType,
            price: req.body.price,
            spending: req.body.spending,
            serviceDate: req.body.serviceDate,
            client: req.body.client
        };

        service_service.registerService(newService).then((service) => {
            material_service_service.relatesMaterialsToTheService(service._id, Array.isArray(req.body.material) ? req.body.material : [req.body.material], {req, res});
            extract_service.findCurrentExtract().then((currentExtract) => {
                let newExtract = {
                    message: `Realizado serviço de um ${serviceType}`,
                    currentExtract: currentExtract.currentExtract + (service.price - service.spending),
                    updateValue: (service.price - service.spending),
                    service: service._id
                };

                extract_service.registerExtract(newExtract).then(() => {
                    req.flash(`success_msg`, `O cadastro do serviço de um ${serviceType} foi um sucesso!`);
                    res.redirect(`/`);
                }).catch((error) => {
                    req.flash(`error_msg`, `Ouve um erro ao atualizar o extrato! ERRO ${error}`);
                    res.redirect(`/`);
                })
            }).catch((error) => {
                req.flash(`error_msg`, `Ouve um erro ao buscar o último extrato! ERRO: ${error}`);
                res.redirect(`/`);
            });
        }).catch((error) => {
            req.flash(`error_msg`, `Ouve um erro interno ao cadastrar o serviço! ERRO: ${error}`);
            res.redirect(`/`);
        });
    });

module.exports = router;