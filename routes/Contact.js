const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"Website HAFC" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO,
      subject: 'Liên hệ từ website',
      html: `<p><strong>Tên:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Nội dung:</strong> ${message}</p>`
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
