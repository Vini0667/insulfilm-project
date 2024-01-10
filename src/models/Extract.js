const mongoose = require("mongoose");

const ExtractSchema = new mongoose.Schema({
    currentExtract: {
        type: Number,
        required: true
    },
    updateValue: {
        type: Number,
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service",
    },
    material: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "material"
    }
});

const Extract = mongoose.model("extract", ExtractSchema);

module.exports = Extract;