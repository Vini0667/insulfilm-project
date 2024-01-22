const Client = require(`../models/Client`);

function registerClient(cliente) {
    return new Client(cliente).save();
}

function findAllClient () {
    return Client.find().lean();
}

module.exports = {
    registerClient,
    findAllClient
}