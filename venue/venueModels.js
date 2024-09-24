const connection = require("../../server/config/db");

const mysqlvenuetable = process.env.MYSQL_VENUE_TABLE;
const venueID = process.env.MYSQL_VENUE_ID;
const venueName = process.env.MYSQL_VENUE_NAME;
const venueAddress = process.env.MYSQL_VENUE_ADDRESS;
const venueCity = process.env.MYSQL_VENUE_CITY;
const venueState = process.env.MYSQL_VENUE_STATE;
const venueZipCode = process.env.MYSQL_VENUE_ZIPCODE;
const venueImage = process.env.MYSQL_VENUE_IMAGE;

const Venue = {
    // Create a new venue
    create: (venue) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO ${mysqlvenuetable} (${venueName}, ${venueAddress}, ${venueCity}, ${venueState}, ${venueZipCode}, ${venueImage}) VALUES (?, ?, ?, ?, ?, ?)`;
            const values = [venue[venueName], venue[venueAddress], venue[venueCity], venue[venueState], venue[venueZipCode], venue[venueImage]];
            connection.query(query, values, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Get all venues
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${mysqlvenuetable}`;
            connection.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Get image by ID
    getImageByID: (ID) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT ${venueImage} FROM ${mysqlvenuetable} WHERE ${venueID} = ?`;
            connection.query(query, [ID], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Get a venue by ID
    getByID: (ID) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${mysqlvenuetable} WHERE ${venueID} = ?`;
            connection.query(query, [ID], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Get a venue by ID
    getByID_noImage: (ID) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT name, address, city, state, zipCode FROM ${mysqlvenuetable} WHERE ${venueID} = ?`;
            connection.query(query, [ID], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },
// Update a venue by ID
    updateByID: (ID, venue) => {
        return new Promise((resolve, reject) => {
            let query = `UPDATE ${mysqlvenuetable} SET ${venueName} = ?, ${venueAddress} = ?, ${venueCity} = ?, ${venueState} = ?, ${venueZipCode} = ?`;
            const values = [venue[venueName], venue[venueAddress], venue[venueCity], venue[venueState], venue[venueZipCode]];

            if (venue[venueImage]) {
                query += `, ${venueImage} = ?`;
                values.push(venue[venueImage]);
            }

            query += ` WHERE ${venueID} = ?`;
            values.push(ID);

            connection.query(query, values, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Delete a venue by ID
    deleteByID: (ID) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ${mysqlvenuetable} WHERE ${venueID} = ?`;
            connection.query(query, [ID], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
};

module.exports = Venue;
