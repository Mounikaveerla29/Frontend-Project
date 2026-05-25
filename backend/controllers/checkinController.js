const db = require('../database/db');

exports.checkInAttendee = (req, res) => {
  const { booking_id } = req.body;

  db.run(
    `UPDATE ticket_bookings
     SET booking_status='Checked-In'
     WHERE id=?`,
    [booking_id],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      res.json({ message: 'Attendee Checked-In' });
    }
  );
};