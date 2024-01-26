// Requiring packages
    const express = require(`express`);

// Requiring my files
    const { registerClientDataValidation } = require(`../helpers/client_helper`);
    const client_service = require(`../service/client_service`);
    const listing = require(`../helpers/listing`);

// Defining variables
    const router = express.Router();

// Routes

    // Get routes
        router.get(`/register`, (req, res) => {
            res.render(`client/register-client`, {
                title: `Cadastrar Cliente`
            });
        });

        router.get(`/listing`, (req, res) => {
            listing.listingDefaultPage({req, res}, client_service, `Lista de clientes`, `client/listing-client`, `cliente`);
        });

        router.get(`/listing/:skip`, (req, res) => {
            listing.listingSkipPage({req, res}, client_service, `Lista de clientes`, `client/listing-client`, `cliente`, `/client/listing`,parseInt(req.params.skip));
        });

    // Post routes
        router.post(`/register`, registerClientDataValidation, (req, res) => {
            let newClient = {
                name: req.body.name,
                contact: req.body.contact
            };

            client_service.registerClient(newClient).then((client) => {
                req.flash(`success_msg`, `O cadastro de: ${client.name} foi um sucesso!`);
                res.redirect("/");
            }).catch((error) => {
                req.flash(`error_msg`, `Ouve um erro interno no cadastramento. ERRO: ${error}. Tente novamente mais tarde`);
                res.redirect("/");
            });
        });

module.exports = router;