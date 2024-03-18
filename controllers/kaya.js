const getProductInfo = require('../utils/kaya/getProductInfo');
const getUrls = require('../utils/kaya/getUrls');

const controller = require('./controller');
const site = "kaya";

const getProduct = async (req, res) => {
    controller.getProduct(req, res,site)
}
const startScraping = async (req, res) => {
    controller.startScraping(req, res,site,getProductInfo, getUrls)
}
module.exports = {
    getProduct,
    startScraping,
}