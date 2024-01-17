// Requiring packages
    const express = require(`express`);

// Requiring my files
    const Material = require(`../models/Material`);
    const Client = require(`../models/Client`);
    const MaterialService = require(`../models/MaterialService`);
    const Service = require("../models/Service");
    const Extract = require("../models/Extract");

// Defining variables
    const router = express.Router();

// Routes

// Get routes
    router.get(`/register`, (req, res) => {
        Material.find().lean().then((materials) => {
            Client.find().lean().then((clients) => {
                res.render(`service/register-service`, {
                    title: `Cadastro de Serviço`,
                    materials: materials,
                    clients: clients
                });
            }).catch((error) => {
                req.flash(`error_msg`, `Ouve um erro interno na busca dos dados! ERRO: ${error}`);
                res.redirect(`/`);
            });
        }).catch((error) => {
            req.flash(`error_msg`, `Ouve um erro interno na busca dos dados! ERRO: ${error}`);
            res.redirect(`/`);
        });
    });
// Post routes
    router.post(`/register`, (req, res) => { // Refatorar toda essa merda antes de dar merge
        req.body.serviceType = req.body.serviceType === "true";
        let newService = {
            serviceType: req.body.serviceType,
            price: req.body.price,
            spending: req.body.spending,
            serviceDate: req.body.serviceDate,
            client: req.body.client
        };

        new Service(newService).save().then((service) => {
            if (service) {
                if (Array.isArray(req.body.material)) {
                    for (let i = 0; i < req.body.material.length; i++) {
                        new MaterialService({service: service._id, material: req.body.material[i]}).save().catch((error) => {
                            req.flash(`error_msg`, `Ouve um erro ao cadastrar! ERRO: ${error}`);
                            // res.redirect(`/`);
                        });
                    }
                } else {
                    let material = [];
                    material.push(req.body.material);

                    for (let i = 0; i < material.length; i++) {
                        new MaterialService({service: service._id, material: req.body.material[i]}).save().catch((error) => {
                            req.flash(`error_msg`, `Ouve um erro ao cadastrar! ERRO: ${error}`);
                            // res.redirect(`/`);
                        });
                    }
                }
                
                Extract.findOne().lean().sort({updateDate: "desc"}).then((extract) => {
                    let liquidValue = req.body.price - req.body.spending;
                    console.log(extract);
                    let newExtract = {
                        message: `Receita de trabalho de ${req.body.serviceType ? `carro` : `blindex`}, realizado no dia ${req.body.serviceDate}`,
                        currentExtract: (extract.currentExtract + liquidValue),
                        updateValue: liquidValue,
                        service: service._id
                    };

                    new Extract(newExtract).save().then(() => {
                        console.log("FOI UM SUCESSO GRAVA, AQUI TA DANDO PAU");
                        req.flash(`success_msg`, `O registro do serviço de um ${req.body.serviceType ? `carro` : `blindex`} foi salvo com sucesso`);
                        res.redirect(`/`);
                    }).catch((error) => {
                        req.flash(`error_msg`, `Ouve um erro ao atualizar o extrato! ERRO: ${error}`);
                        res.redirect(`/`);
                    });
                }).catch((error) => {
                    req.flash(`error_msg`, `Ouve um erro ao puxar os dados! ERRO: ${error}`);
                    res.redirect(`/`);
                });
            } else {
                req.flash(`error_msg`, `Ouve um erro ao cadastrar!`);
                res.redirect(`/`);    
            }
        }).catch((error) => {
            req.flash(`error_msg`, `Ouve um erro ao cadastrar! ERRO: ${error}`);
            res.redirect(`/`);
        });
    });

module.exports = router;