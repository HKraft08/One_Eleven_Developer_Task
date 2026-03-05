import express from 'express';

const router = express.Router();

router.post('/webhook', express.json(), express.urlencoded({ extended: true }), (req, res) => {
    // Try to get data from different sources
    let data = req.body?.data || req.query?.data || req.body;

    // If data is an object (the whole body), try to extract the data field
    if (typeof data === 'object' && data !== null) {
        data = data.data;
    }

    if (!data || typeof data !== 'string') {
        console.error('Invalid data received:', { body: req.body, query: req.query });
        return res.status(400).json({ error: 'Invalid data format. Expected a string.' });
    }

    const sortedArray = data.split('').sort();

    res.json({ word: sortedArray});
});

export default router;