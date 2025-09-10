#!/usr/bin/env node

const path = require('path');

const valid = ['rock', 'paper', 'scissors'];
const beats = { rock: 'scissors', paper: 'rock', scissors: 'paper' };

// Centralized text dictionary
const SCRIPT = process.argv[1] ? path.basename(process.argv[1]) : 'rockPaperScissors.js';
const TEXT = {
  usage: (script = SCRIPT) => `Usage: node ${script} <rock|paper|scissors>`,
  aliases: 'Aliases: r, p, s',
  errors: {
    noChoice: '❌ No choice provided.',
    invalidChoice: (val) => `❌ Invalid choice: "${val}"`,
    pleaseChoose: 'Please choose one of: rock, paper, or scissors.',
  },
  results: {
    draw: "⚖️ It's a draw!",
    win: 'You win!',
    lose: 'You lose!',
  },
  summary: (player, computer, result) =>
    `✅ You chose ${player}. Computer chose ${computer}. ${result}`,
};

// Core game logic as a pure function for testability
function play(playerChoice, rng = Math.random) {
  const normalized = normalizeChoice(playerChoice);
  if (!normalized) {
    return { error: `Invalid choice: "${playerChoice}"` };
  }
  const computer = valid[Math.floor(rng() * valid.length)];
  let outcome = 'draw';
  if (normalized !== computer) {
    outcome = beats[normalized] === computer ? 'win' : 'lose';
  }
  return { player: normalized, computer, outcome };
}

function normalizeChoice(raw) {
  if (!raw) return null;
  const s = String(raw).trim().toLowerCase();
  if (valid.includes(s)) return s;
  // Allow short aliases
  if (s === 'r') return 'rock';
  if (s === 'p') return 'paper';
  if (s === 's') return 'scissors';
  return null;
}

// CLI handling
const args = process.argv.slice(2);
const playerRaw = args[0];

if (playerRaw === '--help' || playerRaw === '-h') {
  console.log(TEXT.usage());
  console.log(TEXT.aliases);
  process.exit(0);
}

if (!playerRaw) {
  console.log(TEXT.errors.noChoice);
  console.log(TEXT.usage());
  process.exit(1);
}

const outcome = play(playerRaw);
if (outcome.error) {
  console.log(`❌ ${outcome.error}`);
  console.log(TEXT.errors.pleaseChoose);
  process.exit(1);
}

const { player, computer, outcome: resultKey } = outcome;
const resultStr = TEXT.results[resultKey];

console.log(TEXT.summary(player, computer, resultStr));

// Export for potential tests
module.exports = { play, normalizeChoice };
