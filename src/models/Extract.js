const mongoose = require(`mongoose`);

const ExtractSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
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
        ref: `service`,
    },
    material: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `material`
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
});

const Extract = mongoose.model(`extract`, ExtractSchema);

module.exports = Extract;