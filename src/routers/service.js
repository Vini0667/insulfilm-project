// Requiring packages
    const express = require(`express`);

// Requiring my files
    const Material = require(`../models/Material`);
    const Client = require(`../models/Client`);
    const MaterialService = require(`../models/MaterialService`);
const Service = require("../models/Service");

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
    router.post(`/register`, (req, res) => {
        req.body.serviceType = req.body.serviceType === "true";
        let newService = {
            serviceType: req.body.serviceType,
            price: req.body.price,
            spending: req.body.spending,
            serviceDate: req.body.serviceDate,
            client: req.body.client
        };

        new Service(newService).save().then((result) => {
            if (result) {
                for (let i = 0; i < req.body.material; i++) {
                    new MaterialService({service: result._id, material: req.body.material[i]}).save().then().catch((error) => {
                        req.flash(`error_msg`, `Ouve um erro ao cadastrar! ERRO: ${error}`);
                        res.redirect(`/`);
                    });
                }
                req.flash(`success_msg`, `O cadastro do serviço de ${req.body.serviceType ? `carro` : `blindex`} foi um sucesso`);
                res.redirect(`/`);
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