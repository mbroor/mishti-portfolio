import fs from 'node:fs';
import vm from 'node:vm';
const original = fs.readFileSync('public/preview/mb-chat.js', 'utf8');
const marker = '  const prompts = [';
if (original.split(marker).length !== 2) throw new Error('Chat test marker missing');
const injectable = original.replace(marker, '  globalThis.__answer = answerFor;\n  return;\n' + marker);
function session() {
  const context = {};
  vm.runInNewContext(injectable, context, {timeout:5000});
  if (typeof context.__answer !== 'function') throw new Error('Answer handler missing');
  return context.__answer;
}
const cases = [
 ['where is she studying?', 'Northwestern University'],
 ['Where does she go to school?', 'Northwestern University'],
 ['Which university does she attend?', 'Northwestern University'],
 ['What is she studying now?', 'Biomedical Engineering'],
 ['Where did she study before Northwestern?', 'University of Illinois Chicago'],
 ['How much experience does she have?', '1 year and 7 months'],
 ['How many years of experience does she have?', '1 year and 7 months'],
 ['How long has she been working in research?', '1 year and 7 months'],
 ['What is her educational background?', 'Northwestern University'],
 ['Is she working right now?', 'Kimchi Lab'],
 ['What work experience does she have?', 'Northwestern'],
 ['What has she done with EEG?', 'electrode'],
 ['What are her technical skills?', 'SolidWorks'],
 ['Where does she live?', 'private'],
 ['What is the weather today?', 'only answer questions about Mishti']
];
for(const [question,expected] of cases) {
 const response = session()(question).text;
 if(!response.toLowerCase().includes(expected.toLowerCase())) throw new Error('Question '+JSON.stringify(question)+' expected '+expected+' but got '+response);
}
console.log('Passed '+cases.length+' chatbot questions.');
