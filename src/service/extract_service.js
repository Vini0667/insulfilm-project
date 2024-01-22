const Extract = require(`../models/Extract`);

function registerExtract (extract) {
    return new Extract(extract).save();
}

function findCurrentExtract () {
    return Extract.findOne().lean().sort({updateDate: `desc`});
}

module.exports = {
    findCurrentExtract,
    registerExtract
}