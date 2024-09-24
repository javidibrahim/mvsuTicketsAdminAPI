const express = require('express');
const multer = require('multer');
const upload = require('../../server/config/multerConfig');
const {
    createVenue,
    getAllVenues,
    getVenueByID,
    updateVenueByID,
    deleteVenueByID,
    getVenueImage,
    getVenueByID_noImage
} = require('./venueControllers');

const venue = express.Router();

/**
 * @route POST /api/venues
 * @description Creates a new venue
 * @access Public
 */
venue.post('/', upload.single('image'), createVenue);

/**
 * @route PUT /api/venues/:id
 * @description Updates a venue by ID
 * @access Public
 */
venue.put('/:id', upload.single('image'), updateVenueByID);

/**
 * @route GET /api/venues
 * @description Retrieves all venues
 * @access Public
 */
venue.get('/', getAllVenues);

/**
 * @route GET /api/venues/:id
 * @description Retrieves a venue by ID
 * @access Public
 */
venue.get('/:id', getVenueByID);

/**
 * @route GET /api/venues/:id
 * @description Retrieves a venue by ID
 * @access Public
 */
venue.get('/noImage/:id', getVenueByID_noImage);

/**
 * @route GET /api/venues/:id/image
 * @description Retrieves the image for a venue by ID
 * @access Public
 */
venue.get('/:id/image', getVenueImage);

/**
 * @route DELETE /api/venues/:id
 * @description Deletes a venue by ID
 * @access Public
 */
venue.delete('/:id', deleteVenueByID);

module.exports = venue;
