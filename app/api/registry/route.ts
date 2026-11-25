import {getChatGPTUser} from '../../chatgpt-auth';
import {readCatalogue,registryState,runRefresh} from '../../../lib/registry';
export async function GET(req:Request){const meta=await registryState();if(new URL(req.url).searchParams.has('meta'))return Response.json(meta,{headers:{'Cache-Control':'no-store'}});return Response.json({projects:await readCatalogue(),meta},{headers:{'Cache-Control':'no-store'}})}
export async function POST(req:Request){if(!await getChatGPTUser())return Response.json({error:'Sign in to refresh the catalogue.'},{status:401});if(req.headers.get('origin')&&req.headers.get('origin')!==new URL(req.url).origin)return Response.json({error:'Invalid origin'},{status:403});return Response.json(await runRefresh(),{headers:{'Cache-Control':'no-store'}})}
