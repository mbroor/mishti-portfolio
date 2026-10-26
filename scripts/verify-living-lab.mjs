import fs from 'node:fs';
import path from 'node:path';
const out = path.resolve('dist');
const source = path.resolve('public/preview');
const pages = [
'index.html','about-me.html','research-projects.html','experience.html',
'technical-blogs.html','skills.html','resume.html','my-artwork.html','ask-about-mishti.html'];
let assertions = 0;
function assert(cond, explanation) {
  assertions++;
  if (!cond) throw new Error(explanation);
}
function read(file) {return fs.readFileSync(path.join(out, file),'utf8');}
for(const page of pages) {
  assert(fs.existsSync(path.join(out,page)), 'Missing root HTML page ' + page);
  const html = read(page);
  assert(html.includes('</html>'), 'Incomplete HTML page ' + page);
  assert(html.includes('https://mishtibroor.com/'), 'Missing canonical metadata ' + page);
  assert(!html.includes('/mishti-portfolio/'), 'Legacy project base path in ' + page);
  assert(html.includes('mb-chat.js'), 'Professional chat missing on ' + page);
  const attrs = [...html.matchAll(/(?:href|src|data-art)="([^"]+)"/g)].map(m=>m[1]);
  for(let value of attrs) {
    if(value.startsWith('#')||/^(?:https?:|mailto:|tel:|data:)/i.test(value))continue;
    const relative=decodeURIComponent(value.split('?')[0].split('#')[0].replace(/^\//,''));
    if(!relative)continue;
    const dest = path.resolve(out, relative);
    assert(dest.startsWith(out+path.sep) && fs.existsSync(dest),
      page + ' points to missing local asset ' + value);
  }
}
for(let n=1;n<=22;n++){
  const image = 'images/artwork/page-' + String(n).padStart(2,'0')+'.jpg';
  assert(fs.existsSync(path.join(out,image)), 'Missing artwork: '+image);
}
const spinalHtml=read('research-projects.html');
for(const photo of ["IMG_2712.jpeg","IMG_6758.jpeg","1000009597.jpeg"]) {
  assert(fs.existsSync(path.join(out,'images',photo)), 'Missing uploaded spinal gallery photo: '+photo);
  assert(spinalHtml.includes('/images/'+photo), 'Spinal project does not display '+photo);
}
assert(spinalHtml.includes('rp-spinal-gallery'), 'Spinal gallery markup missing');
const eeg=read('research-projects.html');
for (const image of ['IMG_2624 2.jpeg','IMG_6901 2.jpeg']) {
  assert(fs.existsSync(path.join(out,'images',image)), 'Uploaded EEG photo is missing: '+image);
  assert(eeg.includes('/images/'+encodeURIComponent(image)), 'EEG photo not linked in research page: '+image);
}
assert(eeg.includes('rp-eeg-new-gallery'), 'New EEG research gallery not found');
const eegPage=read('research-projects.html');
assert(eegPage.includes('With my coauthor and Sparky, UIC’s mascot.'), 'Missing UIC mascot caption');
assert(eegPage.includes('At CAURS with my coauthor and PI'), 'Missing CAURS caption');
const home=read('index.html');
assert(home.includes('Turning neural engineering into'), 'Wrong homepage deployed');
assert(home.includes('research and engineering projects, technical writing, résumé, and artwork.'), 'Homepage portfolio introduction missing');
assert(home.includes('href="resume.html"'), 'Homepage résumé link missing');
assert(home.includes('data-precision-card'), 'Scroll interaction missing');
assert(fs.existsSync(path.join(out,'mb-chat.js')),'Chat JS missing');
assert(fs.existsSync(path.join(out,'mb-chat.css')),'Chat CSS missing');
const blog=read('technical-blogs.html');
const moved=[...blog.matchAll(/https:\/\/sites\.google\.com\/view\/mishti-broor\/technical-blogs\/[a-z0-9-]+/g)];
assert(moved.length===37,'Expected 37 working-source article links, found '+moved.length);
assert(!blog.includes('https://www.mishtibroor.com/technical-blogs/'), 'Old blog links were not migrated');
for(const redirect of ['preview/index.html','preview/my-artwork.html','technical-blogs/index.html','about-me/index.html']){
 assert(fs.existsSync(path.join(out,redirect)), 'Missing legacy redirect '+redirect);
}
assert(read('CNAME').trim()==='mishtibroor.com','Domain metadata missing');
const { execFileSync } = await import('node:child_process');
execFileSync(process.execPath, ['scripts/test-chat-answers.mjs'], {stdio:'inherit'});
console.log('Living Lab build passed '+assertions+' link, page, art, and domain checks.');
