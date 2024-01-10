// Requiring packages
    const express = require(`express`);

// Requiring my files
    const Material = require(`../models/Material`);
    const { registerMaterialValidation } = require("../helpers/material_helper");

// Defining variables
    const router = express.Router();

// Routes

    // Get routes
        router.get(`/register`, (req, res) => {
            res.render("material/register-material", {
                title: `Cadastro de material`
            });
        });
    // Post routes
        router.post(`/register`, registerMaterialValidation, (req, res) => {
            let newMaterial = {
                name: req.body.name,
                cost: req.body.cost,
                buyDate: req.body.buyDate
            };

            new Material(newMaterial).save().then(() => {
                req.flash(`success_msg`, `O cadastro do material: ${req.body.name} foi um sucesso`);
                res.redirect(`/`);
            }).catch((error) => {
                req.flash(`error_msg`, `Nós tivemos um erro interno no cadastramento do material. ERRO: ${error}. Tente novamente mais tarde`);
                res.redirect(`/`);
            });
        });

module.exports = router;