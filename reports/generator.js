const buildReport = ({ title, filenameA, filenameB, languageA, languageB, similarity, confidence, suspiciousness, tokenCountA, tokenCountB, metricBreakdown, matchingSegments, matchedLinesA, matchedLinesB }) => {
  return {
    title,
    filenameA,
    filenameB,
    languageA,
    languageB,
    similarity,
    confidence,
    suspiciousness,
    tokenCountA,
    tokenCountB,
    metricBreakdown,
    matchedLinesA,
    matchedLinesB,
    matchingSegments,
    generatedAt: new Date().toISOString(),
    summary: {
      description: `Comparison report generated with ${similarity}% similarity. ${suspiciousness} confidence based on structure and token analysis.`,
      languageAnalysis: `Code from ${languageA} compared to ${languageB}`,
      fileStats: {
        fileA: { name: filenameA || 'File A', tokens: tokenCountA },
        fileB: { name: filenameB || 'File B', tokens: tokenCountB }
      }
    }
  };
};

module.exports = { buildReport };
