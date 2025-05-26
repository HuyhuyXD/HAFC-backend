const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
const contactRoutes = require('./routes/Contact');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', contactRoutes);

// ==================== Multer config cho schedule ====================
const storageSchedule = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/schedule'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const uploadSchedule = multer({ storage: storageSchedule });

app.post('/upload-schedule', uploadSchedule.single('image'), (req, res) => {
  res.json({ filename: req.file.filename, path: '/uploads/schedule/' + req.file.filename });
});

app.get('/schedules', (req, res) => {
  const dir = './uploads/schedule';
  fs.readdir(dir, (err, files) => {
    if (err) return res.status(500).json({ error: err });
    const fileUrls = files.map(f => ({ filename: f, url: `/uploads/schedule/${f}` }));
    res.json(fileUrls);
  });
});

// ✅ API xoá ảnh lịch tàu
app.delete('/delete-schedule/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads/schedule', req.params.filename);
  fs.unlink(filePath, err => {
    if (err) return res.status(500).json({ message: 'Xoá ảnh thất bại' });
    res.json({ message: 'Đã xoá ảnh thành công' });
  });
});

// ==================== Multer config cho recruitment ====================
const storageRecruitment = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/recruitment'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const uploadRecruitment = multer({ storage: storageRecruitment });

app.post('/upload-recruitment', uploadRecruitment.single('image'), (req, res) => {
  res.json({ filename: req.file.filename, path: '/uploads/recruitment/' + req.file.filename });
});

app.get('/recruitments', (req, res) => {
  const dir = './uploads/recruitment';
  fs.readdir(dir, (err, files) => {
    if (err) return res.status(500).json({ error: err });
    const fileUrls = files.map(f => ({ filename: f, url: `/uploads/recruitment/${f}` }));
    res.json(fileUrls);
  });
});

// ✅ API xoá ảnh tuyển dụng
app.delete('/delete-recruitment/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads/recruitment', req.params.filename);
  fs.unlink(filePath, err => {
    if (err) return res.status(500).json({ message: 'Xoá ảnh thất bại' });
    res.json({ message: 'Đã xoá ảnh thành công' });
  });
});

app.listen(PORT, () => console.log('Server running on port', PORT));

