(()=>{
const $=s=>document.querySelector(s);
const flat=COURSES.flatMap(c=>c.lessons.map(l=>Object.assign({},l,{course:c})));
const byId={};flat.forEach(l=>byId[l.id]=l);Object.keys(PAGES).forEach(k=>byId[k]=Object.assign({id:k},PAGES[k]));
const L=id=>byId[id]&&byId[id].course?"lessons/"+id+".html":"#"+id;const A=m=>`<a href="${m.href||L(m.id)}">${m.title}</a>`;
const item=m=>m.children?`<div class="has-sub"><button type="button" aria-expanded="false">${m.title} &#9662;</button><div class="sub">${m.children.map(c=>c.children?`<div class="grp"><b>${c.title}</b>${c.children.map(A).join("")}</div>`:A(c)).join("")}</div></div>`:A(m);
$("#mast").innerHTML=`<a class="brand" href="#"><img src="assets/logo.png" alt="" onerror="this.remove()"><span><b>LEARN</b><i>/</i>TECH</span></a><nav class="menu" id="menu" aria-label="Primary">${MENU.map(item).join("")}</nav><div class="search"><input id="q" type="search" placeholder="Search lessons  ( / )" aria-label="Search lessons" autocomplete="off"><div id="sr" hidden></div></div><button id="theme" class="ib" aria-label="Toggle light or dark theme">&#9680;</button><a class="xlink" href="${SITE.tech}">Open Tech &#8599;</a><button class="burger" aria-label="Toggle navigation" aria-expanded="false">&#9776;</button>`;
async function visits(el,ns){if(!el||!ns)return;try{const k="v-"+ns,u=sessionStorage.getItem(k)?"":"up",r=await fetch("https://api.counterapi.dev/v1/"+ns+"/visits/"+u),j=await r.json();sessionStorage.setItem(k,"1");el.textContent="Visitors: "+Number(j.count).toLocaleString()}catch(e){el.textContent=""}}
$("#foot").innerHTML=FOOTER.map(A).join("")+`<p>${HOME.footer}</p><p id="vc"></p>`;visits($("#vc"),SITE.counter);
$(".burger").onclick=e=>{const o=$("#menu").classList.toggle("open");e.currentTarget.setAttribute("aria-expanded",o)};
document.querySelectorAll(".has-sub>button").forEach(b=>b.onclick=()=>{const p=b.parentNode,o=p.classList.toggle("open");b.setAttribute("aria-expanded",o)});
const LS={get(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const DONE=LS.get("done",[]),root=document.documentElement;if(LS.get("theme",""))root.dataset.theme=LS.get("theme","");
$("#theme").onclick=()=>{const dk=root.dataset.theme?root.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;root.dataset.theme=dk?"light":"dark";LS.set("theme",root.dataset.theme)};
const bar=document.createElement("div");bar.className="progress";document.body.prepend(bar);
addEventListener("scroll",()=>{const h=document.documentElement;bar.style.width=(h.scrollTop/((h.scrollHeight-h.clientHeight)||1)*100)+"%"});
const sIdx=flat.map(l=>({l,t:(l.title+" "+l.html.replace(/<[^>]+>/g," ")).toLowerCase()})),qi=$("#q"),sr=$("#sr");
qi.oninput=()=>{const v=qi.value.trim().toLowerCase();if(!v){sr.hidden=true;return}const r=sIdx.filter(x=>x.t.includes(v)).slice(0,6);sr.innerHTML=r.length?r.map(x=>`<a href="lessons/${x.l.id}.html"><b>${x.l.title}</b><small>${x.l.course.title}</small></a>`).join(""):"<p>No lessons match.</p>";sr.hidden=false};
sr.onclick=()=>{sr.hidden=true;qi.value=""};
addEventListener("keydown",e=>{if(e.key==="/"&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();qi.focus()}if(e.key==="Escape"){sr.hidden=true;qi.blur()}});
let track="All";const done=(()=>{try{return JSON.parse(sessionStorage.getItem("chk")||"[]")}catch(e){return[]}})();
const cards=()=>ROADMAPS.filter(r=>track==="All"||r.track===track).map(r=>`<article class="card ${r.color}"><div class="n">Field route ${r.num}</div><p class="m">${r.kicker}</p><h3>${r.title}</h3><p class="m">${r.weeks} &middot; ${r.tag}</p><p>${r.summary}</p><div class="tags">${r.tags.map(t=>`<span>${t}</span>`).join("")}</div><ol class="steps">${r.steps.map((s,i)=>`<li><span class="k">${i+1}</span><div><b>${s.title}</b><small>${s.desc}</small><a href="${s.href}" rel="noopener" target="_blank">Open ${s.label} &#8599;</a></div></li>`).join("")}</ol></article>`).join("");
function home(){const tr=["All",...ROADMAPS.map(r=>r.track)];
$("#app").innerHTML=`<div class="wrap"><section class="hero"><div><p class="eyebrow"><span class="dot"></span>${HOME.eyebrow}</p><h1>${HOME.title}</h1><p class="s">${HOME.summary}</p><a class="btn" href="#roadmaps">Find your route &rarr;</a><a class="tl" href="${SITE.tech}">Browse the toolbench &rsaquo;</a></div><div><img class="ph" src="assets/hero.jpg" alt="" onerror="this.remove()"><div class="term" aria-hidden="true"><div class="tb"><i></i><i></i><i></i></div><pre>$ chmod 750 deploy.sh
$ ls -l deploy.sh
-rwxr-x--- 1 you dev 120

A B | XOR
0 1 |  1
1 1 |  0

fetch -> decode -> execute
$ </pre></div></div></section><div class="stats"><div><b>${flat.length}</b>lessons</div><div><b>${COURSES.length}</b>courses</div><div><b>${ROADMAPS.length}</b>roadmaps</div><div><b>${DONE.length}</b>completed by you</div></div>
<h2 class="sec" id="courses">Lessons</h2><p class="lead">Short lessons with worked examples. Pick a course to start.</p><div class="cards">${COURSES.map(c=>`<article class="card lime"><h3>${c.title}</h3><p class="m">${c.lessons.filter(l=>DONE.includes(l.id)).length} of ${c.lessons.length} lessons complete</p><div class="bar"><i style="width:${c.lessons.filter(l=>DONE.includes(l.id)).length/c.lessons.length*100}%"></i></div><p>${c.lessons.map(l=>`<a href="lessons/${l.id}.html">${l.title}</a>`).join("<br>")}</p></article>`).join("")}</div>
<h2 class="sec" id="roadmaps">Roadmaps with a reason for every step.</h2><p class="lead">Choose the area that matches your goal. Each route moves from concepts to applied practice and ends with evidence you can keep.</p>
<div class="pills" id="pills">${tr.map(t=>`<button class="${t===track?"on":""}">${t}</button>`).join("")}</div><div class="cards" id="rm">${cards()}</div>
<h2 class="sec" id="checklist">A first-week field checklist.</h2><div class="check" id="chk"><p><b id="cnt"></b></p>${CHECKLIST.map((c,i)=>`<label><input type="checkbox" data-i="${i}" ${done.includes(i)?"checked":""}> ${c}</label>`).join("")}</div>
<div class="banner"><div><b>Need a working reference?</b><br>The next learning step often needs the right tool.</div><a href="${SITE.tech}">Open Tech toolbench</a></div></div>`;
const cnt=()=>$("#cnt").textContent=done.length+" of "+CHECKLIST.length+" prepared";cnt();
$("#pills").onclick=e=>{if(e.target.tagName!=="BUTTON")return;track=e.target.textContent;$("#rm").innerHTML=cards();[...$("#pills").children].forEach(b=>b.classList.toggle("on",b.textContent===track))};
$("#chk").onchange=e=>{const i=+e.target.dataset.i,k=done.indexOf(i);k<0?done.push(i):done.splice(k,1);try{sessionStorage.setItem("chk",JSON.stringify(done))}catch(x){}cnt()};
document.title="Learn / Tech \u2014 Practical Technical Capability"}
function lesson(l){const i=flat.findIndex(x=>x.id===l.id),c=l.course,words=l.html.replace(/<[^>]+>/g," ").split(/\s+/).length,q=QUIZ[l.id],ok=DONE.includes(l.id);
$("#app").innerHTML=`<div class="wrap page"><aside aria-label="${c.title}"><b>${c.title}</b>${c.lessons.map(x=>`<a href="#${x.id}" class="${x.id===l.id?"on":""}">${DONE.includes(x.id)?"&#10003; ":""}${x.title}</a>`).join("")}<div id="toc"></div></aside><article><p class="crumb"><a href="#">Learn</a> &rsaquo; ${c.title} &middot; about ${Math.max(1,Math.round(words/180))} min read</p><h1>${l.title}</h1><div id="body">${l.html}</div>${q?`<section class="quiz"><h3>Check yourself</h3><p>${q.q}</p>${q.o.map((o,k)=>`<button data-k="${k}">${o}</button>`).join("")}<p id="qa" role="status"></p></section>`:""}<button id="dn" class="go">${ok?"Completed &#10003; (click to undo)":"Mark as complete"}</button><div class="pn"><span>${i?`<a href="#${flat[i-1].id}">&larr; ${flat[i-1].title}</a>`:""}</span><span>${i<flat.length-1?`<a href="#${flat[i+1].id}">${flat[i+1].title} &rarr;</a>`:""}</span></div></article></div>`;
const hs=[...$("#body").querySelectorAll("h3")];hs.forEach((h,k)=>h.id="s"+k);
if(hs.length>1){$("#toc").innerHTML="<b>On this page</b>"+hs.map((h,k)=>`<a href="#" data-s="s${k}">${h.textContent}</a>`).join("");$("#toc").onclick=e=>{const s=e.target.dataset.s;if(s){e.preventDefault();document.getElementById(s).scrollIntoView({behavior:"smooth"})}}}
$("#body").querySelectorAll("pre").forEach(p=>{const t=p.textContent,b=document.createElement("button");b.className="cp";b.textContent="Copy";b.onclick=()=>{if(navigator.clipboard)navigator.clipboard.writeText(t);b.textContent="Copied";setTimeout(()=>b.textContent="Copy",1200)};p.append(b)});
document.querySelectorAll(".quiz button").forEach(b=>b.onclick=()=>{const k=+b.dataset.k;document.querySelectorAll(".quiz button").forEach(x=>{x.disabled=true;x.classList.toggle("right",+x.dataset.k===q.a)});if(k!==q.a)b.classList.add("wrong");$("#qa").textContent=(k===q.a?"Correct. ":"Not quite. ")+q.why});
$("#dn").onclick=()=>{const k=DONE.indexOf(l.id);k<0?DONE.push(l.id):DONE.splice(k,1);LS.set("done",DONE);lesson(l)};
document.title=l.title+" | Learn / Tech"}
function page(p){$("#app").innerHTML=`<div class="wrap page solo"><article><p class="crumb"><a href="#">Learn</a></p><h1>${p.title}</h1>${p.html}</article></div>`;document.title=p.title+" | Learn / Tech"}
function route(){const id=location.hash.slice(1),p=byId[id];$("#menu").classList.remove("open");
if(p&&p.course){location.replace("lessons/"+p.id+".html");return}if(p){page(p);scrollTo(0,0)}else{home();const el=id&&document.getElementById(id);el?el.scrollIntoView():scrollTo(0,0)}}
addEventListener("hashchange",route);route();
})();
