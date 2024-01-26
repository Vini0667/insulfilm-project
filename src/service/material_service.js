// Request files
    const Material = require(`../models/Material`);
    const default_find = require(`./default_find.json`);

function registerMaterial(material) {
    return new Material(material).save();
}

function findAllMaterial () {
    return Material.find({stillUse: true}).lean().sort({buyDate: `desc`});
}

function findWithLimits(skip = default_find.default_find_skip, limit = default_find.default_find_limit) {
    return Material.find({stillUse: true}).lean().sort({buyDate: `desc`}).skip(skip).limit(limit);
}

module.exports = {
    registerMaterial,
    findAllMaterial,
    findWithLimits
}