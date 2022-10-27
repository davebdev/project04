const db = require("../database/db");

const Invite  = {
    getInviteInfo: (invite_id) => {
        const sql = 'SELECT * FROM invites WHERE id=$1;';
        return db.query(sql, [invite_id])
        .then(dbRes => dbRes)
    },
    updateComments: (data) => {
        const sql = `UPDATE invites
        SET comments = $1
        WHERE id=$2;`;
        return db.query(sql, [data.comments, data.invite_id])
        .then(dbRes => dbRes)
    }
}

module.exports = Invite;