import express from 'express';

const router = express.Router();

router.post('/webhook', express.json(), express.urlencoded({ extended: true }), (req, res) => {
    console.log('Request received:');
    console.log('Body:', JSON.stringify(req.body));
    console.log('Query:', JSON.stringify(req.query));
    console.log('Headers:', JSON.stringify(req.headers));
    
    // Try to get data from different sources
    let data = req.body?.data || req.query?.data || req.body;

    // If data is an object (the whole body), try to extract the data field
    if (typeof data === 'object' && data !== null && data.data) {
        data = data.data;
    }

    console.log('Extracted data:', data, 'Type:', typeof data);

    if (!data || typeof data !== 'string') {
        console.error('Invalid data received:', { body: req.body, query: req.query, extracted: data });
        return res.status(400).json({ error: 'Invalid data format. Expected a string.' });
    }

    const sortedArray = data.split('').sort();
    console.log('Sorted array:', sortedArray);

    res.json({ word: sortedArray});
});

export default router;