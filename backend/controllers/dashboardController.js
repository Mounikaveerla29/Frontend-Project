const db = require('../database/db');

exports.getAnalytics = (req, res) => {
  db.all(
    `SELECT
      events.title,
      events.total_seats,
      events.available_seats,
      COUNT(ticket_bookings.id) AS sold_tickets
    FROM events
    LEFT JOIN ticket_bookings
    ON events.id = ticket_bookings.event_id
    GROUP BY events.id`,
    [],
    (err, rows) => {
        res.json(rows);
    }
  );
};