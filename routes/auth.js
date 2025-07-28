import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../models/db.js'; // Assuming you have a db.js file that exports a configured pool

const router = express.Router();

// Sign-in route
router.post('/signin', async (req, res) => {
  console.log('Sign-in request received');
  console.log('Request body:', req.body); 
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    /*
    const result1 = await pool.query('SELECT * FROM users WHERE password = $1', [password]);

    if (result1.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid password' });
    }*/

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
     res.status(401).json({ message: 'Invalid password' });
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
    // Check if email already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'User registration failed' });
  }
});



export default router;
