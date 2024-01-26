const default_find = require(`../service/default_find.json`);

function listingDefaultPage ({req, res}, service, title, renderFile, whatIsFind, additionalParams = null) {
    service.findWithLimits().then((response) => {
        res.render(renderFile, {
            title: title,
            list: response,
            previousButton: 0,
            nextButton: default_find.default_skip,
            additionalParams: additionalParams
        });
    }).catch((error) => {
        req.flash(`error_msg`, `Ouve um erro na busca de ${whatIsFind}! ERRO: ${error}`);
        res.redirect(`/error`);
    });
}

function listingSkipPage ({req, res}, service, title, renderFile, whatIsFind, whereWillRedirect, param, additionalParams = null) {
    let skip = param === 0 ? res.redirect(whereWillRedirect) : param;
    service.findWithLimits(skip).then((response) => {
        res.render(renderFile, {
            title: title,
            list: response.length !== 0 ? response : null,
            previousButton: (skip - default_find.default_skip),
            nextButton: (skip + default_find.default_skip),
            additionalParams: additionalParams
        });
    }).catch((error) => {
        req.flash(`error_msg`, `Ouve um erro na busca de ${whatIsFind}! ERRO: ${error}`);
        res.redirect(`/error`);
    });
}

module.exports = {
    listingDefaultPage,
    listingSkipPage
}