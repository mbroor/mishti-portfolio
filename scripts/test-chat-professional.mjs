import fs from 'node:fs';
import vm from 'node:vm';
const code=fs.readFileSync('public/preview/mb-chat.js','utf8');
function run(question){
 let fn=null;
 const ctx={__mbChatTestHook:f=>{fn=f;}};
 const limited=code.replace('  const prompts = [','  return;\n  const prompts = [');
 vm.runInNewContext(limited,ctx,{timeout:4000});
 if(!fn)throw new Error('Chat test hook missing');
 return fn(question).text;
}
const cases=[
 ['what is her name','Mishti Broor'],
 ['wht is her name','Mishti Broor'],
 ['who is mishti','Mishti Broor'],
 ['wht is she studying','Northwestern'],
 ['what is she studying','Northwestern'],
 ['where is she studying','Northwestern'],
 ['what degree is she pursuing','Northwestern'],
 ['where did she do undergrad','Illinois Chicago'],
 ['is she available to work','does not confirm'],
 ['is she open to full time roles','does not confirm'],
 ['how much experience does she have','1 year and 7 months'],
 ['tell me about forge','FORGE'],
 ['what is she doing with EEG','electrode'],
 ['her portfolio projects','EEG'],
 ['where does she live','private'],
 ['what is her salary','private'],
 ['weather tomorrow','only answer questions about Mishti']
];
for(const [q,required] of cases){
 const answer=run(q);
 if(!answer.toLowerCase().includes(required.toLowerCase())) throw Error(q+' expected '+required+', got '+answer);
}
console.log('Chat passed '+cases.length+' professional/guardrail regression cases.');
