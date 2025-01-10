const CryptoData = require('../Models/cryptoData');

const getStats = async (req, res) => {
    const { coin } = req.query;

    if (!coin) return res.status(400).json({ error: "Coin is required" });

    try {
        const latestData = await CryptoData.findOne({ coin }).sort({ timestamp: -1 });
        if (!latestData) return res.status(404).json({ error: "No data found for the specified coin" });

        res.json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            "24hChange": latestData.change24h
        });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getStats };
