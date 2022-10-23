const db = require("../database/db");

const Invite  = {
    getInviteInfo: (invite_id) => {
        const sql = 'SELECT * FROM invites WHERE id=$1;';
        return db.query(sql, [invite_id])
        .then(dbRes => dbRes)
    }
}

module.exports = Invite;