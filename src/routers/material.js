// Requiring packages
    const express = require(`express`);

// Requiring my files
    const material_service = require(`../service/material_service`);
    const extract_service = require(`../service/extract_service`);
    const { registerMaterialValidation } = require(`../helpers/material_helper`);
    const listing = require(`../helpers/listing`);
    const material_service_service = require(`../service/material_service_service`);
    const default_find = require(`../service/default_find.json`);

// Defining variables
    const router = express.Router();

// Routes

    // Get routes
        router.get(`/register`, (req, res) => {
            res.render(`material/register-material`, {
                title: `Cadastro de material`
            });
        });

        router.get(`/listing`, (req, res) => {
            listing.listingDefaultPage({req, res}, material_service, `Lista de materiais`, `material/listing-material`, `material`);
        });

        router.get(`/listing/:skip`, (req, res) => {
            listing.listingSkipPage({req, res}, material_service, `Lista de materiais`, `material/listing-material`, `material`, `/material/listing`,parseInt(req.params.skip));
        });

        router.get(`/list-of-service-materials/:id/:serviceType`, (req, res) => {
            req.params.serviceType = req.params.serviceType === `true`;
            material_service_service.findAllMaterialsByServiceId(req.params.id).then((materials) => {
                res.render(`material/list-materials-used-in-the-service`, {
                    title: `Materiais usados`,
                    serviceType: req.params.serviceType ? `serviço para carro.` : `serviço para blindex.`,
                    materials: materials
                });
            });
        });

        router.get(`/edit/:id/:next_page`, (req, res) => {
            let redirect;
            if ((parseInt(req.params.next_page) - default_find.default_skip) == 0) {
                redirect = `/material/listing`;
            } else {
                redirect = `/material/listing/${(parseInt(req.params.next_page) - default_find.default_skip)}`;
            }

            material_service.alterStillUseCampById(req.params.id).then(() => {
                req.flash(`success_msg`, `A mudança do material para sem uso foi um sucesso`);
                res.redirect(redirect);
            }).catch((error) => {
                req.flash(`error_msg`, `Ouve um erro na mudança do material! ERRO: ${error}`);
                res.redirect(redirect);
            });
        });
    
    // Post routes
        router.post(`/register`, registerMaterialValidation, (req, res) => {
            let newMaterial = {
                name: req.body.name,
                cost: - req.body.cost,
                buyDate: req.body.buyDate
            };

            material_service.registerMaterial(newMaterial).then((material) => {
                extract_service.findCurrentExtract().then((extract) => {
                    let newExtract = {
                        message: `Compra de ${material.name}`,
                        currentExtract: extract ? (extract.currentExtract + material.cost) :material.cost,
                        updateValue: material.cost,
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