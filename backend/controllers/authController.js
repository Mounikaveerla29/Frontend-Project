const db = require('../database/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users(name,email,password,role)
     VALUES(?,?,?,?)`,
    [name, email, hashedPassword, role],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      res.json({ message: 'User Registered' });
    }
  );
  };

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email=?`, [email], async (err, user) => {
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Wrong Password' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      'secretkey'
    );

    res.json({ token, role: user.role });
  });
};