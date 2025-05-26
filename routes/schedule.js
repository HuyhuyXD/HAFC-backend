const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.delete("/delete/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../uploads/schedule", filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Xóa ảnh lỗi:", err);
      return res.status(500).json({ message: "Xoá thất bại" });
    }
    res.json({ message: "Xoá thành công" });
  });
});

module.exports = router;
