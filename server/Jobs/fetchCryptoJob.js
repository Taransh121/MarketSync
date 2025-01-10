const cron = require('cron');
const CryptoData = require('../Models/cryptoData');
const fetchCryptoData = require('../services/fetchCryptoData');

const COINS = ['bitcoin', 'matic-network', 'ethereum'];

const fetchCryptoJob = () => {
    const job = new cron.CronJob('0 */2 * * *', async () => {
        // const job = new cron.CronJob('* * * * *', async () => {
        try {
            for (const coin of COINS) {
                const data = await fetchCryptoData(coin);
                await CryptoData.create({ coin, ...data });
                console.log(`Stored data for ${coin}`);
            }
        } catch (err) {
            console.error("Error in fetchCryptoJob", err);
        }
    });

    job.start();
};

module.exports = fetchCryptoJob;
