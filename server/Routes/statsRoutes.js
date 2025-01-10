const express = require('express');
const { getStats } = require('../Controllers/statscontroller');

const router = express.Router();

router.get('/', getStats);

module.exports = router;
