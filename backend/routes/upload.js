const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename: (req, file, cb) => {
    const safeName = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
    cb(null, safeName);
  }
});

const upload = multer({ storage });
const router = express.Router();

router.post('/', upload.fields([{ name: 'codeFileA' }, { name: 'codeFileB' }]), async (req, res, next) => {
  try {
    const files = req.files || {};
    const output = [];
    const fileFields = ['codeFileA', 'codeFileB'];

    for (const field of fileFields) {
      if (files[field]?.[0]) {
        const file = files[field][0];
        const contents = fs.readFileSync(file.path, 'utf-8');
        output.push({ filename: file.originalname, storedName: file.filename, path: file.path, contents });
      }
    }

    if (!output.length) {
      return res.status(400).json({ error: 'Please upload at least one code file' });
    }

    res.json({ uploaded: output });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
