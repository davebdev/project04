const db = require("../database/db");

const Admin  = {
    checkSessionMatches: (sid) => {
        const sql = 'SELECT * FROM session WHERE sid=$1;'
        return db.query(sql, [sid])
        .then(dbRes => dbRes)
    },
    getAllAdminData: (email) => {
        const sql = 'SELECT * FROM admins WHERE email = $1;';
        return db.query(sql, [email])
        .then(dbRes => dbRes)
    },
    getAdminData: (email) => {
        const sql = 'SELECT id, fname, lname, email FROM admins WHERE email = $1;';
        return db.query(sql, [email])
        .then(dbRes => dbRes)
    }
}

module.exports = Admin;