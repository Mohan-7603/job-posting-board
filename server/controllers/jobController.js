const Job = require('../models/Job');
const { sendJobAlert } = require('../utils/sendEmail');

const createJob = async (req, res) => {
  const { title, description, experienceLevel, endDate, candidates } = req.body;
  console.log("Received data:", req.body); 

  const companyId = req.userId; 

  try {
    const job = new Job({
      title,
      description,
      experienceLevel,
      endDate,
      candidates: [{ email: candidates[0].email }], 
      company: companyId
    });

    await job.save();

    res.status(201).json({ message: 'Job posted successfully!', job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendJobUpdates = async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await Job.findById(jobId).populate('company');
    if (!job) return res.status(404).json({ message: 'Job not found.' });

    const candidateEmails = job.candidates.map(candidate => candidate.email);

    await sendJobAlert(candidateEmails, job);

    res.status(200).json({ message: 'Job alerts sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createJob, sendJobUpdates };
