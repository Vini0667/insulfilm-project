const Service = require(`../models/Service`);

function registerService(service) {
    return new Service(service).save();
}

module.exports = {
    registerService
}