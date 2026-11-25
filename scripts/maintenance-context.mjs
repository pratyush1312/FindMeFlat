import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
// Deliberately bounded context: no public-data dumps, secrets, source bundles or lockfile contents.
console.log(readFileSync('AGENTS.md','utf8'));
console.log('Current changed paths:');console.log(execFileSync('git',['status','--short'],{encoding:'utf8'}).slice(0,6000));
