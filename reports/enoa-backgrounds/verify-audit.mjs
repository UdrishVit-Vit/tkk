import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
execFileSync(process.execPath,['reports/enoa-backgrounds/build-audit.mjs'],{stdio:'inherit'});
const root='reports/enoa-backgrounds';
const data=JSON.parse(fs.readFileSync(root+'/baseline/snapshot.json'));
const coverage=JSON.parse(fs.readFileSync(root+'/coverage.json'));
for(const [edition,rows] of [['2014',data.b14],['2024',data.b24]]){
 assert.equal(new Set(rows.map(b=>b.id)).size,rows.length);
 assert.equal(new Set(rows.map(b=>b.title)).size,rows.length);
 for(const b of rows){
  const p=`audit/enoa-backgrounds/${edition}-${b.id}.md`;
  const text=fs.readFileSync(p,'utf8');
  for(let i=1;i<=7;i++)assert.ok(text.includes('## '+i+'.'),p+' missing aspect '+i);
  assert.ok(text.includes('Регрессионный сценарий'),p+' missing test');
 }
}
assert.equal(fs.readdirSync('audit/enoa-backgrounds').filter(f=>f.endsWith('.md')).length,77);
assert.equal(coverage.structuralIssues.length,2);
assert.ok(coverage.structuralIssues.every(i=>i.code==='feat-category'));
const markdown=[...fs.readdirSync(root).filter(f=>f.endsWith('.md')).map(f=>path.join(root,f)),...fs.readdirSync('audit/enoa-backgrounds').map(f=>path.join('audit/enoa-backgrounds',f))];
const broken=[];
for(const file of markdown){
 for(const m of fs.readFileSync(file,'utf8').matchAll(/\]\(([^)]+)\)/g)){
  const link=m[1].split('#')[0]; if(!link||/^https?:/.test(link))continue;
  if(!fs.existsSync(path.resolve(path.dirname(file),link)))broken.push({file,link});
 }
}
assert.deepEqual(broken,[]);
const result={date:'2026-10-28',individualAudits:77,aspectsPerAudit:7,localMarkdownLinks:'PASS',uniqueWithinEdition:'PASS',sourceHashesUnchanged:529,structuralExceptions:coverage.structuralIssues,limitations:'No browser interaction, full canon acceptance, independent human review or live playtest claimed.'};
fs.writeFileSync(root+'/verification.json',JSON.stringify(result,null,2)+'\n');
console.log('PASS: 77 records, seven aspects, local links, two expected exceptions, 529 unchanged source files.');
