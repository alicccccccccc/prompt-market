import { zipSync, strToU8 } from 'fflate';
export const STORE='prompt-market-v1';
export function readStore(key,fallback){try{return JSON.parse(localStorage.getItem(`${STORE}:${key}`))??fallback}catch{return fallback}}
export function writeStore(key,value){try{localStorage.setItem(`${STORE}:${key}`,JSON.stringify(value));return true}catch{return false}}
export function compilePrompt(role,prompt,brief={}){
 return `${prompt}\n\n# 当前用户任务\n${brief.task?.trim()||role.example}\n\n## 补充材料与背景\n${brief.context?.trim()||'尚未提供。需要时先说明缺少哪些关键输入。'}\n\n## 交付要求\n${brief.format?.trim()||role.outputs.join('、')}\n\n请结合角色方法完成当前任务；先交付有用结果，并列出关键假设及验证方法。`;
}
export function skillDocument(role,prompt){
 return `---\nname: market-${role.id}\ndescription: ${JSON.stringify(`当任务需要${role.name}时使用：${role.tagline}。交付${role.outputs.join('、')}。`)}\n---\n\n${prompt}\n`;
}
export function packageFiles(entries,license){
 const files={};
 for(const {role,prompt,brief} of entries){
  const folder=`.agents/skills/market-${role.id}`;
  files[`${folder}/SKILL.md`]=strToU8(skillDocument(role,prompt));
  files[`${folder}/LICENSE-source.txt`]=strToU8(license);
  files[`tasks/${role.id}.md`]=strToU8(compilePrompt(role,prompt,brief));
 }
 files['README-先读我.md']=strToU8(`# Prompt 菜市场 · Codex 任务包\n\n包含 ${entries.length} 个角色。解压后，将 .agents 文件夹复制到你自己的项目根目录（注意该文件夹可能被系统隐藏）。重新打开 Codex 项目，让它发现技能。\n\n在 Codex 中输入对应技能名，例如 $market-${entries[0].role.id}，并附上 tasks/ 中对应文件的任务。你也可以直接把任务文件的全文粘贴到对话中，不安装技能。\n\n导出包不包含密钥，不会自动调用模型。联网、工具和文件访问能力取决于你使用的 Codex 环境与权限。角色模板不授予额外权限。\n\n保留每个技能目录的 LICENSE-source.txt。角色原作：Michael Sitarzewski；中文本地化：jnMetaCode；本产品做精选和任务适配。\n\n官方技能说明：https://developers.openai.com/codex/skills/\n`);
 return files;
}
export function createPackage(entries,license){return zipSync(packageFiles(entries,license),{level:6})}
export function saveFile(name,content,type='text/markdown;charset=utf-8'){
 const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);
}
export async function copyText(text){
 if(navigator.clipboard?.writeText){try{await navigator.clipboard.writeText(text);return}catch{ /* fall back for browsers with blocked clipboard */ }}
 const previous=document.activeElement;const area=document.createElement('textarea');area.value=text;area.style.position='fixed';area.style.opacity='0';document.body.append(area);area.select();const ok=document.execCommand('copy');area.remove();previous?.focus();if(!ok)throw Error('复制被浏览器拦截，请下载任务文件后使用。');
}
export async function fetchText(url){const response=await fetch(url);if(!response.ok)throw Error('内容加载失败，请检查网络后重试。');const value=await response.text();if(url.endsWith('.md')&&!value.startsWith('#'))throw Error('角色内容暂不可用，请重试。');return value}
export function filterRoles(roles,query,category,favorites,onlySaved){
 const terms=query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
 return roles.filter(r=>(category==='all'||r.category===category)&&(!onlySaved||favorites.includes(r.id))&&terms.every(t=>[r.name,r.tagline,r.example,r.description,r.id,...r.outputs].join(' ').toLocaleLowerCase().includes(t)));
}
