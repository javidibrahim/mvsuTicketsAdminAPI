const connection = require("../../server/config/db");

const sportTable = process.env.MYSQL_SPORT_TABLE;
const sportID = process.env.MYSQL_SPORT_SPORT_ID;
const sportName = process.env.MYSQL_SPORT_SPORT_NAME;


const Sport ={
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${sportTable}`;
            connection.query(query, (err, results) => {
                if(err) reject(err);
                else resolve(results);
            });
        });
    },
}

module.exports = Sport;