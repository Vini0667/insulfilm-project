const mongoose = require(`mongoose`);

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    registerDate: {
        type: Date,
        default: Date.now
    }
});

const Client = mongoose.model(`client`, clientSchema);

module.exports = Client;