const mongoose = require("mongoose");

const MaterialServiceSchema = new mongoose.Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service",
        required: true
    },
    material: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "material"
    }
});

const MaterialService = mongoose.model("material_service", MaterialServiceSchema);

module.exports = MaterialService;