import fs from 'node:fs';
import path from 'node:path';
const out = path.resolve('dist');
const source = path.resolve('public/preview');
const pages = [
'index.html','research-projects.html','experience.html',
'technical-blogs.html','my-artwork.html','ask-about-mishti.html'];
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
const researchPage=read('research-projects.html');
assert(researchPage.includes('id="forge"'), 'FORGE project section not found');
assert(researchPage.includes('Testing brain sensing in smart glasses and earbuds'), 'FORGE project title missing');
assert(researchPage.includes('Ongoing'), 'FORGE status is not labeled ongoing');
assert(researchPage.includes('No final accuracy results yet'), 'FORGE results caveat missing');
assert(researchPage.includes('No hardware prototype is being built'), 'FORGE hardware scope caveat missing');
assert(researchPage.includes('href="#forge"'), 'FORGE navigation link missing');
assert(researchPage.includes('https://github.com/mbroor/Novel-EEG-Electrodes'), 'Novel EEG electrodes source repository link missing');
assert(researchPage.includes('3D-printable electrode STL files'), 'Missing transparent repository description');
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
const ogImage = '<meta property="og:image" content="https://mishtibroor.com/images/eeg-poster-solo.jpeg"';
assert(home.includes(ogImage), 'Homepage must use the solo presentation photo for social preview');
assert(home.includes('name="twitter:image" content="https://mishtibroor.com/images/eeg-poster-solo.jpeg"'), 'Twitter preview image missing');
assert(home.includes('property="og:url" content="https://mishtibroor.com/"'), 'Canonical social URL mismatch');
assert(home.includes('og:image:alt'), 'Social image alternative text missing');
assert(home.includes('src="/images/eeg-poster-solo.jpeg" alt="Mishti Broor presenting'), 'Featured image still shows group');
assert(fs.existsSync(path.join(out,'images','eeg-poster-solo.jpeg')), 'Social preview photo missing from build');
assert(home.includes('Engineering with curiosity, <em>and people in mind.</em>'), 'Personal portfolio introduction missing');
assert(!home.includes('Turning neural engineering into'), 'Old EEG-specific headline remains');
assert(!home.includes('Designing for better scalp contact.'), 'Old EEG-specific focus card remains');
assert((home.match(/data-precision-card(?=\s)/g)||[]).length===4, 'Expected four scroll-focus portfolio areas');
for (const page of ['research-projects.html','experience.html','technical-blogs.html','my-artwork.html']) {
 assert(home.includes('href="'+page+'"'), 'Missing homepage section link: '+page);
}
const { Script } = await import('node:vm');
for (const script of [...home.matchAll(/<script(?: [^>]*)?>([\s\S]*?)<\/script>/g)]) {
 if (script[1].trim()) new Script(script[1], {filename:'homepage-inline.js'});
}
assert(home.includes('id="about"') && home.includes('home-education'), 'Merged personal background missing');
assert(home.includes('research-projects.html#sfn'), 'Homepage SfN feature missing');
assert(home.includes('https://drive.google.com/file/d/1G_Ssr0d5Gii7ro_BA77Bx_fRt_DBN7I6/view?usp=drivesdk'), 'Direct résumé link missing');
assert(read('experience.html').includes('id="skills"'), 'Merged technical skills missing');
assert(read('about-me.html').includes('/#about'), 'About redirect missing');
assert(read('skills.html').includes('/experience.html#skills'), 'Skills redirect missing');
assert(read('resume.html').includes('drive.google.com/file/d/'), 'Résumé redirect missing');
assert(researchPage.includes('id="sfn"') && researchPage.includes('PSTR159.03'), 'SfN presentation record missing');
for(const photo of ['poster','discussion','poster-audience','team','bci-panel','bci-session','lecture']){
  const asset='images/sfn/'+photo+'.webp';
  assert(fs.existsSync(path.join(out,asset)),'Missing SfN photo: '+photo);
  assert(researchPage.includes('/'+asset),'SfN gallery photo missing: '+photo);
}
for(const page of pages){
  const html=read(page);
  const nav=html.match(/<nav class="navigation"[^>]*>([\s\S]*?)<\/nav>/)?.[1]||'';
  assert(nav.includes('>Writing</a>') && nav.includes('>Artwork</a>') && nav.includes('nav-resume'),'Consolidated navigation missing on '+page);
  assert(!nav.includes('about-me.html') && !nav.includes('skills.html') && !nav.includes('class="more"'),'Redundant navigation on '+page);
}
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
const {execFileSync}=await import('node:child_process');
execFileSync(process.execPath,['scripts/test-chat-professional.mjs'],{stdio:'inherit'});
const chatPage=read('mb-chat.js');
assert(chatPage.includes('mailto:mishtibroor2028@u.northwestern.edu'), 'Missing visitor email draft path');
assert(chatPage.includes('mb-inquiry-form'), 'Missing professional inquiry form');
console.log('Living Lab build passed '+assertions+' link, page, art, and domain checks.');
