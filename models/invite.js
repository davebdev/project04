const db = require("../database/db");

const Invite  = {
    getInviteInfo: (invite_id) => {
        const sql = `SELECT * FROM invites WHERE id=$1;`;
        return db.query(sql, [invite_id])
        .then(dbRes => dbRes)
    },
    createNewInvite: () => {
        const sql = `INSERT INTO
        invites DEFAULT VALUES RETURNING id;`;
        return db.query(sql)
        .then(dbRes => dbRes)
    },
    updateComments: (data) => {
        const sql = `UPDATE invites
        SET comments = $1
        WHERE id=$2;`;
        return db.query(sql, [data.comments, data.invite_id])
        .then(dbRes => dbRes)
    },
    updateInviteLogin: (email, invite_id) => {
        const sql = `UPDATE invites
        SET logged_in_timestamp=CURRENT_TIMESTAMP, logged_in_guest=$1
        WHERE id=$2;`;
        return db.query(sql, [email, invite_id])
        .then(dbRes => dbRes)
    },
    deleteInvite: (invite_id) => {
        const sql = `DELETE FROM invites
        WHERE id=$1;`;
        return db.query(sql, [invite_id])
        .then(dbRes => dbRes)
    }
}

module.exports = Invite;