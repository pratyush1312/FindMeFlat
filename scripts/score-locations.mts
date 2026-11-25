import {readFileSync,writeFileSync} from 'node:fs';
import {assessAccess} from '../lib/research-model.ts';
const data=JSON.parse(readFileSync('public/data/places.json','utf8'));
const projects=JSON.parse(readFileSync('public/data/registry.json','utf8'));
const scores:Record<string,any>={};
for(const p of projects){if(!p.lat||!p.lng)continue;const nearby=data.places.filter((x:any)=>Math.abs(x.lat-p.lat)<.13&&Math.abs(x.lng-p.lng)<.14);const r=assessAccess(p.lat,p.lng,nearby,data.sourceDate,data.bounds);if(r.score!=null)scores[p.rera]={rating:r.rating,score:r.score,lat:p.lat,lng:p.lng,sourceDate:r.sourceDate};}
writeFileSync('public/data/location-ratings.json',JSON.stringify(scores));console.log('Location access assessments',Object.keys(scores).length);
