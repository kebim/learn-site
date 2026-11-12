(()=>{
const $=s=>document.querySelector(s),root=document.documentElement,body=document.body;
const LS={get(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
if(LS.get("theme",""))root.dataset.theme=LS.get("theme","");
$("#theme").onclick=()=>{const dk=root.dataset.theme?root.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;root.dataset.theme=dk?"light":"dark";LS.set("theme",root.dataset.theme)};
$(".burger").onclick=e=>{const o=$("#menu").classList.toggle("open");e.currentTarget.setAttribute("aria-expanded",o)};
document.querySelectorAll(".has-sub>button").forEach(b=>b.onclick=()=>{const o=b.parentNode.classList.toggle("open");b.setAttribute("aria-expanded",o)});
const bar=document.createElement("div");bar.className="progress";body.prepend(bar);
addEventListener("scroll",()=>{const h=root;bar.style.width=(h.scrollTop/((h.scrollHeight-h.clientHeight)||1)*100)+"%"});
// completion
const DONE=LS.get("done",[]),id=body.dataset.id,dn=$("#dn");
const paint=()=>{dn.innerHTML=DONE.includes(id)?"Completed &#10003; (click to undo)":"Mark as complete";document.querySelectorAll("aside a[data-id]").forEach(a=>{const t=a.textContent.replace(/^\u2713 /,"");a.textContent=(DONE.includes(a.dataset.id)?"\u2713 ":"")+t})};
dn.onclick=()=>{const k=DONE.indexOf(id);k<0?DONE.push(id):DONE.splice(k,1);LS.set("done",DONE);paint()};paint();
// language
const ne=$("#b-ne"),T=$("#t");
function lang(l){const useNe=l==="ne"&&ne;$("#b-en").hidden=!!useNe;if(ne)ne.hidden=!useNe;T.textContent=useNe?T.dataset.ne:T.dataset.en;$("#nn").hidden=!(l==="ne"&&!ne);document.querySelectorAll(".lang button").forEach(b=>b.classList.toggle("on",b.dataset.l===l));LS.set("lang",l);toc();copy()}
document.querySelectorAll(".lang button").forEach(b=>b.onclick=()=>{if(!b.disabled||b.dataset.l==="en")lang(b.dataset.l)});
$(".lang button[data-l=ne]").addEventListener("click",()=>{if(!ne)lang("ne")});
function toc(){const vis=ne&&!ne.hidden?ne:$("#b-en"),hs=[...vis.querySelectorAll("h3")];hs.forEach((h,k)=>h.id="s"+k);$("#toc").innerHTML=hs.length>1?"<b>On this page</b>"+hs.map((h,k)=>`<a href="#s${k}" data-s="s${k}">${h.textContent}</a>`).join(""):""}
$("#toc").onclick=e=>{const s=e.target.dataset.s;if(s){e.preventDefault();document.getElementById(s).scrollIntoView({behavior:"smooth"})}};
function copy(){document.querySelectorAll("article pre:not([data-c])").forEach(p=>{p.dataset.c=1;const t=p.textContent,b=document.createElement("button");b.className="cp";b.textContent="Copy";b.onclick=()=>{if(navigator.clipboard)navigator.clipboard.writeText(t);b.textContent="Copied";setTimeout(()=>b.textContent="Copy",1200)};p.append(b)})}
lang(LS.get("lang","en"));
// quiz
const qz=$(".quiz");if(qz)qz.querySelectorAll("button").forEach(b=>b.onclick=()=>{const k=+b.dataset.k,a=+qz.dataset.a;qz.querySelectorAll("button").forEach(x=>{x.disabled=true;x.classList.toggle("right",+x.dataset.k===a)});if(k!==a)b.classList.add("wrong");$("#qa").textContent=(k===a?"Correct. ":"Not quite. ")+qz.dataset.why});
// search
let idx=null;const qi=$("#q"),sr=$("#sr");
qi.oninput=async()=>{const v=qi.value.trim().toLowerCase();if(!v){sr.hidden=true;return}if(!idx){try{idx=await (await fetch("../search.json")).json()}catch(e){idx=[]}}const r=idx.filter(x=>x.t.includes(v)).slice(0,6);sr.innerHTML=r.length?r.map(x=>`<a href="${x.id}.html"><b>${x.title}</b><small>${x.course}</small></a>`).join(""):"<p>No lessons match.</p>";sr.hidden=false};
sr.onclick=()=>{sr.hidden=true;qi.value=""};
addEventListener("keydown",e=>{if(e.key==="/"&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();qi.focus()}if(e.key==="Escape"){sr.hidden=true;qi.blur()}});
// visitor counter
(async()=>{const el=$("#vc"),ns=el.dataset.ns;if(!ns)return;try{const k="v-"+ns,u=sessionStorage.getItem(k)?"":"up",j=await (await fetch("https://api.counterapi.dev/v1/"+ns+"/visits/"+u)).json();sessionStorage.setItem(k,"1");el.textContent="Visitors: "+Number(j.count).toLocaleString()}catch(e){}})();
})();
