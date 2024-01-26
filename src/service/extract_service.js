// Requiring files 
    const Extract = require(`../models/Extract`);
    const default_find = require(`./default_find.json`);

function registerExtract (extract) {
    return new Extract(extract).save();
}

function findCurrentExtract () {
    return Extract.findOne().lean().sort({updateDate: `desc`});
}

function findAllExtract() {
    return Extract.find().lean();
}

function findWithLimits(skip = default_find.default_find_skip, limit = default_find.default_find_limit) {
    return Extract.find().skip(skip).limit(limit).sort({updateDate: `desc`}).lean();
}

module.exports = {
    findCurrentExtract,
    registerExtract,
    findAllExtract,
    findWithLimits
}