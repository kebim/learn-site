// Generates one static page per lesson (lessons/<id>.html), search.json and sitemap.xml
// from content.js. Run after editing content:   node build.js
const fs=require("fs"),vm=require("vm"),path=require("path");
const ctx={};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname,"content.js"),"utf8")+";this.D={SITE,COURSES,MENU,FOOTER,QUIZ,HOME};",ctx);
const {SITE,COURSES,MENU,FOOTER,QUIZ,HOME}=ctx.D;
const e=s=>String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;"),strip=h=>h.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
const flat=COURSES.flatMap(c=>c.lessons.map(l=>Object.assign({},l,{c}))),ids=new Set(flat.map(l=>l.id));
const href=m=>m.href||(ids.has(m.id)?m.id+".html":"../index.html#"+m.id);
const A=m=>`<a href="${href(m)}">${m.title}</a>`;
const item=m=>m.children?`<div class="has-sub"><button type="button" aria-expanded="false">${m.title} &#9662;</button><div class="sub">${m.children.map(c=>c.children?`<div class="grp"><b>${c.title}</b>${c.children.map(A).join("")}</div>`:A(c)).join("")}</div></div>`:A(m);
fs.mkdirSync(path.join(__dirname,"lessons"),{recursive:true});
flat.forEach((l,i)=>{const q=QUIZ[l.id],ne=l.ne,text=strip(l.html),desc=text.slice(0,155).replace(/\s\S*$/,"")+"...",mins=Math.max(1,Math.round(text.split(" ").length/180)),url=`${SITE.learn}/lessons/${l.id}.html`;
const ld=JSON.stringify({"@context":"https://schema.org","@type":"Article",headline:l.title,description:desc,url,inLanguage:ne?["en","ne"]:"en",author:{"@type":"Person",name:"Mibek Pandey"},isPartOf:{"@type":"Course",name:l.c.title}});
const prev=flat[i-1],next=flat[i+1];
const page=`<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(l.title)} | Learn / Tech</title><meta name="description" content="${e(desc)}"><link rel="canonical" href="${url}">
<link rel="stylesheet" href="../style.css"><link rel="icon" href="../assets/logo.png">
<script type="application/ld+json">${ld}</script>
<!-- AdSense: paste your script here after approval -->
</head><body data-id="${l.id}">
<header class="mast"><a class="brand" href="../index.html"><img src="../assets/logo.png" alt="" onerror="this.remove()"><span><b>LEARN</b><i>/</i>TECH</span></a><nav class="menu" id="menu" aria-label="Primary">${MENU.map(item).join("")}</nav><div class="search"><input id="q" type="search" placeholder="Search lessons  ( / )" aria-label="Search lessons" autocomplete="off"><div id="sr" hidden></div></div><button id="theme" class="ib" aria-label="Toggle light or dark theme">&#9680;</button><a class="xlink" href="${SITE.tech}">Open Tech &#8599;</a><button class="burger" aria-label="Toggle navigation" aria-expanded="false">&#9776;</button></header>
<main><div class="wrap page"><aside aria-label="${e(l.c.title)}"><b>${l.c.title}</b>${l.c.lessons.map(x=>`<a href="${x.id}.html" data-id="${x.id}" class="${x.id===l.id?"on":""}">${x.title}</a>`).join("")}<div id="toc"></div></aside>
<article><p class="crumb"><a href="../index.html">Learn</a> &rsaquo; ${l.c.title} &middot; about ${mins} min read</p>
<div class="lang" role="group" aria-label="Language"><button data-l="en" class="on">English</button><button data-l="ne" ${ne?"":'disabled title="Nepali version coming soon"'}>नेपाली</button></div>
<p class="note2" id="nn" hidden>नेपाली संस्करण छिट्टै आउँदैछ। Nepali version coming soon; showing English.</p>
<h1 id="t" data-en="${e(l.title)}" data-ne="${ne?e(ne.title):""}">${l.title}</h1>
<div id="b-en" lang="en">${l.html}</div>${ne?`<div id="b-ne" lang="ne" hidden>${ne.html}</div>`:""}
${q?`<section class="quiz" data-a="${q.a}" data-why="${e(q.why)}"><h3>Check yourself</h3><p>${q.q}</p>${q.o.map((o,k)=>`<button data-k="${k}">${o}</button>`).join("")}<p id="qa" role="status"></p></section>`:""}
<button id="dn" class="go" data-id="${l.id}">Mark as complete</button>
<div class="pn"><span>${prev?`<a href="${prev.id}.html">&larr; ${prev.title}</a>`:""}</span><span>${next?`<a href="${next.id}.html">${next.title} &rarr;</a>`:""}</span></div></article></div></main>
<footer>${FOOTER.map(A).join("")}<p>${HOME.footer}</p><p id="vc" data-ns="${SITE.counter}" data-url="${SITE.counterUrl}"></p></footer>
<script src="../lesson.js"></script></body></html>`;
fs.writeFileSync(path.join(__dirname,"lessons",l.id+".html"),page)});
fs.writeFileSync(path.join(__dirname,"search.json"),JSON.stringify(flat.map(l=>({id:l.id,title:l.title,course:l.c.title,t:(l.title+" "+strip(l.html)).toLowerCase()}))));
const pages=["index.html","about.html","contact.html","privacy.html","terms.html",...flat.map(l=>"lessons/"+l.id+".html")];
fs.writeFileSync(path.join(__dirname,"sitemap.xml"),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p=>`<url><loc>${SITE.learn}/${p==="index.html"?"":p}</loc></url>`).join("\n")}\n</urlset>\n`);
console.log("Built",flat.length,"lesson pages");
