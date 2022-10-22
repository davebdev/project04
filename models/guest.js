const db = require("../database/db");

const Guest  = {
    getAllGuestInfo: () => {
        const sql = 'SELECT * FROM guests;'
        return db.query(sql)
        .then(dbRes => dbRes)
    }
}

module.exports = Guest;