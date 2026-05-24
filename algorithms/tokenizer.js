const { stripComments, normalizeCode } = require('../tokenizer/normalize');

const keywords = new Set([
  'int','float','double','char','boolean','bool','void','public','private','protected',
  'class','static','final','const','return','if','else','switch','case','for','while','do','break','continue',
  'import','package','new','try','catch','finally','throw','throws','def','function','var','let','const','true','false','null',
  'undefined','this','super','extends','implements','interface','struct','enum'
]);

const tokenize = (code, language = 'auto') => {
  const cleaned = normalizeCode(stripComments(code, language));
  const lines = cleaned.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
  const tokens = [];
  const identifierMap = {};
  let variableIndex = 0;

  lines.forEach((line, index) => {
    const rawTokens = line
      .replace(/([{}()\[\];,.<>+\-*/=%!&|^~:?])/g, ' $1 ')
      .split(/\s+/)
      .filter(Boolean);

    rawTokens.forEach(token => {
      const lower = token.toLowerCase();
      if (/^\d+$/.test(token) || /^\d+\.\d+$/.test(token)) {
        tokens.push({ text: 'CONST', original: token, line: index + 1 });
      } else if (keywords.has(lower)) {
        tokens.push({ text: lower, original: token, line: index + 1 });
      } else if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(token)) {
        if (!identifierMap[token]) {
          identifierMap[token] = `v${++variableIndex}`;
        }
        tokens.push({ text: identifierMap[token], original: token, line: index + 1 });
      } else {
        tokens.push({ text: token, original: token, line: index + 1 });
      }
    });
  });

  return { tokens, raw: cleaned, lines };
};

module.exports = { tokenize };
