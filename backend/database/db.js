const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./event.db', (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('Connected to SQLite DB');
  }
});

// USERS TABLE

db.run(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT
)
`);

// EVENTS TABLE

db.run(`
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  category TEXT,
  venue TEXT,
  event_date TEXT,
  total_seats INTEGER,
  available_seats INTEGER,
  price REAL,
  organizer_id INTEGER
)
`);

// BOOKINGS TABLE

db.run(`
CREATE TABLE IF NOT EXISTS ticket_bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  event_id INTEGER,
  seat_number TEXT,
  booking_status TEXT,
  payment_status TEXT
)
`);

// PAYMENTS TABLE

db.run(`
CREATE TABLE IF NOT EXISTS payment_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_id INTEGER,
  amount REAL,
  payment_date TEXT
)
`);

module.exports = db;