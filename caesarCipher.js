const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const args = process.argv.slice(2);

// Formatting helpers and shared usage text
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';
function printUsage() {
  console.log(`Usage: node caesarCipher.js "your phrase" <shift>`);
  console.log(`${BOLD}Note:${RESET} wrap the phrase in double quotes if it contains spaces.`);
}

if (args[0] === '--help' || args[0] === '-h') {
  printUsage();
  process.exit(0);
}

if (args.length < 2) {
  console.error('❌ Not enough arguments.');
  printUsage();
  process.exit(1);
}

const phrase = args[0];
const shift = parseInt(args[1]);

if (Number.isNaN(shift)) {
  console.error('❌ Invalid shift. Use an integer like 3 or -5.');
  process.exit(1);
}

function caesar(str, shift) {
  return [...str].map((ch) => shiftLetter(ch, shift)).join('');
}

function shiftLetter(ch, shift) {
  const lower = ch.toLowerCase();
  const idx = alphabet.indexOf(lower);

  if (idx === -1) return ch;

  const newIdx = (idx + shift + 26) % 26;
  const newChar = alphabet[newIdx];

  return ch === lower ? newChar : newChar.toUpperCase();
}

console.log(caesar(phrase, shift));
