import {lookupOfficial} from '../../../../lib/registry';
export async function GET(req:Request){const q=new URL(req.url).searchParams.get('q')||'';if(q.trim().length<3||q.length>160)return Response.json({error:'Enter 3–160 characters.'},{status:400});return Response.json(await lookupOfficial(q),{headers:{'Cache-Control':'no-store'}})}
