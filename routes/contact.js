const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Debug đầu vào
  console.log("🔥 Nhận dữ liệu contact:", { name, email, message });

  // Validate đơn giản
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,       
        pass: process.env.MAIL_PASS        
      }
    });

    await transporter.sendMail({
      from: `"Website HAFC" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_RECEIVER,
      subject: 'Liên hệ từ website',
      html: `
        <p><strong>Tên:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nội dung:</strong> ${message}</p>
      `
    });

    console.log('✅ Email sent successfully!');
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Email error:', error);
    res.status(500).json({ success: false, error: 'Email send failed' });
  }
});

module.exports = router;
