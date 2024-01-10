const mongoose = require(`mongoose`);

const ServiceSchema = new mongoose.Schema({
    serviceType: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    spending: {
        type: Number,
        required: true
    },
    serviceDate: {
        type: Date,
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `client`,
        required: true
    }
});

const Service = mongoose.model(`service`, ServiceSchema);

module.exports = Service;