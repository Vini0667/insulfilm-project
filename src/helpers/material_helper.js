module.exports = {
    registerMaterialValidation: (req, res, next) => {
        let errors = [];
        
        if (!req.body.name) {
            errors.push({text: `Você deve informar o nome do material`});
        }
        if (!req.body.cost) {
            errors.push({text: `Você deve informar o custo do material`});
        }
        if (req.body.cost < 0) {
            errors.push({text: `Hahahaah. Quer dizer que você ganhou dinheiro ainda com o material`});
        }
        if (!isNaN(req.body.buyDate)) {
            errors.push({text: `A data não deve ser nula`});
        }
        if (errors.length == 0) {
            return next();
        } else {
            res.render("material/register-material", {
                title: `Cadastro de material`,
                errors: errors
            });
        }
    }
}