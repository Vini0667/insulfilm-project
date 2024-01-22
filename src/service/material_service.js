const Material = require(`../models/Material`);

function registerMaterial(material) {
    return new Material(material).save();
}

function findAllMaterial () {
    return Material.find().lean();
}

module.exports = {
    registerMaterial,
    findAllMaterial
}