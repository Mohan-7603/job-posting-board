    const express = require('express');
    const { createJob, sendJobUpdates } = require('../controllers/jobController');
    const authMiddleware = require('../middleware/authMiddleware');
    const Job = require('../models/Job'); 

    const router = express.Router();

    router.post('/job/post', authMiddleware, createJob);
    router.post('/send-updates/:jobId', authMiddleware, sendJobUpdates);

    router.get('/job/list', authMiddleware, async (req, res) => {
        try {
        const jobs = await Job.find().populate('company'); 
        return res.status(200).json({ jobs });
        } catch (error) {
        console.error('Error fetching jobs:', error);
        return res.status(500).json({ message: 'Server error' });
        }
    });
    

    module.exports = router;
