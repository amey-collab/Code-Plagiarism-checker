const express = require('express');
const auth = require('../middleware/auth');
const ScanReport = require('../models/ScanReport');

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const scans = await ScanReport.find({ user: req.user.id })
      .sort({ reportAt: -1 })
      .lean();

    res.json({ history: scans.map(scan => ({
      id: scan._id,
      title: scan.title,
      similarity: scan.similarity,
      suspiciousness: scan.suspiciousness,
      languageA: scan.languageA,
      languageB: scan.languageB,
      createdAt: scan.reportAt,
      filenameA: scan.filenameA,
      filenameB: scan.filenameB
    })) });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
