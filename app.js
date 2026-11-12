(()=>{
const $=s=>document.querySelector(s);
const flat=COURSES.flatMap(c=>c.lessons.map(l=>Object.assign({},l,{course:c})));
const byId={};flat.forEach(l=>byId[l.id]=l);Object.keys(PAGES).forEach(k=>byId[k]=Object.assign({id:k},PAGES[k]));
const A=m=>`<a href="${m.href||"#"+m.id}">${m.title}</a>`;
const item=m=>m.children?`<div class="has-sub"><button type="button" aria-expanded="false">${m.title} &#9662;</button><div class="sub">${m.children.map(c=>c.children?`<div class="grp"><b>${c.title}</b>${c.children.map(A).join("")}</div>`:A(c)).join("")}</div></div>`:A(m);
$("#mast").innerHTML=`<a class="brand" href="#"><img src="assets/logo.png" alt="" onerror="this.remove()"><span><b>LEARN</b><i>/</i>TECH</span></a><nav class="menu" id="menu" aria-label="Primary">${MENU.map(item).join("")}</nav><a class="xlink" href="${SITE.tech}">Open Tech &#8599;</a><button class="burger" aria-label="Toggle navigation" aria-expanded="false">&#9776;</button>`;
$("#foot").innerHTML=FOOTER.map(A).join("")+`<p>${HOME.footer}</p>`;
$(".burger").onclick=e=>{const o=$("#menu").classList.toggle("open");e.currentTarget.setAttribute("aria-expanded",o)};
document.querySelectorAll(".has-sub>button").forEach(b=>b.onclick=()=>{const p=b.parentNode,o=p.classList.toggle("open");b.setAttribute("aria-expanded",o)});
let track="All";const done=(()=>{try{return JSON.parse(sessionStorage.getItem("chk")||"[]")}catch(e){return[]}})();
const cards=()=>ROADMAPS.filter(r=>track==="All"||r.track===track).map(r=>`<article class="card ${r.color}"><div class="n">Field route ${r.num}</div><p class="m">${r.kicker}</p><h3>${r.title}</h3><p class="m">${r.weeks} &middot; ${r.tag}</p><p>${r.summary}</p><div class="tags">${r.tags.map(t=>`<span>${t}</span>`).join("")}</div><ol class="steps">${r.steps.map((s,i)=>`<li><span class="k">${i+1}</span><div><b>${s.title}</b><small>${s.desc}</small><a href="${s.href}" rel="noopener" target="_blank">Open ${s.label} &#8599;</a></div></li>`).join("")}</ol></article>`).join("");
function home(){const tr=["All",...ROADMAPS.map(r=>r.track)];
$("#app").innerHTML=`<div class="wrap"><section class="hero solo"><div><p class="eyebrow"><span class="dot"></span>${HOME.eyebrow}</p><h1>${HOME.title}</h1><p class="s">${HOME.summary}</p><a class="btn" href="#roadmaps">Find your route &rarr;</a><a class="tl" href="${SITE.tech}">Browse the toolbench &rsaquo;</a></div></section>
<h2 class="sec" id="courses">Lessons</h2><p class="lead">Short lessons with worked examples. Pick a course to start.</p><div class="cards">${COURSES.map(c=>`<article class="card lime"><h3>${c.title}</h3><p class="m">${c.lessons.length} lessons</p><p>${c.lessons.map(l=>`<a href="#${l.id}">${l.title}</a>`).join("<br>")}</p></article>`).join("")}</div>
<h2 class="sec" id="roadmaps">Roadmaps with a reason for every step.</h2><p class="lead">Choose the area that matches your goal. Each route moves from concepts to applied practice and ends with evidence you can keep.</p>
<div class="pills" id="pills">${tr.map(t=>`<button class="${t===track?"on":""}">${t}</button>`).join("")}</div><div class="cards" id="rm">${cards()}</div>
<h2 class="sec" id="checklist">A first-week field checklist.</h2><div class="check" id="chk"><p><b id="cnt"></b></p>${CHECKLIST.map((c,i)=>`<label><input type="checkbox" data-i="${i}" ${done.includes(i)?"checked":""}> ${c}</label>`).join("")}</div>
<div class="banner"><div><b>Need a working reference?</b><br>The next learning step often needs the right tool.</div><a href="${SITE.tech}">Open Tech toolbench</a></div></div>`;
const cnt=()=>$("#cnt").textContent=done.length+" of "+CHECKLIST.length+" prepared";cnt();
$("#pills").onclick=e=>{if(e.target.tagName!=="BUTTON")return;track=e.target.textContent;$("#rm").innerHTML=cards();[...$("#pills").children].forEach(b=>b.classList.toggle("on",b.textContent===track))};
$("#chk").onchange=e=>{const i=+e.target.dataset.i,k=done.indexOf(i);k<0?done.push(i):done.splice(k,1);try{sessionStorage.setItem("chk",JSON.stringify(done))}catch(x){}cnt()};
document.title="Learn / Tech \u2014 Practical Technical Capability"}
function lesson(l){const i=flat.findIndex(x=>x.id===l.id),c=l.course;
$("#app").innerHTML=`<div class="wrap page"><aside aria-label="${c.title}"><b>${c.title}</b>${c.lessons.map(x=>`<a href="#${x.id}" class="${x.id===l.id?"on":""}">${x.title}</a>`).join("")}</aside><article><p class="crumb"><a href="#">Learn</a> &rsaquo; ${c.title}</p><h1>${l.title}</h1>${l.html}<div class="pn"><span>${i?`<a href="#${flat[i-1].id}">&larr; ${flat[i-1].title}</a>`:""}</span><span>${i<flat.length-1?`<a href="#${flat[i+1].id}">${flat[i+1].title} &rarr;</a>`:""}</span></div></article></div>`;document.title=l.title+" | Learn / Tech"}
function page(p){$("#app").innerHTML=`<div class="wrap page solo"><article><p class="crumb"><a href="#">Learn</a></p><h1>${p.title}</h1>${p.html}</article></div>`;document.title=p.title+" | Learn / Tech"}
function route(){const id=location.hash.slice(1),p=byId[id];$("#menu").classList.remove("open");
if(p){p.course?lesson(p):page(p);scrollTo(0,0)}else{home();const el=id&&document.getElementById(id);el?el.scrollIntoView():scrollTo(0,0)}}
addEventListener("hashchange",route);route();
})();
