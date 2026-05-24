const mongoose = require('mongoose');

const scanReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, default: 'Code Comparison Report' },
  languageA: { type: String, default: 'unknown' },
  languageB: { type: String, default: 'unknown' },
  filenameA: { type: String },
  filenameB: { type: String },
  similarity: { type: Number, required: true },
  confidence: { type: String },
  suspiciousness: { type: String },
  matchedLinesA: [Number],
  matchedLinesB: [Number],
  linesA: [String],
  linesB: [String],
  tokenCountA: Number,
  tokenCountB: Number,
  metricBreakdown: Object,
  matchingSegments: Array,
  reportAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ScanReport', scanReportSchema);
