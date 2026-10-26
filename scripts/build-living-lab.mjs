import fs from 'node:fs';
import path from 'node:path';

const source = path.resolve('public', 'preview');
const output = path.resolve('dist');
const domain = 'https://mishtibroor.com';
const oldBlogRoot = 'https://www.mishtibroor.com/technical-blogs/';
const googleBlogRoot = 'https://sites.google.com/view/mishti-broor/technical-blogs/';

const pages = [
  'index.html',
  'about-me.html',
  'research-projects.html',
  'experience.html',
  'technical-blogs.html',
  'skills.html',
  'resume.html',
  'my-artwork.html',
  'ask-about-mishti.html',
];
const staticFiles = ['site.js', 'theme.css', 'mb-chat.js', 'mb-chat.css'];
const prettyRedirects = ['about-me', 'research-projects', 'experience', 'technical-blogs', 'skills', 'resume', 'my-artwork', 'ask-about-mishti'];

function write(relative, contents) {
  const target = path.join(output, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, contents, 'utf8');
}
function redirectHtml(destination, title = 'Page moved') {
  const safe = destination.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex">' +
    '<meta http-equiv="refresh" content="0;url=' + safe + '">' +
    '<title>' + title + '</title></head><body><p>This page has moved. <a href="' +
    safe + '">Open the page</a>.</p></body></html>';
}
function migrateText(contents, filename) {
  let text = contents
    .replaceAll('/mishti-portfolio/images/', '/images/')
    .replaceAll('/mishti-portfolio/docs/', '/docs/')
    .replaceAll('https://mbroor.github.io/mishti-portfolio/writing', '/technical-blogs.html')
    .replaceAll('https://mbroor.github.io/mishti-portfolio/', domain + '/');

  if (filename === 'technical-blogs.html') {
    text = text.replaceAll(oldBlogRoot, googleBlogRoot);
  }
  if (filename.endsWith('.html')) {
    const canonicalPath = filename === 'index.html' ? '/' : '/' + filename;
    const canonical = '<link rel="canonical" href="' + domain + canonicalPath + '">';
    text = text.replace('</head>', canonical + '</head>');
    text = text.replaceAll('src="mb-chat.js"', 'src="mb-chat.js?v=20261025-faq-fix"');
  }
  return text;
}

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
for (const folder of ['images', 'docs']) {
  const from = path.resolve('public', folder);
  if (fs.existsSync(from)) fs.cpSync(from, path.join(output, folder), { recursive: true });
}
for (const file of [...pages, ...staticFiles]) {
  const src = path.join(source, file);
  if (!fs.existsSync(src)) throw new Error('Missing source file: ' + src);
  write(file, migrateText(fs.readFileSync(src, 'utf8'), file));
}

const originalBlogs = fs.readFileSync(path.join(source, 'technical-blogs.html'), 'utf8');
const slugs = [...originalBlogs.matchAll(/https:\/\/www\.mishtibroor\.com\/technical-blogs\/([a-z0-9-]+)/g)].map(m => m[1]);
const unique = [...new Set(slugs)];
if (unique.length !== 37) throw new Error('Expected 37 article links. Found ' + unique.length);
for (const slug of unique) {
  write('technical-blogs/' + slug + '/index.html',
    redirectHtml(googleBlogRoot + slug, 'Article moved to original Google Site'));
}
for (const route of prettyRedirects) {
  write(route + '/index.html', redirectHtml('/' + route + '.html'));
}
// Preserve old review links without serving outdated or duplicate content.
for (const page of pages) {
  write('preview/' + page, redirectHtml(page === 'index.html' ? '/' : '/' + page, 'Living Lab portfolio'));
}
write('preview/artwork.html', redirectHtml('/my-artwork.html'));
write('preview/index.html', redirectHtml('/'));
write('CNAME', 'mishtibroor.com\n');
write('robots.txt', 'User-agent: *\nAllow: /\nSitemap: ' + domain + '/sitemap.xml\n');
write('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
  pages.map(p => '<url><loc>' + domain + (p === 'index.html' ? '/' : '/' + p) + '</loc></url>').join('') +
  '</urlset>');
write('404.html', '<!doctype html><html lang="en"><meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width,initial-scale=1">' +
  '<title>Page not found | Mishti Broor</title>' +
  '<style>body{background:#eee5da;color:#30171d;font-family:Times New Roman,serif;max-width:650px;margin:14vh auto;padding:20px}h1{font-size:4rem;font-weight:400}a{color:inherit}</style>' +
  '<h1>Page not found.</h1><p>This page may have moved. Please use the portfolio navigation.</p>' +
  '<a href="/">Return to the homepage</a></html>');
console.log('Built ' + pages.length + ' site pages, 37 article redirects, old path redirects, and artwork assets.');
