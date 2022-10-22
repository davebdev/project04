const db = require("../database/db");

const Guest  = {
    getAllGuestInfo: () => {
        const sql = 'SELECT g.id, g.invite_id, g.fname, g.lname, g.email, g.rsvp, g.dietary_reqs, g.age_bracket, i.primary_email, i.invite_status, i.logged_in_timestamp, i.logged_in_guest, i.comments FROM guests g LEFT JOIN invites i ON g.invite_id=i.id;'
        return db.query(sql)
        .then(dbRes => dbRes)
    }
}

module.exports = Guest;