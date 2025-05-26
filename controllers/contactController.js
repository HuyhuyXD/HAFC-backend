const nodemailer = require('nodemailer');
require('dotenv').config(); // ⬅️ Đặt ở đầu để load biến môi trường

exports.sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS   
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.GMAIL_USER,      
    subject: 'Liên hệ từ website',
    text: `Tên: ${name}\nEmail: ${email}\nNội dung: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Gửi thành công!' });
  } catch (error) {
    console.error('🔥 LỖI GỬI MAIL:', error);
    res.status(500).json({ success: false, message: 'Lỗi gửi liên hệ!' });
  }
};
