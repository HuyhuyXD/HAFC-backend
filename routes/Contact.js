const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../controllers/contactController');

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  console.log("📩 Contact received:", name, email, message);
  return res.json({ success: true });
});


module.exports = router;
