// Requiring packages
    const express = require(`express`);

// Requiring my files
    const { registerClientDataValidation } = require(`../helpers/client_helper`);
    const client = require(`../service/client_service`);

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

            client.registerClient(newClient).then((client) => {
                req.flash(`success_msg`, `O cadastro de: ${client.name} foi um sucesso!`);
                res.redirect("/");
            }).catch((error) => {
                req.flash(`error_msg`, `Ouve um erro interno no cadastramento. ERRO: ${error}. Tente novamente mais tarde`);
                res.redirect("/");
            });
        });

module.exports = router;