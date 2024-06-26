const express = require("express");
const prestigeController = require("../../controllers/prestige")
const prestigeMiddleware = require("../../middlewares/prestige")
// const cronJob = require("../../cron/prestige");
const router = express.Router();

router.get("/get_products_info", prestigeController.getProduct);
router.post("/cron", prestigeController.cron);

router.get("/start_scraping", prestigeMiddleware.isScrapingByOtherUser, prestigeController.startScraping)

// cronJob.prestigeCronJob();

module.exports = router;