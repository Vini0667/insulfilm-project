const Material = require(`../models/Material`);
const Client = require(`../models/Client`);

module.exports = {
    registerServiceValidation: (req, res, next) => {
        let errors = [];
        
        if (req.body.price < 0) {
            errors.push({text: `O preço deve ser um número maior ou igual a 0`});
        }
        if (req.body.spending < 0) {
            errors.push({text: `O valor com gastos extras deve ser maior ou igual a 0`});
        }
        if (req.body.serviceDate == null || req.body.serviceDate == undefined) {
            console.log(typeof req.body.serviceDate);
            errors.push({text: `Deve se colocar uma data valida`});
        }
        if (!req.body.client) {
            errors.push({text: `O cliente deve estar selecionado para cadastrar um serviço`});
        }
        if (!req.body.material) {
        errors.push({text: `Ao menos um material deve ser selecionado`});
        }
        if (errors.length == 0) {
            return next();
        } else {
            Client.find().lean().then((clients) => {
                Material.find().lean().then((materials) => {
                    res.render(`service/register-service`, {
                        title: `Cadastro de Serviço`,
                        errors: errors,
                        materials: materials,
                        clients: clients
                    });
                }).catch((error) => {
                    req.flash(`error_msg`, `Ouve um erro interno ao pesquisar os materiais! ERRO: ${error}`);
                    res.redirect(`/`);
                });
            }).catch((error) => {
                req.flash(`error_msg`, `Ouve um erro interno ao pesquisar os clientes! ERRO: ${error}`);
                res.redirect(`/`);
            });
        }
    }
}