const fs = require('fs');

const file = 'src/prototypes.tsx';
const prNumber = parseInt(process.env.PR_NUMBER);
const mergeDate = process.env.MERGE_DATE.slice(0, 10);

let src = fs.readFileSync(file, 'utf8');

const blockPattern = new RegExp(
  '\\{[^}]*?prNumber:\\s*' + prNumber + '\\b[^}]*?\\}',
  's'
);
const match = src.match(blockPattern);

if (!match) {
  console.log('No prototype entry with prNumber ' + prNumber);
  process.exit(0);
}

if (match[0].includes('mergedAt')) {
  console.log('Prototype already has mergedAt');
  process.exit(0);
}

const updated = match[0].replace(
  /(createdAt:\s*'[^']*',)/,
  `$1\n    mergedAt: '${mergeDate}',`
);
src = src.replace(match[0], updated);

fs.writeFileSync(file, src);
console.log(`Updated prototype #${prNumber} — mergedAt: ${mergeDate}`);
