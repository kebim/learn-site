/* =====================================================================
   LEARN SITE CONTENT. This is the only file you need to edit.

   ADD A LESSON   : add {id:"unique-id", title:"Title", html:`<p>HTML here</p>`}
                    to the "lessons" list of a course in COURSES.
   ADD A SUBMENU  : add {title:"New course", lessons:[ ... ]} to COURSES.
                    (The top "Learn" menu, the sidebar and Previous/Next
                    update automatically.)
   ADD A MENU ITEM: add {title:"Name", id:"page-id"} or {title:"Name", href:"https://..."}
                    to MENU, and for id-pages add the page to PAGES.
   ADD A ROADMAP  : add an object to ROADMAPS (copy an existing one).
   ===================================================================== */
const SITE={learn:"https://learn.mibekpandey.com.np",tech:"https://tech.mibekpandey.com.np"};
const TOOLS_URL=SITE.tech;
const HOME={eyebrow:"Learn / roadmaps for real practice",title:"Choose a track.<br><em>Build the fundamentals.</em><br>Ship proof of work.",
 summary:"Structured learning paths for IT, Linux, networking, cybersecurity, web development, and automation, designed around useful practice, not endless tabs.",
 footer:"A practical study companion for building technical confidence one useful action at a time."};
const COURSES=[
{title:"Linux administration",lessons:[
{id:"linux-fs",title:"The filesystem layout",html:`<p>Linux organizes everything under one root, <code>/</code>. Knowing where things live is the first admin skill.</p>
<table><tr><th>Path</th><th>Holds</th></tr><tr><td><code>/etc</code></td><td>System configuration</td></tr><tr><td><code>/var</code></td><td>Logs, spool, changing data</td></tr><tr><td><code>/home</code></td><td>User files</td></tr><tr><td><code>/usr</code></td><td>Installed programs</td></tr><tr><td><code>/proc</code></td><td>Live kernel and process info</td></tr></table>
<h3>Try it</h3><pre>ls -l /etc | head
df -h
du -sh /var/log</pre>`},
{id:"linux-perms",title:"Users and permissions",html:`<p>Each file has an owner, a group, and three permission sets: user, group, other. Each set is read (4), write (2), execute (1).</p>
<pre>ls -l notes.sh
-rwxr-x--- 1 ana dev 120 notes.sh

chmod 750 notes.sh      # rwx r-x ---
chown ana:dev notes.sh
sudo useradd -m -G dev sam</pre>
<p>750 means the owner has 4+2+1=7, the group has 4+1=5, and others have 0. Use the chmod calculator on the <a href="${TOOLS_URL}">tech site</a> to check your numbers.</p>`},
{id:"linux-services",title:"Processes and services",html:`<p><code>systemd</code> starts and supervises services.</p>
<pre>systemctl status ssh
sudo systemctl restart nginx
sudo systemctl enable --now cron
journalctl -u nginx -n 50 --no-pager
ps aux --sort=-%mem | head
kill -15 PID     # ask politely, then -9 if stuck</pre>`}]},
{title:"Digital logic",lessons:[
{id:"logic-gates",title:"Gates and truth tables",html:`<p>Digital circuits work on 0 and 1. Every circuit is built from a few gates.</p>
<table><tr><th>A</th><th>B</th><th>AND</th><th>OR</th><th>XOR</th><th>NAND</th></tr><tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td></tr><tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td></tr></table>
<p>NAND is <em>universal</em>: any other gate can be built from NAND alone.</p>`},
{id:"logic-bool",title:"Boolean algebra",html:`<p>Simplify circuits with these laws:</p>
<pre>A + A·B = A                (absorption)
¬(A·B) = ¬A + ¬B           (De Morgan)
¬(A+B) = ¬A · ¬B           (De Morgan)
A·(B+C) = A·B + A·C        (distribution)</pre>
<p>Example: <code>A·B + A·¬B = A·(B+¬B) = A</code>. Two gates become a wire.</p>`},
{id:"logic-ff",title:"Flip-flops: SR, D, JK and T",html:`<p>A gate has no memory. A <b>flip-flop</b> stores one bit and changes only on a clock edge. Latches are level-sensitive; flip-flops are edge-triggered, which makes large circuits predictable.</p>
<h3>SR flip-flop</h3><p>Two inputs: Set and Reset. S=1 stores 1, R=1 stores 0, S=R=0 holds. S=R=1 is forbidden because the outputs conflict.</p>
<table><tr><th>S</th><th>R</th><th>Q next</th></tr><tr><td>0</td><td>0</td><td>Q (hold)</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>invalid</td></tr></table>
<h3>D flip-flop</h3><p>Copies D to Q on each clock edge: <code>Q+ = D</code>. It removes the invalid state, so registers and memory use it.</p>
<h3>JK flip-flop</h3><p>Like SR, but J=K=1 toggles. <code>Q+ = J·¬Q + ¬K·Q</code>.</p>
<table><tr><th>J</th><th>K</th><th>Q next</th></tr><tr><td>0</td><td>0</td><td>Q</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>¬Q</td></tr></table>
<h3>T flip-flop</h3><p>T=1 toggles, T=0 holds: <code>Q+ = T XOR Q</code>. Chain T flip-flops and you get a binary counter, because each stage halves the clock frequency.</p>
<h3>Setup and hold time</h3><p>D must be stable shortly before (setup) and after (hold) the clock edge. Violating either can leave the flip-flop in an undefined state called metastability.</p>
<p>Practice with the flip-flop simulator on the <a href="https://tech.mibekpandey.com.np">tech site</a>.</p>`},
{id:"logic-kmap",title:"Karnaugh maps",html:`<p>A Karnaugh map (K-map) is a grid that lays out a truth table so neighbouring cells differ by exactly one variable. Grouping adjacent 1s simplifies a Boolean function without algebra.</p>
<h3>Rules</h3><ol><li>Label rows and columns in <b>Gray code</b> (00, 01, 11, 10), not binary order.</li><li>Group 1s in rectangles of size 1, 2, 4, 8 or 16.</li><li>Groups may wrap around the edges, so the map is really a torus.</li><li>Make groups as large as possible, and use as few groups as possible.</li><li>Cells may be in more than one group. "Don't care" cells (X) may be used if they enlarge a group.</li></ol>
<h3>Worked example</h3><p>F(A,B,C) = Σm(0,1,2,5,6,7). Map (rows A, columns BC in Gray order 00, 01, 11, 10):</p>
<table><tr><th>A\BC</th><th>00</th><th>01</th><th>11</th><th>10</th></tr><tr><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td></tr></table>
<p>Groups: m0 and m1 give <code>¬A·¬B</code>. m1 and m5 give <code>¬B·C</code>. m5 and m7 give <code>A·C</code>. m6 and m7 give <code>A·B</code>. m0 and m2 give <code>¬A·¬C</code>, and m2 and m6 give <code>B·¬C</code>. A minimal cover is <code>F = ¬A·¬B + B·¬C + A·C</code>.</p>
<p>Check your own functions with the K-map tool on the <a href="https://tech.mibekpandey.com.np">tech site</a>. K-maps are practical up to 4 variables; beyond that, use the Quine-McCluskey method, which the tool uses internally.</p>`},{id:"logic-adder",title:"Building an adder",html:`<p>A half adder adds two bits: <code>sum = A XOR B</code>, <code>carry = A AND B</code>.</p>
<p>A full adder also takes a carry-in: <code>sum = A XOR B XOR Cin</code>, <code>Cout = A·B + Cin·(A XOR B)</code>. Chain N full adders to add N-bit numbers (a ripple-carry adder).</p>`}]},
{title:"Computer architecture",lessons:[
{id:"arch-cycle",title:"The fetch-decode-execute cycle",html:`<p>Every CPU repeats three steps forever:</p>
<ol><li><b>Fetch</b> the instruction at the address in the program counter (PC).</li><li><b>Decode</b> it to find the operation and operands.</li><li><b>Execute</b> it, write the result, and update the PC.</li></ol>
<p>Pipelining overlaps these steps so a new instruction starts every clock cycle.</p>`},
{id:"arch-memory",title:"The memory hierarchy",html:`<table><tr><th>Level</th><th>Typical size</th><th>Typical latency</th></tr><tr><td>Registers</td><td>~1 KB</td><td>under 1 ns</td></tr><tr><td>L1 cache</td><td>32-64 KB</td><td>~1 ns</td></tr><tr><td>L2/L3 cache</td><td>MBs</td><td>3-15 ns</td></tr><tr><td>RAM</td><td>GBs</td><td>~80 ns</td></tr><tr><td>SSD</td><td>TBs</td><td>~100 µs</td></tr></table>
<p>Programs run fast when they reuse nearby data (<em>locality</em>), because the caches hold it.</p>`},
{id:"arch-pipeline",title:"Pipelining and hazards",html:`<p>A classic 5-stage pipeline splits an instruction into Fetch, Decode, Execute, Memory and Write-back. With 5 stages full, one instruction finishes every cycle even though each takes 5.</p>
<table><tr><th>Cycle</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr><tr><td>I1</td><td>F</td><td>D</td><td>X</td><td>M</td><td>W</td><td></td></tr><tr><td>I2</td><td></td><td>F</td><td>D</td><td>X</td><td>M</td><td>W</td></tr></table>
<h3>Hazards</h3><p><b>Structural:</b> two instructions need the same hardware. <b>Data:</b> an instruction needs a result not yet written, as in <code>add t0,a,b</code> then <code>sub t1,t0,c</code>. Fixes: forwarding (send the result straight from the ALU) or a stall. <b>Control:</b> a branch makes the next fetch uncertain. Fixes: branch prediction or flushing wrong-path instructions.</p>
<p>Ideal speedup equals the number of stages. Hazards and stalls lower it: <code>CPI = 1 + stall cycles per instruction</code>.</p>`},
{id:"arch-isa",title:"Instruction sets",html:`<p>The ISA is the contract between software and hardware. x86-64 is CISC (many complex instructions); ARM and RISC-V are RISC (few simple ones).</p>
<pre>; RISC-V: c = a + b
lw  t0, 0(a0)
lw  t1, 4(a0)
add t2, t0, t1
sw  t2, 8(a0)</pre>`}]}
,{title:"Operating systems",lessons:[
{id:"os-sched",title:"CPU scheduling algorithms",html:`<p>When several processes are ready, the scheduler picks which one runs next. Good scheduling keeps the CPU busy and keeps users from waiting too long.</p>
<h3>Key terms</h3><p><b>Arrival time</b>: when a process becomes ready. <b>Burst time</b>: CPU time it needs. <b>Completion time (CT)</b>: when it finishes. <b>Turnaround time (TAT)</b> = CT - arrival. <b>Waiting time (WT)</b> = TAT - burst.</p>
<h3>FCFS (first come, first served)</h3><p>Run in arrival order. Simple, but one long job delays everything behind it (the convoy effect).</p>
<h3>SJF (shortest job first)</h3><p>Run the shortest burst next. It gives the lowest average waiting time, but long jobs can starve. The preemptive version is SRTF.</p>
<h3>Round robin</h3><p>Each process gets a time quantum, then goes to the back of the queue. Good response time; a tiny quantum wastes time on context switches, a huge one behaves like FCFS.</p>
<h3>Example (all arrive at 0)</h3><p>Bursts P1=6, P2=2, P3=4. FCFS order P1, P2, P3 gives waits 0, 6, 8, average 4.67. SJF order P2, P3, P1 gives waits 0, 2, 6, average 2.67.</p>
<p>Run your own numbers in the scheduling simulator on the <a href="https://tech.mibekpandey.com.np">tech site</a>.</p>`}]}
];
const PAGES={
 notes:{title:"Notes",html:`<p>Short study notes that do not need a full lesson. Add yours here in <code>PAGES.notes</code>.</p><h3>Write what you did</h3><p>After each session, record the command you ran, what you expected and what happened. A personal command glossary becomes your fastest reference.</p><h3>Work in small stages</h3><p>Pick one stage of one roadmap, build a small lab, write down the result, then continue.</p>`}
};
const MENU=[
 {title:"Learn",children:COURSES.map(c=>({title:c.title,children:c.lessons.map(l=>({title:l.title,id:l.id}))}))},
 {title:"Roadmaps",id:"roadmaps"},
 {title:"Tech",href:SITE.tech},
 {title:"Notes",id:"notes"},
 {title:"About",href:"about.html"}
];
const FOOTER=[{title:"Notes",id:"notes"},{title:"About",href:"about.html"},{title:"Contact",href:"contact.html"},{title:"Privacy",href:"privacy.html"},{title:"Terms",href:"terms.html"}];
const CHECKLIST=["Choose one track for the next 30 days","Set up a safe practice environment","Schedule two focused study blocks this week","Record one lesson learned after each session"];
const ROADMAPS=[
 {
  "track": "IT",
  "color": "lime",
  "num": "01",
  "kicker": "Start with the system",
  "title": "IT Foundations",
  "weeks": "6–8 weeks",
  "tag": "First principles",
  "summary": "Build the vocabulary and operating habits that make every technical specialization easier to understand.",
  "tags": [
   "Hardware",
   "Operating systems",
   "Files & processes"
  ],
  "steps": [
   {
    "title": "Map the machine",
    "desc": "Explain how CPU, memory, storage, and peripherals work together.",
    "label": "Professor Messer",
    "href": "https://www.professormesser.com/"
   },
   {
    "title": "Operate the system",
    "desc": "Navigate files, manage processes, and diagnose basic system issues.",
    "label": "OS Basics",
    "href": "https://www.netacad.com/courses/operating-systems-basics"
   },
   {
    "title": "Document your work",
    "desc": "Write repeatable troubleshooting notes and a personal command glossary.",
    "label": "Markdown Guide",
    "href": "https://www.markdownguide.org/basic-syntax/"
   }
  ]
 },
 {
  "track": "Linux",
  "color": "clay",
  "num": "02",
  "kicker": "Use the terminal with intent",
  "title": "Linux Operator",
  "weeks": "8–10 weeks",
  "tag": "Hands-on core",
  "summary": "Move from basic navigation to the habits that make Linux a reliable daily workspace and server foundation.",
  "tags": [
   "Shell",
   "Permissions",
   "Services"
  ],
  "steps": [
   {
    "title": "Learn the shell",
    "desc": "Move, create, inspect, and redirect files without relying on a graphical interface.",
    "label": "Linux Journey",
    "href": "https://linuxjourney.com/"
   },
   {
    "title": "Control access",
    "desc": "Set ownership, permissions, and safe SSH access for a small lab machine.",
    "label": "OverTheWire: Bandit",
    "href": "https://overthewire.org/wargames/bandit/"
   },
   {
    "title": "Run a service",
    "desc": "Install, inspect, start, and troubleshoot a systemd-managed service.",
    "label": "systemctl reference",
    "href": "https://www.freedesktop.org/software/systemd/man/latest/systemctl.html"
   }
  ]
 },
 {
  "track": "Networking",
  "color": "cobalt",
  "num": "03",
  "kicker": "Follow the packet",
  "title": "Networking Essentials",
  "weeks": "8–12 weeks",
  "tag": "Concept to capture",
  "summary": "Understand how devices communicate, then verify that understanding by observing real packets and routes.",
  "tags": [
   "TCP/IP",
   "Routing",
   "Packet analysis"
  ],
  "steps": [
   {
    "title": "Read the layers",
    "desc": "Describe the role of Ethernet, IP, TCP, UDP, DNS, and HTTP in one request.",
    "label": "Networking Basics",
    "href": "https://skillsforall.com/course/networking-basics"
   },
   {
    "title": "Build a tiny lab",
    "desc": "Assign addresses, test reachability, and compare a switch with a router.",
    "label": "Packet Tracer guides",
    "href": "https://www.packettracernetwork.com/"
   },
   {
    "title": "Inspect traffic",
    "desc": "Filter a packet capture to explain a DNS lookup and a web request.",
    "label": "Wireshark Guide",
    "href": "https://www.wireshark.org/docs/wsug_html_chunked/"
   }
  ]
 },
 {
  "track": "Cybersecurity",
  "color": "ink",
  "num": "04",
  "kicker": "Defend by understanding",
  "title": "Cybersecurity Analyst",
  "weeks": "12–16 weeks",
  "tag": "Lab-first",
  "summary": "Learn defensive thinking from operating-system fundamentals through web, network, and incident analysis labs.",
  "tags": [
   "Threat models",
   "Web security",
   "Detection"
  ],
  "steps": [
   {
    "title": "Build a safe lab",
    "desc": "Create an isolated practice environment and record a simple threat model.",
    "label": "TryHackMe",
    "href": "https://tryhackme.com/"
   },
   {
    "title": "Study web risk",
    "desc": "Recognize common web vulnerabilities and test only within authorized labs.",
    "label": "Web Security Academy",
    "href": "https://portswigger.net/web-security"
   },
   {
    "title": "Trace an incident",
    "desc": "Use logs, a timeline, and containment notes to explain a simulated alert.",
    "label": "SANS papers",
    "href": "https://www.sans.org/white-papers/"
   }
  ]
 },
 {
  "track": "Web",
  "color": "cobalt",
  "num": "05",
  "kicker": "Turn concepts into interfaces",
  "title": "Web Builder",
  "weeks": "10–14 weeks",
  "tag": "Build in public",
  "summary": "Learn the browser stack by making accessible pages, small interactive tools, and a documented portfolio.",
  "tags": [
   "HTML & CSS",
   "JavaScript",
   "Git"
  ],
  "steps": [
   {
    "title": "Structure a page",
    "desc": "Create semantic, responsive HTML and CSS for a small personal page.",
    "label": "MDN Learn",
    "href": "https://developer.mozilla.org/en-US/docs/Learn_web_development"
   },
   {
    "title": "Add behavior",
    "desc": "Build a browser interaction with JavaScript and explain its event flow.",
    "label": "javascript.info",
    "href": "https://javascript.info/"
   },
   {
    "title": "Ship a project",
    "desc": "Publish a small project with a clear README and version history.",
    "label": "GitHub Hello World",
    "href": "https://docs.github.com/en/get-started/start-your-journey/hello-world"
   }
  ]
 },
 {
  "track": "Automation",
  "color": "clay",
  "num": "06",
  "kicker": "Make repeatable work lighter",
  "title": "Automation & Data",
  "weeks": "8–12 weeks",
  "tag": "Useful scripting",
  "summary": "Use Python, shell, and structured data to automate small operational tasks and report what happened.",
  "tags": [
   "Python",
   "APIs",
   "Data hygiene"
  ],
  "steps": [
   {
    "title": "Script a routine",
    "desc": "Write a small Python script that reads a file and creates a useful report.",
    "label": "Automate the Boring Stuff",
    "href": "https://automatetheboringstuff.com/"
   },
   {
    "title": "Use structured data",
    "desc": "Read, clean, and summarize a CSV while preserving an audit-friendly process.",
    "label": "Pandas tutorials",
    "href": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html"
   },
   {
    "title": "Call an API",
    "desc": "Request public data, handle errors, and save a timestamped result responsibly.",
    "label": "Requests docs",
    "href": "https://requests.readthedocs.io/en/latest/"
   }
  ]
 },
 {
  "track": "Logic",
  "color": "ink",
  "num": "07",
  "kicker": "Follow the signal",
  "title": "Digital Logic & Computer Design",
  "weeks": "8–12 weeks",
  "tag": "From gates to machines",
  "summary": "See how binary values become decisions, memory, instruction flow, and the architecture beneath modern software.",
  "tags": [
   "Boolean algebra",
   "Circuits",
   "CPU design"
  ],
  "steps": [
   {
    "title": "Reason in binary",
    "desc": "Convert values, simplify Boolean expressions, and predict the output of small logic circuits.",
    "label": "Nand2Tetris",
    "href": "https://www.nand2tetris.org/"
   },
   {
    "title": "Compose a computer",
    "desc": "Connect gates into arithmetic logic, registers, and a simple CPU model.",
    "label": "Nand2Tetris course",
    "href": "https://www.nand2tetris.org/course"
   },
   {
    "title": "Trace an instruction",
    "desc": "Explain how a basic instruction moves through fetch, decode, execute, and storage.",
    "label": "Project sequence",
    "href": "https://www.nand2tetris.org/project01"
   }
  ]
 },
 {
  "track": "Cloud",
  "color": "cobalt",
  "num": "08",
  "kicker": "Design for change",
  "title": "Cloud Computing Foundations",
  "weeks": "10–14 weeks",
  "tag": "Infrastructure literacy",
  "summary": "Learn the cloud vocabulary, core delivery models, identity boundaries, and operational habits behind reliable services.",
  "tags": [
   "Compute",
   "Identity",
   "Reliability"
  ],
  "steps": [
   {
    "title": "Map the shared model",
    "desc": "Describe what a cloud provider manages and what a team remains responsible for.",
    "label": "AWS Skill Builder",
    "href": "https://aws.amazon.com/training/digital/"
   },
   {
    "title": "Deploy a tiny service",
    "desc": "Configure a simple static site or containerized sample without exposing credentials.",
    "label": "Cloud training",
    "href": "https://cloud.google.com/learn/training"
   },
   {
    "title": "Design for recovery",
    "desc": "Write a short availability, backup, and incident response plan for a small service.",
    "label": "SRE workbook",
    "href": "https://sre.google/workbook/table-of-contents/"
   }
  ]
 },
 {
  "track": "Quantum",
  "color": "clay",
  "num": "09",
  "kicker": "Think beyond classical bits",
  "title": "Quantum Computing Primer",
  "weeks": "6–10 weeks",
  "tag": "Conceptual foundation",
  "summary": "Build an intuitive and mathematical foundation for qubits, measurement, circuits, and the limits of quantum advantage.",
  "tags": [
   "Qubits",
   "Circuits",
   "Algorithms"
  ],
  "steps": [
   {
    "title": "Learn the vocabulary",
    "desc": "Distinguish superposition, entanglement, interference, and measurement without treating them as magic.",
    "label": "IBM Quantum Learning",
    "href": "https://learning.quantum.ibm.com/"
   },
   {
    "title": "Read a circuit",
    "desc": "Predict simple one- and two-qubit circuit outcomes using a simulator.",
    "label": "Quantum Country",
    "href": "https://quantum.country/"
   },
   {
    "title": "Compare the models",
    "desc": "Explain the difference between a quantum speedup claim and a practical application claim.",
    "label": "IBM Quantum docs",
    "href": "https://quantum.cloud.ibm.com/docs/en/guides"
   }
  ]
 },
 {
  "track": "Data",
  "color": "lime",
  "num": "010",
  "kicker": "Ask precise questions",
  "title": "Data & Databases",
  "weeks": "10–14 weeks",
  "tag": "From rows to insight",
  "summary": "Use structured data responsibly, query a relational database, and communicate what the evidence does—and does not—say.",
  "tags": [
   "SQL",
   "Data quality",
   "Visualization"
  ],
  "steps": [
   {
    "title": "Think in tables",
    "desc": "Describe entities, relationships, keys, and common data-quality failures.",
    "label": "SQLBolt",
    "href": "https://sqlbolt.com/"
   },
   {
    "title": "Query with care",
    "desc": "Write select, join, group, and filter queries against a practice dataset.",
    "label": "SQL tutorial",
    "href": "https://mode.com/sql-tutorial/"
   },
   {
    "title": "Explain the result",
    "desc": "Create a small, honest summary that identifies assumptions, limits, and the next question.",
    "label": "Kaggle Learn",
    "href": "https://www.kaggle.com/learn"
   }
  ]
 },
 {
  "track": "Systems",
  "color": "cobalt",
  "num": "011",
  "kicker": "Make trade-offs visible",
  "title": "Systems & Service Design",
  "weeks": "10–14 weeks",
  "tag": "Architecture thinking",
  "summary": "Practice turning a vague product request into a system diagram, explicit trade-offs, and an operationally realistic design.",
  "tags": [
   "APIs",
   "Scale",
   "Observability"
  ],
  "steps": [
   {
    "title": "Draw the boundaries",
    "desc": "Describe a service’s users, inputs, outputs, dependencies, and failure paths.",
    "label": "System Design Primer",
    "href": "https://github.com/donnemartin/system-design-primer"
   },
   {
    "title": "Choose the trade-off",
    "desc": "Compare simple architecture options using latency, cost, consistency, and team complexity.",
    "label": "Designing Data-Intensive Apps",
    "href": "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/"
   },
   {
    "title": "Operate the design",
    "desc": "Draft useful service-level indicators, logs, and runbook steps for a fictional service.",
    "label": "Google SRE book",
    "href": "https://sre.google/sre-book/table-of-contents/"
   }
  ]
 }
];
