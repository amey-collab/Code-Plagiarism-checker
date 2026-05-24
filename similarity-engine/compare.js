const { tokenize } = require('../algorithms/tokenizer');

const createNgrams = (tokens, size = 4) => {
  const grams = [];
  for (let i = 0; i <= tokens.length - size; i += 1) {
    grams.push(tokens.slice(i, i + size).map(t => t.text).join(' '));
  }
  return grams;
};

const cosineSimilarity = (vectorA, vectorB) => {
  const intersection = Object.keys(vectorA).filter(key => vectorB[key]);
  const dotProduct = intersection.reduce((sum, key) => sum + vectorA[key] * vectorB[key], 0);
  const magnitude = (vector) => Math.sqrt(Object.values(vector).reduce((sum, value) => sum + value * value, 0));
  const denominator = magnitude(vectorA) * magnitude(vectorB);
  return denominator === 0 ? 0 : dotProduct / denominator;
};

const buildFrequencyVector = (tokens) => {
  return tokens.reduce((freq, token) => {
    freq[token.text] = (freq[token.text] || 0) + 1;
    return freq;
  }, {});
};

const longestCommonSubsequence = (a, b) => {
  const n = a.length;
  const m = b.length;
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      if (a[i].text === b[j].text) {
        dp[i][j] = 1 + dp[i + 1][j + 1];
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  const sequence = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i].text === b[j].text) {
      sequence.push({ a: a[i], b: b[j] });
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      i += 1;
    } else {
      j += 1;
    }
  }

  return sequence;
};

const findMatchingLines = (matches) => {
  const linesA = new Set();
  const linesB = new Set();
  matches.forEach(match => {
    linesA.add(match.a.line);
    linesB.add(match.b.line);
  });
  return {
    linesA: Array.from(linesA).sort((a, b) => a - b),
    linesB: Array.from(linesB).sort((a, b) => a - b)
  };
};

const groupMatchedSegments = (matches) => {
  if (!matches.length) return [];
  const segments = [];
  let current = [matches[0]];

  for (let i = 1; i < matches.length; i += 1) {
    const previous = matches[i - 1];
    const next = matches[i];
    if (next.a.line <= previous.a.line + 1 && next.b.line <= previous.b.line + 1) {
      current.push(next);
    } else {
      segments.push(current);
      current = [next];
    }
  }
  segments.push(current);

  return segments.map(segment => ({
    linesA: Array.from(new Set(segment.map(item => item.a.line))).sort((a, b) => a - b),
    linesB: Array.from(new Set(segment.map(item => item.b.line))).sort((a, b) => a - b),
    tokens: segment.map(item => item.a.text).join(' '),
    length: segment.length
  }));
};

const compareCode = (codeA, codeB, languageA, languageB) => {
  const left = tokenize(codeA, languageA);
  const right = tokenize(codeB, languageB);
  const vectorA = buildFrequencyVector(left.tokens);
  const vectorB = buildFrequencyVector(right.tokens);
  const cosine = cosineSimilarity(vectorA, vectorB);

  const ngramsA = createNgrams(left.tokens, 4);
  const ngramsB = createNgrams(right.tokens, 4);
  const matchedNgrams = ngramsA.filter(gram => ngramsB.includes(gram));
  const ngramScore = ngramsA.length === 0 ? 0 : matchedNgrams.length / Math.max(ngramsA.length, ngramsB.length);

  const lcsMatches = longestCommonSubsequence(left.tokens, right.tokens);
  const lcsScore = Math.min(left.tokens.length, right.tokens.length) === 0
    ? 0
    : lcsMatches.length / Math.min(left.tokens.length, right.tokens.length);

  const rawScore = (0.4 * ngramScore + 0.3 * lcsScore + 0.3 * cosine) || 0;
  const similarity = Math.round(rawScore * 100);

  const confidence = similarity > 85 ? 'Very High' : similarity > 65 ? 'High' : similarity > 45 ? 'Medium' : 'Low';
  const suspiciousness = similarity > 85 ? 'Highly Suspicious' : similarity > 65 ? 'Suspicious' : similarity > 45 ? 'Possible Copy' : 'Low Risk';

  const lineMatches = findMatchingLines(lcsMatches);
  const matchingSegments = groupMatchedSegments(lcsMatches);

  return {
    similarity,
    confidence,
    suspiciousness,
    tokenCountA: left.tokens.length,
    tokenCountB: right.tokens.length,
    metricBreakdown: {
      cosine: Number(cosine.toFixed(3)),
      lcs: Number(lcsScore.toFixed(3)),
      ngram: Number(ngramScore.toFixed(3))
    },
    matchingSegments,
    matchedLinesA: lineMatches.linesA,
    matchedLinesB: lineMatches.linesB,
    linesA: left.lines,
    linesB: right.lines,
    tokens: {
      a: left.tokens,
      b: right.tokens
    }
  };
};

module.exports = { compareCode };
