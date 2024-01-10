module.exports = {
    registerClientDataValidation: (req, res, next) => {
        let errors = [];
        if (!req.body.name) {
            errors.push({text: `Você deve adicionar um nome ao cliente`});
        }
        if (!req.body.contact) {
            errors.push({text: `Você deve adicionar um contato ao cliente`});
        }
        if (errors.length == 0) {
            return next();
        } else {
            res.render(`client/register-client`, {
                title: `Cadastrar Cliente`,
                errors: errors
            });
        }
    }
}