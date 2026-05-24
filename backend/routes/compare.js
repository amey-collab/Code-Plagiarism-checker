const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const ScanReport = require('../models/ScanReport');
const { compareCode } = require('../../similarity-engine/compare');
const { buildReport } = require('../../reports/generator');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename: (req, file, cb) => {
    const safeName = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
    cb(null, safeName);
  }
});
const upload = multer({ storage });
const router = express.Router();

const parseUpload = (file) => {
  if (!file) return null;
  const contents = fs.readFileSync(file.path, 'utf-8');
  return { contents, filename: file.originalname };
};

router.post('/', upload.fields([{ name: 'codeFileA' }, { name: 'codeFileB' }]), async (req, res, next) => {
  try {
    const files = req.files || {};
    const fileA = parseUpload(files.codeFileA?.[0]);
    const fileB = parseUpload(files.codeFileB?.[0]);
    const codeA = fileA?.contents || req.body.codeA || '';
    const codeB = fileB?.contents || req.body.codeB || '';
    const languageA = req.body.languageA || fileA?.filename || 'javascript';
    const languageB = req.body.languageB || fileB?.filename || 'javascript';

    if (!codeA || !codeB) {
      return res.status(400).json({ error: 'Both code snippets are required for comparison.' });
    }

    const result = compareCode(codeA, codeB, languageA, languageB);
    const report = buildReport({
      title: 'Code Similarity Scan',
      filenameA: fileA?.filename || 'Text input A',
      filenameB: fileB?.filename || 'Text input B',
      languageA,
      languageB,
      similarity: result.similarity,
      confidence: result.confidence,
      suspiciousness: result.suspiciousness,
      tokenCountA: result.tokenCountA,
      tokenCountB: result.tokenCountB,
      metricBreakdown: result.metricBreakdown,
      matchingSegments: result.matchingSegments,
      matchedLinesA: result.matchedLinesA,
      matchedLinesB: result.matchedLinesB,
      linesA: result.linesA,
      linesB: result.linesB
    });

    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || 'SecretKey');
        const scan = new ScanReport({
          user: payload.id,
          title: report.title,
          filenameA: report.filenameA,
          filenameB: report.filenameB,
          languageA: report.languageA,
          languageB: report.languageB,
          similarity: report.similarity,
          confidence: report.confidence,
          suspiciousness: report.suspiciousness,
          matchedLinesA: report.matchedLinesA,
          matchedLinesB: report.matchedLinesB,
          tokenCountA: report.tokenCountA,
          tokenCountB: report.tokenCountB,
          metricBreakdown: report.metricBreakdown,
          matchingSegments: report.matchingSegments,
          linesA: report.linesA,
          linesB: report.linesB
        });
        await scan.save();
        return res.json({ report, scanId: scan._id });
      } catch (authErr) {
        return res.json({ report });
      }
    }

    return res.json({ report });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
