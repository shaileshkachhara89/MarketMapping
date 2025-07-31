// backend/routes/student.route.js
import { Router } from 'express';
const router = Router();  
import Counter from '../models/Counter.js'; // Assuming you have a Counter model defined  
//const Counter = require('../models/Counter');

// CREATE
router.post('/', async (req, res, next) => {
    try {
        const data = await Counter.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
});

// READ All
router.get('/', async (req, res, next) => {
    try {
        const data = await Counter.find();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

// READ One
router.get('/:id', async (req, res, next) => {
    try {
        const data = await Counter.findById(req.params.id);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

// UPDATE
router.put('/:id', async (req, res, next) => {
    try {
        const data = await Counter.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(data);
    } catch (error) {
        next(error);
    }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
    try {
        const data = await Counter.findByIdAndDelete(req.params.id);
        res.json({ message: "Counter deleted", data });
    } catch (error) {
        next(error);
    }
});

module.exports = router;