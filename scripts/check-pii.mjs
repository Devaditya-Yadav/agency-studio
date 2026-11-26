import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const IGNORED_DIRS = new Set(['.git', 'node_modules', 'dist', 'build', 'coverage', '.vite']);
const IGNORED_FILES = new Set(['package-lock.json', 'check-pii.mjs']);

const BLOCKED_PATTERNS = [
  { label: 'Google API key', regex: /AIza[0-9A-Za-z_-]{35}/ },
  {
    label: 'OpenAI/Anthropic/Stripe secret key',
    regex: /\b(sk-[A-Za-z0-9_-]{20,}|sk_live_[A-Za-z0-9]+|pk_live_[A-Za-z0-9]+)\b/,
  },
  {
    label: 'GitHub token',
    regex: /\b(ghp_[A-Za-z0-9]{30,}|gho_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{20,})\b/,
  },
  { label: 'AWS access key', regex: /\bAKIA[0-9A-Z]{16}\b/ },
  { label: 'Private key block', regex: /BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/ },
  {
    label: 'Database connection string with credentials',
    regex: /(?:mongodb(?:\+srv)?|postgres(?:ql)?|mysql|redis):\/\/[^/\s:@]+:[^/\s@]+@/i,
  },
  {
    label: 'Non-placeholder Spanish phone number',
    regex: /\+34[\s-]?6(?!00[\s-]?000[\s-]?000)\d{2}[\s-]?\d{3}[\s-]?\d{3}/,
  },
  {
    label: 'Non-example email address',
    regex: /\b[A-Za-z0-9._%+-]+@(?!example\.com\b|ejemplo\.com\b)[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
  },
  {
    label: 'Direct Instagram profile link',
    regex: /https?:\/\/(?:www\.)?instagram\.com\/[A-Za-z0-9._-]+/i,
  },
  {
    label: 'Internal AI boilerplate marker',
    regex: /(?:Antigravity artifact|ui-ux-pro-max|UI\/UX Pro Max)/i,
  },
];

function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, results);
    } else if (!IGNORED_FILES.has(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

const findings = [];

for (const filePath of walk(ROOT)) {
  const relPath = path.relative(ROOT, filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  lines.forEach((line, idx) => {
    for (const rule of BLOCKED_PATTERNS) {
      if (rule.regex.test(line)) {
        findings.push(`${relPath}:${idx + 1} — ${rule.label}`);
      }
    }
  });
}

if (findings.length > 0) {
  console.error('Security / PII hygiene check failed:');
  for (const item of findings) {
    console.error(`  - ${item}`);
  }
  process.exit(1);
}

console.log('Security / PII hygiene check passed (0 secrets, 0 real PII, 0 boilerplate).');
