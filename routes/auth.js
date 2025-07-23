import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../models/db.js'; // Assuming you have a db.js file that exports a configured pool

const router = express.Router();

// Sign-in route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
     res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Sign-in successful', user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/user_add', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert into PostgreSQL
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );

    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
});


export default router;
