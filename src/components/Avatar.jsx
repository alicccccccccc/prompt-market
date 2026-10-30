// Code-native geometric character system: 108 deterministic portraits, no external requests.
const tones=['oklch(0.84 0.08 62)','oklch(0.71 0.10 52)','oklch(0.58 0.09 45)','oklch(0.90 0.05 62)'];
const shirts=['oklch(0.54 0.10 188)','oklch(0.65 0.18 35)','oklch(0.65 0.12 280)','oklch(0.72 0.13 95)','oklch(0.63 0.11 242)','oklch(0.62 0.14 345)'];
export default function Avatar({seed=0,category='product',className=''}){
 const skin=tones[seed%4],shirt=shirts[(seed*7+Math.floor(seed/4))%6],hair=['oklch(0.24 0.02 35)','oklch(0.36 0.06 45)','oklch(0.48 0.10 55)','oklch(0.23 0.02 275)'][Math.floor(seed/3)%4],style=seed%6;
 return <svg className={`avatar ${className}`} viewBox="0 0 200 180" fill="none" aria-hidden="true"><g stroke="oklch(0.23 0.02 188)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
 <ellipse cx="100" cy="166" rx="65" ry="7" fill="oklch(0.23 0.02 188 / .10)" stroke="none"/>
 {style===1&&<path d="M62 87Q49 22 99 21Q151 18 143 118L58 120Z" fill={hair}/>}
 {style===4&&<><circle cx="142" cy="49" r="17" fill={hair}/><path d="M61 78Q43 21 102 20Q154 21 140 91" fill={hair}/></>}
 <path d="M44 163Q42 116 83 112L117 112Q160 116 158 163Z" fill={shirt}/>
 <path d="M84 103V122Q100 139 117 122V101" fill={skin}/>
 <path d="M60 72Q53 58 49 73Q46 89 61 92M140 72Q148 58 153 73Q156 89 140 92" fill={skin}/>
 <path d="M60 55Q60 26 100 26Q141 25 141 57L138 88Q133 117 101 120Q68 115 62 91Z" fill={skin}/>
 {style===0&&<path d="M60 65L57 43L73 37L69 25L93 29L110 18L122 31L141 35L143 66L127 57L122 43Q96 59 68 49Z" fill={hair}/>}
 {style===1&&<path d="M60 70Q53 26 94 24Q136 18 143 63Q125 59 110 40Q92 61 60 70Z" fill={hair}/>}
 {style===2&&<path d="M59 63Q49 41 62 34Q64 19 81 24Q94 12 108 24Q127 15 134 31Q150 36 142 64L127 51Q103 59 78 47Z" fill={hair}/>}
 {style===3&&<><path d="M59 60Q55 26 96 24Q136 20 141 60L128 45Q103 55 72 44Z" fill={hair}/><path d="M68 95Q96 117 132 95Q123 123 100 121Q77 118 68 95Z" fill={hair}/></>}
 {style===4&&<path d="M60 65Q57 23 101 24Q140 23 141 67L125 44Q105 63 69 52Z" fill={hair}/>}
 {style===5&&<><path d="M57 53Q52 25 96 24Q142 21 144 54Z" fill={shirt}/><path d="M56 52H147Q158 55 153 63H80" fill={shirt}/></>}
 <path d="M77 70L85 69M114 69L122 71"/>
 <path d="M83 80V83M119 80V83" strokeWidth="5"/>
 <path d="M101 81L98 93H103" strokeWidth="2.5"/>
 <path d={style===3?'M88 100Q100 97 113 100':'M88 101Q100 112 113 100'} strokeWidth="2.5"/>
 {seed%3===0&&<><rect x="69" y="73" width="25" height="19" rx="7" fill="oklch(1 0 0 / .12)" strokeWidth="2.5"/><rect x="107" y="73" width="25" height="19" rx="7" fill="oklch(1 0 0 / .12)" strokeWidth="2.5"/><path d="M94 78Q100 74 107 78" strokeWidth="2.5"/></>}
 <path d="M67 142L63 162M136 142L140 162" stroke="oklch(0.23 0.02 188 / .5)" strokeWidth="2.5"/>
 {['engineering','ai','quality'].includes(category)?<><path d="M68 139H132L125 168H75Z" fill="oklch(0.93 0.015 188)"/><path d="M96 151L91 155L96 159M105 151L110 155L105 159" strokeWidth="2.5"/></>:category==='design'?<><path d="M80 157L127 123L134 133L87 166L76 168Z" fill="oklch(0.85 0.12 95)"/><path d="M124 126L131 135M80 157L87 166" strokeWidth="2"/></>:category==='content'?<><rect x="77" y="132" width="48" height="35" rx="2" fill="oklch(0.96 0.01 188)"/><path d="M101 135V166M84 142H94M108 142H118M84 150H94M108 150H118" strokeWidth="2"/></>:<><rect x="79" y="129" width="43" height="39" rx="4" fill="oklch(0.97 0 0)"/><rect x="92" y="126" width="17" height="7" rx="2" fill="oklch(0.80 0.11 95)"/><path d="M88 143H113M88 150H108M88 157H105" strokeWidth="2.5"/></>}
 </g></svg>;
}
