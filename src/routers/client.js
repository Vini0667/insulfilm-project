// Requiring packages
    const express = require(`express`);

// Requiring my files
    const { registerClientDataValidation } = require(`../helpers/client_helper`);
    const Client = require(`../models/Client`);

// Defining variables
    const router = express.Router();

// Routes

    // Get routes
        router.get(`/register`, (req, res) => {
            res.render(`client/register-client`, {
                title: `Cadastrar Cliente`
            });
        });

    // Post routes
        router.post(`/register`, registerClientDataValidation, (req, res) => {
            let newClient = {
                name: req.body.name,
                contact: req.body.contact
            };

            new Client(newClient).save().then(() => {
                req.flash(`success_msg`, `O cadastro de: ${req.body.name} foi um sucesso!`);
                res.redirect("/");
            }).catch((error) => {
                req.flash(`error_msg`, `Ouve um erro interno no cadastramento. ERRO: ${error}. Tente novamente mais tarde`);
                res.redirect("/");
            });
        });

module.exports = router;