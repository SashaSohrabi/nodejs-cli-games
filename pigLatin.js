const vowels = ['a', 'e', 'i', 'o', 'u'];

const args = process.argv.slice(2);

if (args[0] === '--help' || args[0] === '-h') {
  console.log('Usage: node pigLatin.js "Your phrase here"');
  process.exit(0);
}

if (args.length === 0) {
  console.error('❌ No input provided.');
  process.exit(1);
}

const input = args.join(' ');
console.log(toPigLatinSentence(input));

function toPigLatinSentence(sentence) {
  return sentence
    .split(/\s+/)
    .map(toPigLatinWord)
    .join(' ');
}

function toPigLatinWord(word) {
  const w = word.toLowerCase();
  const first = w[0];
  const second = w[1];

  if (vowels.includes(first)) {
    return w + 'way';
  }

  if (second && !vowels.includes(first) && !vowels.includes(second)) {
    return w.slice(2) + first + second + 'ay';
  }

  return w.slice(1) + first + 'ay';
}

module.exports = { toPigLatinSentence, toPigLatinWord };
