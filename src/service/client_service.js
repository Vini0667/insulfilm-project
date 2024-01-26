// Requiring files
    const Client = require(`../models/Client`);
    const default_find = require(`./default_find.json`);

function registerClient(cliente) {
    return new Client(cliente).save();
}

function findAllClient () {
    return Client.find().lean();
}

function findWithLimits(skip = default_find.default_find_skip, limit = default_find.default_find_limit) {
    return Client.find().lean().sort({registerDate: `desc`}).skip(skip).limit(limit);
}

module.exports = {
    registerClient,
    findAllClient,
    findWithLimits
}