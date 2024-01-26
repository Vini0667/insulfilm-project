// Requiring files
    const Service = require(`../models/Service`);
    const default_find = require(`./default_find.json`);

function registerService(service) {
    return new Service(service).save();
}

module.exports = {
    registerService
}