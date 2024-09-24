const Venue = require('./venueModels');
const sharp = require("sharp");

// Controller to create a new venue
exports.createVenue = async (req, res) => {
    try {
        const newVenue = req.body;
        console.log('Creating new venue with data:', newVenue);

        // Validate the incoming data
        if (!newVenue.name || !newVenue.address || !newVenue.city || !newVenue.state || !newVenue.zipCode) {
            console.log('Validation failed: missing required fields');
            return res.status(400).json({
                message: 'All fields are required',
                venue: newVenue
            });
        }

        // Include image if available and check dimensions and size
        if (req.file) {
            console.log('Processing image file...');
            const imageBuffer = req.file.buffer;
            const image = await sharp(imageBuffer).metadata();
            console.log('Image metadata:', image);

            if (image.width < 200 || image.height < 200 || image.width > 2000 || image.height > 2000) {
                console.log('Image dimensions are out of the allowed range');
                return res.status(400).json({
                    message: 'Image dimensions must be between 200x200 and 2000x2000 pixels'
                });
            }
            if (req.file.size > 1024 * 1024) { // Check if file size is greater than 1MB
                console.log('Image size exceeds 1MB');
                return res.status(400).json({
                    message: 'Image size must be less than 1MB'
                });
            }
            newVenue.image = imageBuffer;
        }

        // Create the new venue in the database
        const result = await Venue.create(newVenue);
        console.log('Venue created successfully with result:', result);

        res.status(201).json({
            message: 'Venue created successfully',
            venue: { insertId: result.insertId }
        });
    } catch (err) {
        handleErrors(res, err, 'Error creating venue');
    }
};

// Controller to update a venue by ID
exports.updateVenueByID = async (req, res) => {
    try {
        const venueID = req.params.id;
        const updatedVenue = req.body;
        console.log(`Updating venue with ID: ${venueID} with data:`, updatedVenue);

        // Include image if available
        if (req.file) {
            console.log('Processing image file...');
            const imageBuffer = req.file.buffer;
            const image = await sharp(imageBuffer).metadata();
            console.log('Image metadata:', image);

            if (image.width < 200 || image.height < 200 || image.width > 2000 || image.height > 2000) {
                console.log('Image dimensions are out of the allowed range');
                return res.status(400).json({
                    message: 'Image dimensions must be between 200x200 and 2000x2000 pixels'
                });
            }
            if (req.file.size > 1024 * 1024) { // Check if file size is greater than 1MB
                console.log('Image size exceeds 1MB');
                return res.status(400).json({
                    message: 'Image size must be less than 1MB'
                });
            }
            updatedVenue.image = imageBuffer;
        }

        const result = await Venue.updateByID(venueID, updatedVenue);
        if (result.affectedRows === 0) {
            console.log(`No venue found with ID: ${venueID}`);
            return res.status(404).json({
                message: 'Venue not found'
            });
        }
        console.log('Venue updated successfully with ID:', venueID);
        res.status(200).json({
            message: 'Venue updated successfully'
        });
    } catch (err) {
        handleErrors(res, err, 'Error updating venue');
    }
};

// Controller to get all venues
exports.getAllVenues = async (req, res) => {
    try {
        console.log('Fetching all venues');
        const venues = await Venue.getAll();
        res.status(200).json(venues);
    } catch (err) {
        handleErrors(res, err, 'Error fetching venues');
    }
};

// Controller to get a venue by ID
exports.getVenueByID = async (req, res) => {
    try {
        const venueID = req.params.id;
        console.log(`Fetching venue with ID: ${venueID}`);
        const venue = await Venue.getByID(venueID);
        if (venue.length === 0) {
            console.log(`No venue found with ID: ${venueID}`);
            return res.status(404).json({
                message: 'Venue not found'
            });
        }
        res.status(200).json(venue[0]);
    } catch (err) {
        handleErrors(res, err, 'Error fetching venue');
    }
};

// Controller to get a venue by ID
exports.getVenueByID_noImage = async (req, res) => {
    try {
        const venueID = req.params.id;
        const venue = await Venue.getByID_noImage(venueID);
        if (venue.length === 0) {
            console.log(`No venue found with ID: ${venueID}`);
            return res.status(404).json({
                message: 'Venue not found'
            });
        }
        res.status(200).json(venue[0]);
    } catch (err) {
        handleErrors(res, err, 'Error fetching venue');
    }
};


// Controller to delete a venue by ID
exports.deleteVenueByID = async (req, res) => {
    try {
        const venueID = req.params.id;
        console.log(`Deleting venue with ID: ${venueID}`);
        const result = await Venue.deleteByID(venueID);
        if (result.affectedRows === 0) {
            console.log(`No venue found with ID: ${venueID}`);
            return res.status(404).json({
                message: 'Venue not found'
            });
        }
        console.log('Venue deleted successfully with ID:', venueID);
        res.status(200).json({
            message: 'Venue deleted successfully'
        });
    } catch (err) {
        handleErrors(res, err, 'Error deleting venue');
    }
};

// Controller to serve image
exports.getVenueImage = async (req, res) => {
    try {
        const venueID = req.params.id;
        console.log(`Fetching image for venue with ID: ${venueID}`);
        const result = await Venue.getImageByID(venueID);
        if (result.length === 0) {
            console.log(`No image found for venue with ID: ${venueID}`);
            return res.status(404).json({
                message: 'Image not found'
            });
        }
        console.log('Fetched image for venue:', venueID);
        res.set('Content-Type', 'image/jpeg');
        res.send(result[0].image);
    } catch (err) {
        handleErrors(res, err, 'Error fetching venue image');
    }
};

// Error handling function
const handleErrors = (res, err, defaultMessage) => {
    console.error(defaultMessage, err);
    if (err.message.includes('File too large')) {
        return res.status(400).json({
            message: 'File size exceeds the limit of 1MB',
            error: err.message
        });
    }
    res.status(500).json({
        message: defaultMessage,
        error: err.message
    });
};
