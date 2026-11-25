import {mkdir,readFile,writeFile,rename,lstat,unlink} from 'node:fs/promises';
import {join} from 'node:path';
import {homedir} from 'node:os';
import {randomUUID} from 'node:crypto';
export class Store{
 constructor(root=join(homedir(),'.config','plotline-research')){this.root=root}
 async init(){await mkdir(this.root,{recursive:true,mode:0o700});if((await lstat(this.root)).isSymbolicLink())throw new Error('The helper data directory must not be a symbolic link.');await mkdir(join(this.root,'cache'),{recursive:true,mode:0o700})}
 path(name){if(!/^(?:cache\/)?[a-zA-Z0-9_-]+\.json$/.test(name))throw new Error('Invalid storage path');return join(this.root,name)}
 async read(name,fallback=null){try{const p=this.path(name);if((await lstat(p)).isSymbolicLink())throw new Error('Unsafe storage link');return JSON.parse(await readFile(p,'utf8'))}catch(e){if(e.code==='ENOENT')return fallback;throw e}}
 async write(name,value){const p=this.path(name);try{if((await lstat(p)).isSymbolicLink())throw new Error('Unsafe storage link')}catch(e){if(e.code!=='ENOENT')throw e}const tmp=p+'.'+randomUUID()+'.tmp';try{await writeFile(tmp,JSON.stringify(value),{mode:0o600,flag:'wx'});await rename(tmp,p)}catch(e){await unlink(tmp).catch(()=>{});throw e}}
 async hostId(){let v=await this.read('host.json');if(!v){v={id:'urn:uuid:'+randomUUID()};await this.write('host.json',v)}return v.id}
}
