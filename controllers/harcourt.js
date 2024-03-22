const getProductInfo = require('../utils/harcourt/getProductInfo');
const getUrls = require('../utils/harcourt/getUrls');

const controller = require('./controller');
const site = "harcourt";

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