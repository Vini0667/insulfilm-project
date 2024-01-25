// Requiring packages
    const express = require(`express`);

// Requiring my files
    const material_service = require(`../service/material_service`);
    const extract_service = require(`../service/extract_service`);
    const { registerMaterialValidation } = require(`../helpers/material_helper`);

// Defining variables
    const router = express.Router();

// Routes

    // Get routes
        router.get(`/register`, (req, res) => {
            res.render(`material/register-material`, {
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

            material_service.registerMaterial(newMaterial).then((material) => {
                extract_service.findCurrentExtract().then((extract) => {
                    let newExtract = {
                        message: `Compra de ${material.name}`,
                        currentExtract: extract ? (extract.currentExtract - material.cost) : - (material.cost),
                        updateValue: (- material.cost),
                        material: material._id
                    };

                    extract_service.registerExtract(newExtract).then(() => {
                        req.flash(`success_msg`, `O cadastro do material "${material.name}" foi um sucesso!`);
                        res.redirect(`/`);
                    }).catch((error) => {
                        req.flash(`error_msg`, `Ouve um erro ao atualizar o extrato! ERRO: ${error}`);
                        res.redirect(`/`);
                    });
                }).catch((error) => {
                    req.flash(`error_msg`, `Ouve um erro ao buscar o ultimo extrato! ERRO: ${error}`);
                    res.redirect(`/`);
                });                
            }).catch((error) => {
                req.flash(`error_msg`, `Nós tivemos um erro interno no cadastramento do material. ERRO: ${error}. Tente novamente mais tarde`);
                res.redirect(`/`);
            });
        });

module.exports = router;