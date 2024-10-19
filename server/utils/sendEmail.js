const nodemailer = require('nodemailer');

const sendJobAlert = async (emails, job) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emails.join(','),
    subject: `Job Opportunity: ${job.title}`,
    text: `
      Dear Candidate,
      
      We are excited to inform you about a job opportunity at ${job.company.companyName}.
      
      Job Title: ${job.title}
      Description: ${job.description}
      Experience Level: ${job.experienceLevel}
      End Date: ${new Date(job.endDate).toLocaleDateString()}
      
      Best Regards,
      ${job.company.companyName}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Job alert emails sent!');
  } catch (error) {
    console.error('Error sending job alerts:', error);
  }
};

module.exports = { sendJobAlert };
