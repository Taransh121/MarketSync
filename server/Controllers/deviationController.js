const CryptoData = require('../Models/cryptoData');

const getDeviation = async (req, res) => {
    const { coin } = req.query;

    if (!coin) return res.status(400).json({ error: "Coin is required" });

    try {
        const data = await CryptoData.find({ coin }).sort({ timestamp: -1 }).limit(100);
        if (data.length < 2) return res.status(400).json({ error: "Not enough data for calculation" });

        const prices = data.map(d => d.price);
        const mean = prices.reduce((sum, val) => sum + val, 0) / prices.length;
        const variance = prices.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / prices.length;
        const deviation = Math.sqrt(variance);

        res.json({ deviation: deviation.toFixed(2) });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getDeviation };
