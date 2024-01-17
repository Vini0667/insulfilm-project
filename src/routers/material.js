// Requiring packages
    const express = require(`express`);

// Requiring my files
    const Material = require(`../models/Material`);
    const Extract = require(`../models/Extract`);
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

            new Material(newMaterial).save().then((material) => {
                if (material) {
                    Extract.findOne().lean().sort({updateDate: "desc"}).then((extract) => {
                        let newExtract = {
                            message: `Compra de ${req.body.name}`,
                            currentExtract: (extract - req.body.cost),
                            updateValue: - req.body.cost,
                            material: material._id
                        };

                        new Extract(newExtract).save().then(() => {
                            req.flash(`success_msg`, `O cadastro do material: ${req.body.name} foi um sucesso`);
                            res.redirect(`/`);
                        }).catch((error) => {
                            req.flash(`error_msg`, `Ouve um erro ao atualizar o extrato! ERRO ${error}`);
                        });
                    }).catch((error) => {
                        req.flash(`error_msg`, `Ouve um erro no cadastro do material! ERRO: ${error}`);
                        res.redirect(`/`);
                    });
                }
            }).catch((error) => {
                req.flash(`error_msg`, `Nós tivemos um erro interno no cadastramento do material. ERRO: ${error}. Tente novamente mais tarde`);
                res.redirect(`/`);
            });
        });

module.exports = router;