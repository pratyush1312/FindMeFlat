export type RegistryProject={id:string;name:string;builder:string;rera:string;district:string;locality:string;address:string;type:string;registrationStatus:string;registered:string;completion:string;extension?:string;locationAccess?:{rating:'Good'|'Average'|'Poor'|'Not assessed';score:number|null};lat:number|null;lng:number|null;units:number|null;water?:string;certificate?:string;complaints:number|null};
export const STATUSES=['Interested','Contacted','Visit planned','Visited','Shortlisted','Rejected'] as const;
export type Status=typeof STATUSES[number];
export type Quote={id:string;amount:number;extras:number;taxes:number;source:string;date:string;bhk:string;area:number;areaType:string;notes:string};
export type Activity={id:string;date:string;text:string};
export type Property=RegistryProject & {status:Status;reason:string;notes:string;contact:string;phone:string;followup:string;visit:string;quotes:Quote[];activities:Activity[];sourceText:string;checks:string[];version:number;locationSource?:string};
export type Attachment={id:string;projectId:string;name:string;type:string;size:number;createdAt:string};
export type Settings={budget:number;downPayment:number;interest:number;tenure:number;buffer:number};
export const DEFAULT_SETTINGS:Settings={budget:100,downPayment:25,interest:8.5,tenure:20,buffer:0};
export const amount=(v:number|null|undefined)=>v==null?'Price not shared':v>=100?'₹'+(v/100).toFixed(2)+' Cr':'₹'+Number(v.toFixed(2))+' L';
export function total(q:Quote|undefined){return q?q.amount+q.extras+q.taxes:null}
export function latest(p:Property){return p.quotes[p.quotes.length-1]}
export function blankProperty(p:RegistryProject):Property{return {...p,status:'Interested',reason:'',notes:'',contact:'',phone:'',followup:'',visit:'',quotes:[],activities:[],sourceText:'',checks:[],version:0}}
export const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
