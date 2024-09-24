const connection = require("../../server/config/db");

const eventTable = process.env.MYSQL_EVENT_TABLE;
const eventID = process.env.MYSQL_EVENT_ID;
const eventName = process.env.MYSQL_EVENT_NAME;
const eventDate = process.env.MYSQL_EVENT_DATE;
const venueID = process.env.MYSQL_EVENT_VENUEID;
const sportID = process.env.MYSQL_EVENT_SPORTID;
const eventDescription = process.env.MYSQL_EVENT_DESCRIPTION;

const Event = {
    getAllEvents: () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${eventTable}`;
            connection.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },
    create: (eventData) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO ${eventTable} (${eventName}, ${eventDate}, ${venueID}, ${sportID}, ${eventDescription}) VALUES (?, ?, ?, ?, ?)`;
            const values = [eventData.name, eventData.date, eventData.venueID, eventData.sportID, eventData.description];
            connection.query(query, values, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ${eventTable} WHERE ${eventID} = ?`;
            connection.query(query, [id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },
    updateEventByID: (ID, eventData) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE ${eventTable} SET ${eventName} = ?, ${sportID} = ?, ${eventDate} = ?, ${eventDescription} = ?, ${venueID} = ? WHERE ${eventID} = ?`;
            const values = [eventData.name, eventData.sportID, eventData.date, eventData.description, eventData.venueID, ID];
            connection.query(query, values, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },
    getByID: (id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${eventTable} WHERE ${eventID} = ?`;
            connection.query(query, [id], (err, results) => {
                if (err) reject(err);
                else resolve(results[0]);
            });
        });
    }
};

module.exports = Event;
