const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;">
        <h1 style="font-family: Arial, sans-serif;">Hey There! This is an amazon scraper API</h1>
        <div style="display: flex; justify-content: center; align-items: center; gap: 14px; font-family: Arial, sans-serif;"> 
        <span>End Points:</span>
        <span><span style="color: green; font-weight:bold;">GET</span> Product Details</span>
        <span><span style="color: green; font-weight:bold;">GET</span> Product Reviews</span>
        <span><span style="color: green; font-weight:bold;">GET</span> Search Products</span>
        </div>
      </div>
    `);
  });
  

// GET Product Details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_Key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_Key)}&url=https://www.amazon.in/dp/${productId}`);

        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error);
    }
});

// GET Product Review
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_Key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_Key)}&url=https://www.amazon.in/product-reviews/${productId}`);

        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error);
    }
});

// GET Product Offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_Key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_Key)}&url=https://www.amazon.in/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error);
    }
});

// GET Search Results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_Key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_Key)}&url=https://www.amazon.in/s?k=${searchQuery}`);

        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));