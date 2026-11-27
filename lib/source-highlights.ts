import type {SearchHit} from './web-search-model';

export type SourceHighlight={label:string;excerpt:string;source:SearchHit};
const topics=[
  {label:'Published price mention',pattern:/₹|\b(?:rs\.?|inr)\s*\d|\b\d+(?:\.\d+)?\s*(?:crores?|cr\b|lakhs?|lacs?)\b/i},
  {label:'Timeline mention',pattern:/possession|handover|completion|construction|ready to move/i},
  {label:'Location & water mention',pattern:/\bwater\b|tanker|borewell|\bmetro\b|connectivity|flood|drain|approach road/i},
  {label:'Complaint / delay mention',pattern:/\bcomplaint|\bdelay|litigation|court order|consumer case/i},
];
// Extract source wording only. Never turn a snippet into a verified project fact,
// invent a missing field, or promote a marketing page into complaint evidence.
export function sourceHighlights(hits:SearchHit[]):SourceHighlight[]{
  return topics.flatMap(({label,pattern})=>{
    const source=hits.find(h=>{
      if(label==='Complaint / delay mention'&&!['Official RERA website','Government / court website','News report','Discussion / opinion'].includes(h.kind))return false;
      return pattern.test(h.snippet);
    });
    if(!source)return [];
    const passages=source.snippet.split(/(?<=[.!?])\s+|\n+/).filter(s=>pattern.test(s));
    const passage=passages[0]?.trim();
    if(!passage)return [];
    return [{label,excerpt:passage.length>420?passage.slice(0,419)+'…':passage,source}];
  });
}
