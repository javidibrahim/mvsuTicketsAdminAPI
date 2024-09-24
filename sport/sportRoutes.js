const express = require('express');
const sport = express.Router();
const{
    getAllSports,
} = require('./sportControllers');

/**
 * @route GET /api/sports
 * @description Retrieves all sports
 * @access Public
 */
sport.get('/', getAllSports);


module.exports = sport;