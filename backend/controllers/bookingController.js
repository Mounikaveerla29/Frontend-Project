const db = require('../database/db');

exports.bookTicket = (req, res) => {
  const { event_id, seat_number } = req.body;

  db.get(
    `SELECT * FROM ticket_bookings
     WHERE event_id=? AND seat_number=?`,
    [event_id, seat_number],
    (err, booking) => {
      if (booking) {
        return res.status(400).json({
          message: 'Seat already reserved'
        });
      }

      db.run(
        `INSERT INTO ticket_bookings
         (user_id,event_id,seat_number,booking_status,payment_status)
         VALUES(?,?,?,?,?)`,
        [
          req.user.id,
          event_id,
          seat_number,
          'Reserved',
          'Paid'
        ],
        function (err) {
          if (err) {
            return res.status(400).json({ error: err.message });
          }

          db.run(
            `UPDATE events
             SET available_seats = available_seats - 1
             WHERE id=?`,
            [event_id]
          );

          res.json({ message: 'Ticket Booked Successfully' });
        }
      );
    }
  );
};

exports.updateBookingStatus = (req, res) => {
  const { status } = req.body;

  db.run(
    `UPDATE ticket_bookings
     SET booking_status=?
     WHERE id=?`,
    [status, req.params.id],
    function (err) {
         if (err) {
         return res.status(400).json({ error: err.message });
      }

      res.json({ message: 'Status Updated' });
    }
  );
};