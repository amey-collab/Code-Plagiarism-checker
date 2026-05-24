const languageComments = {
  javascript: { line: /\/\/.*$/gm, block: /\/\*[\s\S]*?\*\//gm },
  java: { line: /\/\/.*$/gm, block: /\/\*[\s\S]*?\*\//gm },
  c: { line: /\/\/.*$/gm, block: /\/\*[\s\S]*?\*\//gm },
  cpp: { line: /\/\/.*$/gm, block: /\/\*[\s\S]*?\*\//gm },
  python: { line: /#.*/gm, block: /('{3}|"{3})[\s\S]*?\1/gm }
};

const detectLanguage = (language) => {
  const normalized = (language || '').toLowerCase();
  if (normalized.includes('py')) return 'python';
  if (normalized.includes('java')) return 'java';
  if (normalized.includes('c++') || normalized.includes('cpp')) return 'cpp';
  if (normalized.includes('c')) return 'c';
  return 'javascript';
};

const stripComments = (code, language = 'auto') => {
  const lang = language === 'auto' ? 'javascript' : detectLanguage(language);
  const def = languageComments[lang] || languageComments.javascript;
  return code
    .replace(def.block, ' ')
    .replace(def.line, ' ')
    .replace(/\r\n/g, '\n');
};

const normalizeCode = (code) => {
  return code
    .replace(/\t/g, ' ')
    .replace(/ +/g, ' ')
    .replace(/\s*([{}();,=+\-*/%<>!&|^~?:])\s*/g, '$1')
    .replace(/\n{2,}/g, '\n')
    .trim();
};

module.exports = { stripComments, normalizeCode, detectLanguage };
