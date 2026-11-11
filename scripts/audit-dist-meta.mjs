import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'dist');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = walk(root);
const titles = new Map();
const descs = new Map();
const issues = [];

for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  const title = h.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '';
  const desc = h.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? '';
  const rel = path.relative(root, f).replace(/\\/g, '/');

  if (!title) issues.push({ rel, issue: 'missing title' });
  if (!desc) issues.push({ rel, issue: 'missing description' });
  if (title.length < 30) issues.push({ rel, issue: 'title short', len: title.length, title });
  if (title.length > 60) issues.push({ rel, issue: 'title long', len: title.length, title });
  if (desc.length < 70) issues.push({ rel, issue: 'desc short', len: desc.length, desc: desc.slice(0, 80) });
  if (desc.length > 155) issues.push({ rel, issue: 'desc long', len: desc.length, desc: desc.slice(0, 80) });
  const descPx = (() => {
    let w = 0;
    for (const ch of desc) {
      if (ch === ' ') w += 4;
      else if (/[WMmw@%]/.test(ch)) w += 12;
      else if (/[A-Z]/.test(ch)) w += 8;
      else w += 7;
    }
    return w;
  })();
  if (descPx > 990) issues.push({ rel, issue: 'desc wide', px: descPx, len: desc.length, desc: desc.slice(0, 80) });

  const tkey = title.toLowerCase();
  if (!titles.has(tkey)) titles.set(tkey, []);
  titles.get(tkey).push(rel);

  const dkey = desc.toLowerCase();
  if (!descs.has(dkey)) descs.set(dkey, []);
  descs.get(dkey).push(rel);
}

const byIssue = {};
for (const i of issues) byIssue[i.issue] = (byIssue[i.issue] || 0) + 1;

const dupT = [...titles.entries()].filter(([, a]) => a.length > 1);
const dupD = [...descs.entries()].filter(([, a]) => a.length > 1);

console.log(JSON.stringify({ pages: files.length, byIssue, dupTitles: dupT.length, dupDescs: dupD.length, samples: issues.slice(0, 40), dupTitleExamples: dupT.slice(0, 8).map(([t, a]) => ({ title: t, count: a.length, pages: a.slice(0, 3) })), dupDescExamples: dupD.slice(0, 8).map(([d, a]) => ({ len: d.length, count: a.length, pages: a.slice(0, 3) })) }, null, 2));
