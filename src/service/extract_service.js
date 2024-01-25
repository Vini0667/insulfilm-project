const Extract = require(`../models/Extract`);
const DEFAULT_FIND_LIMIT = 20;
const DEFAULT_FIND_SKIP = 0;
const DEFAULT_SKIP = 20;

function registerExtract (extract) {
    return new Extract(extract).save();
}

function findCurrentExtract () {
    return Extract.findOne().lean().sort({updateDate: `desc`});
}

function findAllExtract() {
    return Extract.find().lean();
}

function findExtractWithLimits(skip = DEFAULT_FIND_SKIP, limit = DEFAULT_FIND_LIMIT) {
    return Extract.find().skip(skip).limit(limit).lean();
}

module.exports = {
    findCurrentExtract,
    registerExtract,
    findAllExtract,
    findExtractWithLimits,
    DEFAULT_FIND_LIMIT,
    DEFAULT_FIND_SKIP,
    DEFAULT_SKIP
}