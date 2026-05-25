const db = require('../database/db');

exports.createEvent = (req, res) => {
  const {
    title,
    category,
    venue,
    event_date,
    total_seats,
    price
  } = req.body;

  db.run(
    `INSERT INTO events
    (title,category,venue,event_date,total_seats,available_seats,price,organizer_id)
    VALUES(?,?,?,?,?,?,?,?)`,
    [
      title,
      category,
      venue,
      event_date,
      total_seats,
      total_seats,
      price,
      req.user.id
    ],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      res.json({ message: 'Event Created' });
    }
  );
};

exports.getEvents = (req, res) => {
  db.all(`SELECT * FROM events`, [], (err, rows) => {
    res.json(rows);
  });
};