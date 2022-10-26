const db = require("../database/db");

const Guest  = {
    getGuestByEmail: (email) => {
        const sql = `SELECT g.id, g.invite_id, g.fname, g.lname, g.email,
        g.rsvp, g.dietary_reqs, g.age_bracket,
        i.primary_email, i.invite_status,
        i.logged_in_timestamp, i.logged_in_guest, i.comments
        FROM guests g
        LEFT JOIN invites i
        ON g.invite_id=i.id
        WHERE g.email=$1;`
        return db.query(sql, [email])
        .then(dbRes => dbRes)
        .catch(err => console.log(err))
    },
    getAllGuestInfo: () => {
        const sql = `SELECT g.id, g.invite_id, g.fname, g.lname, g.email,
        g.rsvp, g.dietary_reqs, g.age_bracket,
        i.primary_email, i.invite_status,
        i.logged_in_timestamp, i.logged_in_guest, i.comments
        FROM guests g
        LEFT JOIN invites i
        ON g.invite_id=i.id;`
        return db.query(sql)
        .then(dbRes => dbRes)
        .catch(err => console.log(err))
    },
    getGuestsByInviteId: (invite_id) => {
        const sql = `SELECT id, invite_id, fname, lname,
        email, rsvp, dietary_reqs, age_bracket
        FROM guests
        WHERE invite_id = $1;`
        return db.query(sql, [invite_id])
        .then(dbRes => dbRes)
        .catch(err => console.log(err))
    },
    getGuestsAndInviteById: (invite_id) => {
        const sql = `select g.id, g.invite_id, g.fname, g.lname, g.email, g.rsvp, g.dietary_reqs, g.age_bracket,
        i.primary_email, i.invite_status, i.logged_in_timestamp, i.logged_in_guest, i.comments
        FROM guests g
        LEFT JOIN invites i
        ON g.invite_id=i.id
        WHERE g.invite_id=$1;`
        return db.query(sql, [invite_id])
        .then(dbRes => dbRes)
        .catch(err => console.log(err))
    },
    createNewGuestRow: (invite_id) => {
        const sql = `INSERT INTO
        guests(invite_id, fname, lname, email, rsvp, dietary_reqs, age_bracket)
        VALUES($1, NULL, NULL, NULL, NULL, NULL, 'A') RETURNING id;`;
        return db.query(sql, [invite_id])
        .then(dbRes => dbRes)
        .catch(err => console.log(err))
    },
    updateGuestRow: (row) => {
        const sql = `UPDATE guests
        SET fname = $1, lname = $2, email = $3, rsvp = $4, dietary_reqs = $5, age_bracket = $6
        WHERE id = $7`
        return db.query(sql, [row.fname, row.lname, row.email, row.rsvp, row.dietary_reqs, row.age_bracket, row.id])
        .then(dbRes => dbRes)
        .catch(err => console.log(err));
    },
    deleteGuestRow: (rowId) => {
        const sql = `DELETE FROM guests
        WHERE id=$1;`;
        return db.query(sql, [rowId])
        .then(dbRes => dbRes)
        .catch(err => console.log(err));
    }
}

module.exports = Guest;