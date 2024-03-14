const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const URLModel = require('../../models/fibre/URLModel');
const Product = require('../../models/fibre/ProductModel');

const { resolve } = require('path');
const scrapeData = (url) => new Promise(async (resolve, reject) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        // Set a higher timeout if necessary
        await page.setDefaultNavigationTimeout(0);

        await page.goto(url, { waitUntil: 'networkidle2' }); // Wait until there are no more than 2 network connections for 500 ms

        const html = await page.content(); // Get the rendered HTML content

        await browser.close();

        const $ = cheerio.load(html);

        const productName = $('.product__banner-title').text().trim();
        const productSku = url.split('=')[1];
        const collection = $('li.meta__item.meta__item--collection span.meta__value span').text().trim() || '';
        const fiberType = $('li.meta__item.meta__item--fiber span.meta__value span').text().trim() || '';
        const color = $('li.meta__item.meta__item--color span.meta__value span').text().trim() || '';
        const pattern = $('li.meta__item.meta__item--pattern span.meta__value span').text().trim() || '';
        const patternRepeat = $('li.meta__item.meta__item--pattern-repeat span.meta__value span').text().trim() || '';
        const width = $('li.meta__item.meta__item--width span.meta__value span').text().trim() || '';
        const fiberComposition = $('li.meta__item.meta__item--fiber-composition span.meta__value span').text().trim() || '';
        const backing = $('li.meta__item.meta__item--backing span.meta__value span').text().trim() || '';
        const construction = $('li.meta__item.meta__item--construction span.meta__value span').text().trim() || '';
        
        const imageUrls = [];
        $('div.PwzrGrid-root div.PwzrGrid-item div.pwzrjss5 img').each(function () {
            imageUrls.push($(this).attr('src'));
        });

        console.log("Scraped data:", {
            category: "carpet",
            brandName: "Fibreworks",
            productSku,
            productName,
            productDescription: "",
            collection,
            color,
            design: "",
            price: "",
            fiberType,
            pattern,
            patternRepeat,
            height: "",
            width,
            fiberComposition,
            usage: "",
            warranty: "",
            style: "",
            backing,
            construction,
            imageUrls,
        });
        resolve(props);
    } catch (error) {
        reject(error);
        console.log('Error fetching URL:', error);
    }
})

module.exports = () => {
    console.log('Get Product Info:');
    return new Promise(async resolve => {
        try {
            const allUrlModels = await URLModel.find({ new: true });
            let count = 0;

            const scrapingOneUrl = (i) => {
                scrapeData(allUrlModels[i].url).then(async product => {
                    const newProduct = new Product({ ...product, url: allUrlModels[i]._id });
                    await newProduct.save().then(() => console.log(`${++count} product is saved.`));
                  
                    if (i < allUrlModels.length-1) {
                        scrapingOneUrl(i + 1);
                    } else {
                        resolve();
                    }

                });
            }
            if (allUrlModels.length > 0) {
                scrapingOneUrl(0);
            } else {
                console.log("end");
                resolve();
            }
        } catch (error) {
            console.log("Error fetching URL:", error);
        }
    })
}