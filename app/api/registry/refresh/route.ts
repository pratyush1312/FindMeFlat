import {runRefresh} from '../../../../lib/registry';
// Shared public-registry maintenance. The private Site's platform gate authenticates
// both browser visitors and supported service callers before reaching this route.
// This route never reads or writes private user research.
export async function POST(req:Request){if(req.headers.get('origin')&&req.headers.get('origin')!==new URL(req.url).origin)return Response.json({error:'Invalid origin'},{status:403});return Response.json(await runRefresh(),{headers:{'Cache-Control':'no-store'}})}
