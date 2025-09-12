# nodejs-cli-games

Node.js command‑line mini games and text transformers.

Included scripts:
- `caesarCipher.js`: Caesar cipher encoder/decoder by letter shift.
- `pigLatin.js`: Convert words/sentences into Pig Latin.
- `rockPaperScissors.js`: Play Rock‑Paper‑Scissors against the computer.

Requirements:
- Node.js installed (any recent LTS version works).

Getting help:
- Every script supports `--help` or `-h` to print usage.

Usage

1) Caesar Cipher
- Command: `node caesarCipher.js "Your phrase" <shift>`
- Example: `node caesarCipher.js "Hello, World!" 3` → `Khoor, Zruog!`
- Example (decode): `node caesarCipher.js "Khoor, Zruog!" -3` → `Hello, World!`

2) Pig Latin
- Command: `node pigLatin.js "Your phrase here"`
- Example: `node pigLatin.js "Hello there friend"` → `ellohay erethay iendfray`

3) Rock Paper Scissors
- Command: `node rockPaperScissors.js <rock|paper|scissors>`
- Aliases: `r`, `p`, `s`
- Example: `node rockPaperScissors.js rock`

Notes
- If required arguments are missing or invalid, scripts print a helpful message and exit with a non‑zero code.
