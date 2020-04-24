const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM members`, function(err, results) {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows);
    });
  },

  create(data, callback) {
    const query = `
    INSERT INTO members (
      name,
      avatar_url,
      gender,
      email, 
      birth,
      blood, 
      weight, 
      height
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id
  `;
    const values = [
      data.name,
      data.avatar_url,
      data.gender,
      data.email,
      date(data.birth).iso,
      data.blood,
      data.weight,
      data.height
    ];

    db.query(query, values, function(err, results) {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows[0]);
    });
  },

  find(id, callback) {
    db.query(
      `
        SELECT * 
        FROM members 
        WHERE id = $1`,
      [id],
      function(err, results) {
        if (err) throw `Database Error! ${err}`;

        callback(results.rows[0]);
      }
    );
  },

  update(data, callback) {
    const query = `
        UPDATE members SET
            avatar_url = ($1),
            name = ($2),
           gender = ($3),
            email = ($4),
            blood = ($5),
            weight = ($6),
            height = ($7)
        WHERE id = ($8)
      `;

    const values = [
      data.avatar_url,
      data.name,
      data.gender,
      data.email,
      data.blood,
      data.weight,
      data.height,
      data.id
    ];

    db.query(query, values, function(err, results) {
      if (err) throw `Database Error! ${err}`;

      callback();
    });
  },

  delete(id, callback) {
    db.query(`DELETE FROM members WHERE id = $1`, [id], function(err, results) {
      if (err) throw `Database Error! ${err}`;

      return callback();
    });
  }
};
