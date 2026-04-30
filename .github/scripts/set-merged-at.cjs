const fs = require('fs');

const file = 'src/prototypes.tsx';
const prNumber = parseInt(process.env.PR_NUMBER);
const mergeDate = process.env.MERGE_DATE.slice(0, 10);
const branchName = process.env.BRANCH_NAME || '';

let src = fs.readFileSync(file, 'utf8');

// Strategy 1: match by prNumber (existing behavior)
const prPattern = new RegExp(
  '\\{[^}]*?prNumber:\\s*' + prNumber + '\\b[^}]*?\\}',
  's'
);
let match = src.match(prPattern);
let matchedBy = match ? 'prNumber' : null;

// Strategy 2: fall back to matching by branch name
if (!match && branchName) {
  const branchPattern = new RegExp(
    "\\{[^}]*?branch:\\s*'" + branchName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "'[^}]*?\\}",
    's'
  );
  match = src.match(branchPattern);
  matchedBy = match ? 'branch' : null;
}

if (!match) {
  console.log('No prototype entry for PR #' + prNumber + ' (branch: ' + branchName + ')');
  process.exit(0);
}

if (match[0].includes('mergedAt')) {
  console.log('Prototype already has mergedAt');
  process.exit(0);
}

let updated = match[0].replace(
  /(createdAt:\s*'[^']*',)/,
  `$1\n    mergedAt: '${mergeDate}',`
);

// When matched by branch, also insert prNumber if missing
if (matchedBy === 'branch' && !updated.includes('prNumber')) {
  updated = updated.replace(
    /(mergedAt:\s*'[^']*',)/,
    `$1\n    prNumber: ${prNumber},`
  );
}

src = src.replace(match[0], updated);

fs.writeFileSync(file, src);
console.log(`Updated prototype (matched by ${matchedBy}) — PR #${prNumber}, mergedAt: ${mergeDate}`);
