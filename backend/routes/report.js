const express = require('express');
const auth = require('../middleware/auth');
const ScanReport = require('../models/ScanReport');

const router = express.Router();

router.get('/:id', auth, async (req, res, next) => {
  try {
    const report = await ScanReport.findById(req.params.id).lean();
    if (!report || report.user.toString() !== req.user.id) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.json({ report });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
