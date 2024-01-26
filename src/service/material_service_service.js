// Requiring files
    const MaterialService = require(`../models/MaterialService`);
    const default_find = require(`./default_find.json`);

function relatesMaterialsToTheService (service_id, materials_ids, {req, res}) {
    materials_ids.forEach(material_id => {
        new MaterialService({service: service_id, material: material_id}).save().catch((error) => {
            req.flash(`error_msg`, `Ouve um erro ao relacionar os materiais ao serviço! ERRO: ${error}`);
        });
    });
}

module.exports = {
    relatesMaterialsToTheService
}