const express = require('express');
const { getDeviation } = require('../Controllers/deviationController');

const router = express.Router();

router.get('/', getDeviation);

module.exports = router;
