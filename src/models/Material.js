const mongoose = require(`mongoose`);

const MaterialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        require: true
    },
    stillUse: {
        type: Boolean,
        required: true,
        default: true
    },
    buyDate: {
        type: Date,
        require: true
    }
});

const Material = mongoose.model(`material`, MaterialSchema);

module.exports = Material;