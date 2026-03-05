import express from 'express';

const router = express.Router();

router.post('/webhook', (req, res) => {
    const { data } = req.body;

    if (!data || typeof data !== 'string') {
        return res.status(400).json({ error: 'Invalid data format. Expected a string.' });
    }

    const sortedArray = data.split('').sort();

    res.json({ word: sortedArray });
});

export default router;