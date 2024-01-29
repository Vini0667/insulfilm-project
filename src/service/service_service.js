// Requiring files
    const Service = require(`../models/Service`);
    const default_find = require(`./default_find.json`);

function registerService(service) {
    return new Service(service).save();
}

function findWithLimits(skip = default_find.default_find_skip, limit = default_find.default_find_limit) {
    return Service.find().lean().populate(`client`).sort({serviceDate: `desc`}).skip(skip).limit(limit);
}

module.exports = {
    registerService,
    findWithLimits
}