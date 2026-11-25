import assert from 'node:assert/strict';
import {parseSearchResults,searchQuery,searchQueries} from '../lib/web-search-model.ts';
import {decodeRpc,boundedText,firecrawlSearch,parallelSearch} from '../lib/public-search-providers.ts';
import {validateReport} from '../lib/report-schema.ts';
import type {RegistryProject} from '../lib/types.ts';
const p={name:'Prestige Park Grove Phase 2',rera:'PRM/KA/RERA/1251/446/PR/010123/000001'} as RegistryProject;
assert.equal(searchQuery(p,'overview'),'prestige park grove Bengaluru');
assert.equal(searchQuery({...p,name:'Eden at Brigade Cornerstone Utopia'},'overview'),'brigade cornerstone utopia Bengaluru');
assert.equal(searchQuery({...p,name:'Prestige Park Grove Wing 18'},'prices'),'prestige park grove price Bengaluru');
assert.equal(searchQuery({...p,name:'Assetz Mizu & Ki'},'overview'),'assetz mizu ki Bengaluru','Distinctive short words must not disappear');
assert.equal(searchQueries(p,'complaints').length,3);
const v={results:[
 {url:'https://prestigebangalore.example/park-grove',title:'Prestige Park Grove',content:'Marketing claim <script>bad()</script> with price.'},
 {url:'https://prestigeconstructions.com/park-grove',title:'Prestige Park Grove',content:p.rera},
 {url:'https://housing.com/park-grove',title:'Prestige Park Grove resale',content:'Asking prices'},
 {url:'https://prestigeconstructions.com/park-grove#top',title:'Prestige Park Grove duplicate'},
 {url:'https://unrelated.example',title:'Manchester News',content:'Not this property'},
 {url:'javascript:alert(1)',title:p.name},
 {url:'https://127.0.0.1/private',title:p.name},
 {url:'https://bit.ly/redirect',title:p.name},
 {url:'https://user:password@bad.example',title:p.name},
 {url:'https://forum.example/users/prestige',title:'Prestige Park Grove user profile'},
 {url:'https://longbets.org/profile/prestige',title:'Prestige Park Grove'}
]};
const hits=parseSearchResults(v,p);assert.equal(hits.length,3);assert.equal(hits[0].kind,'Developer website');assert.equal(hits[0].phaseMatched,true);assert.equal(hits[1].kind,'Property listing');assert.equal(hits[2].kind,'Website · ownership unverified');assert.equal(hits[2].publishedAt,null);assert.equal(hits[2].phaseMatched,false);assert.ok(!hits[2].snippet.includes('bad()'));assert.throws(()=>parseSearchResults({},p));
const complaintHits=parseSearchResults({results:[{url:'https://selling.example/prestige',title:'Prestige Park Grove reviews',description:'Luxury apartments with a swimming pool.'},{url:'https://deccanherald.com/court',title:'Prestige Park Grove delayed handover',excerpts:['Buyer complaint filed concerning possession delays.'],publish_date:'2026-10-01'}]},p,'complaints');assert.equal(complaintHits.find(h=>h.domain==='selling.example')?.topicMatch,false,'Promotional reviews are not complaint evidence');assert.equal(complaintHits.find(h=>h.domain==='deccanherald.com')?.topicMatch,true);assert.equal(complaintHits.find(h=>h.domain==='deccanherald.com')?.dateEstimated,true);
const single={...p,name:'HIGHGROVE',builder:'SAMANVI ESTATES LLP'};assert.match(searchQuery(single,'overview'),/highgrove samanvi Bengaluru/);const singleHits=parseSearchResults({results:[{url:'https://homes.example/highgrove',title:'Samanvi Highgrove Bengaluru',description:'Plotted project in Devanahalli.'},{url:'https://uk.example/highgrove',title:'Highgrove Gardens',description:'British estate.'}]},single);assert.equal(singleHits.length,1,'Single-word names require promoter context, not an unrelated estate');
const report={rera:p.rera,projectName:p.name,markdown:'Search result collection, with uncertain facts. '.repeat(4),citations:hits.map(h=>({url:h.url,title:h.title})),researchedAt:new Date().toISOString(),billingPath:'free_search',reportKind:'search_results',webSearched:true,model:'Not allowed to pretend AI',inputTokens:100};
const safe=validateReport(report);assert.equal(safe.billingPath,'free_search');assert.equal(safe.model,'Web search · no AI');assert.equal(safe.inputTokens,null);assert.throws(()=>validateReport({...report,reportKind:undefined}));
assert.equal(decodeRpc('event: message\r\ndata: {"jsonrpc":"2.0","id":2,"result":{"ok":true}}\r\n\r\n',2).result.ok,true);assert.throws(()=>decodeRpc('{"id":7}',2));await assert.rejects(()=>boundedText(new Response('oversize'),2));
const realFetch=globalThis.fetch;let called=0;globalThis.fetch=async(input:any,init:any)=>{const url=String(input),headers=new Headers(init.headers);assert.equal(headers.has('Authorization'),false);assert.equal(headers.has('Cookie'),false);assert.equal(headers.has('PAYMENT-SIGNATURE'),false);const b=JSON.parse(init.body);called++;if(url.includes('firecrawl')){assert.match(b.query,/prestige park grove/);assert.equal(b.limit,8);return Response.json({success:true,data:{web:[{url:'https://prestigeconstructions.com/project',title:p.name,description:'Project information.'}]}})}assert.equal(url,'https://mcp.parallel.ai/mcp');if(b.method==='initialize')return Response.json({jsonrpc:'2.0',id:b.id,result:{protocolVersion:'2025-03-26'}},{headers:{'mcp-session-id':'fixture-session'}});assert.equal(headers.get('Mcp-Session-Id'),'fixture-session');if(b.method==='notifications/initialized')return new Response(null,{status:202});assert.equal(b.method,'tools/call');assert.equal(b.params.name,'web_search');assert.ok(!JSON.stringify(b).includes('notes'));return new Response('data: '+JSON.stringify({jsonrpc:'2.0',id:b.id,result:{structuredContent:{results:[{url:'https://housing.com/project',title:p.name,excerpts:['Dated asking price evidence.']}]}}})+'\n\n',{headers:{'Content-Type':'text/event-stream'}})};
try{assert.equal((await firecrawlSearch(p,'overview')).length,1);assert.equal((await parallelSearch(p,'prices')).length,1);assert.equal(called,4)}finally{globalThis.fetch=realFetch}
console.log('Web search checks passed: public provider contracts, JSON/SSE/session handling, no credentials/payments, real names, ranked sources, profile-spam exclusion, topical evidence and honest snapshots.');
