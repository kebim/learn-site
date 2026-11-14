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
const SITE={counter:"learn",counterUrl:"" /* paste your Cloudflare Worker URL here */,learn:"https://learn.mibekpandey.com.np",tech:"https://tech.mibekpandey.com.np"};
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

/* ===== MORE LESSONS (same format; you can also move these into the lists above) ===== */
COURSES[0].lessons.push({id:"linux-scripting",title:"Shell scripting basics",html:`<p>A shell script is a text file of commands. Automating repeated tasks is the heart of Linux administration.</p>
<pre>#!/usr/bin/env bash
set -euo pipefail          # stop on errors and unset variables

backup_dir="/var/backups/site"
mkdir -p "$backup_dir"

for f in /etc/nginx/*.conf; do
  if [ -r "$f" ]; then
    cp "$f" "$backup_dir/$(basename "$f").$(date +%F)"
    echo "saved $f"
  fi
done</pre>
<h3>Building blocks</h3><p>Variables are set as <code>name="value"</code> and read as <code>$name</code>. Tests use <code>[ -f file ]</code> or <code>[ "$a" = "$b" ]</code>. Loops are <code>for</code> and <code>while</code>. Every command returns an exit code: 0 means success, anything else is a failure, and <code>$?</code> holds the last one.</p>
<h3>Good habits</h3><p>Quote your variables, start with <code>set -euo pipefail</code>, test on a copy of your data, and run <code>chmod +x script.sh</code> before executing it with <code>./script.sh</code>.</p>`});
COURSES[1].lessons.push({id:"logic-counters",title:"Registers and counters",html:`<p>Flip-flops chained together become the registers and counters that give every CPU its memory and timing.</p>
<h3>Shift register</h3><p>D flip-flops in a row, each output feeding the next input. On every clock edge the stored bits move one place along. Four flip-flops hold 4 bits and can convert serial data into parallel data.</p>
<h3>Ripple counter</h3><p>T flip-flops with T=1, where each one clocks the next. Q0 toggles every clock, Q1 every 2 clocks, Q2 every 4, so the outputs count in binary. N flip-flops count from 0 to 2<sup>N</sup> - 1.</p>
<table><tr><th>Clock</th><th>Q2</th><th>Q1</th><th>Q0</th></tr><tr><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr><td>1</td><td>0</td><td>0</td><td>1</td></tr><tr><td>2</td><td>0</td><td>1</td><td>0</td></tr><tr><td>3</td><td>0</td><td>1</td><td>1</td></tr><tr><td>4</td><td>1</td><td>0</td><td>0</td></tr></table>
<h3>Modulo-N counter</h3><p>To count 0 to 9 (mod-10) with 4 flip-flops, detect the value 10 (1010) with a NAND gate and use it to reset all flip-flops. In a ripple counter each stage adds propagation delay, which limits the maximum clock speed.</p>`});
COURSES[2].lessons.push({id:"arch-twos",title:"Number systems and two's complement",html:`<p>Computers store integers as fixed-width bit patterns, so the width decides what values fit.</p>
<h3>Unsigned</h3><p>N bits represent 0 to 2<sup>N</sup> - 1. With 8 bits that is 0 to 255.</p>
<h3>Two's complement</h3><p>For signed numbers the top bit has a negative weight of -2<sup>N-1</sup>. The range is -2<sup>N-1</sup> to 2<sup>N-1</sup> - 1, so 8 bits cover -128 to 127. To negate a number, invert every bit and add 1.</p>
<pre>+18 = 00010010
invert 11101101
add 1  11101110   = -18  (hex EE)</pre>
<h3>Why it won</h3><p>Addition works identically for signed and unsigned values, and there is only one zero, so the same adder circuit serves both.</p>
<h3>Overflow</h3><p>In 8 bits, 127 + 1 gives 10000000, which reads as -128. Overflow happens when two operands of the same sign give a result of the opposite sign.</p>
<p>Check any value with the two's complement tool on the <a href="${TOOLS_URL}#twos">tech site</a>.</p>`});
COURSES[3].lessons.push({id:"os-paging",title:"Paging and virtual memory",html:`<p>Virtual memory gives each process its own private address space. Memory is cut into fixed-size <b>pages</b> (commonly 4 KB) that the OS maps to physical <b>frames</b> using a page table.</p>
<h3>Address translation</h3><p>A virtual address is a page number plus an offset. With 4 KB pages the offset is 12 bits. Take address <code>0x3A7C</code>: page 3, offset <code>0xA7C</code>. If the page table maps page 3 to frame 9, the physical address is <code>9 x 4096 + 0xA7C = 0x9A7C</code>.</p>
<h3>Page faults</h3><p>If a page's valid bit is 0, the CPU raises a page fault. The OS loads the page from disk, updates the table and restarts the instruction.</p>
<h3>The TLB</h3><p>The translation lookaside buffer caches recent translations. A hit costs about one cycle; a miss means walking the page table in memory.</p>
<h3>Replacement example</h3><p>FIFO with 3 frames and references 1 2 3 4 1 2: pages 1, 2 and 3 fault while filling the frames, 4 evicts 1, then 1 evicts 2, then 2 evicts 3. All 6 references fault.</p>`});
/* ===== NEPALI VERSIONS (study materials only) =====
   Add a lesson id with {title, html} to NE and a Nepali toggle appears on that lesson.
   Lessons without an entry show English with a "coming soon" note. ===== */
const NE={
"linux-fs":{title:"फाइलसिस्टमको बनावट",html:`<p>Linux ले सबै कुरालाई एउटै रुट <code>/</code> मुनि व्यवस्थित गर्छ। कुन कुरा कहाँ हुन्छ भन्ने जान्नु नै एडमिनको पहिलो सीप हो।</p>
<table><tr><th>पाथ</th><th>के हुन्छ</th></tr><tr><td><code>/etc</code></td><td>सिस्टमको कन्फिगरेसन</td></tr><tr><td><code>/var</code></td><td>लग र परिवर्तन भइरहने डाटा</td></tr><tr><td><code>/home</code></td><td>प्रयोगकर्ताका फाइलहरू</td></tr><tr><td><code>/usr</code></td><td>स्थापना गरिएका प्रोग्रामहरू</td></tr><tr><td><code>/proc</code></td><td>कर्नेल र प्रोसेसको लाइभ जानकारी</td></tr></table>
<h3>आफैं प्रयास गर्नुहोस्</h3><pre>ls -l /etc | head
df -h
du -sh /var/log</pre>
<p><code>df -h</code> ले डिस्कमा कति ठाउँ बाँकी छ देखाउँछ, र <code>du -sh</code> ले कुनै फोल्डरले कति ठाउँ लिएको छ देखाउँछ।</p>`},
"logic-gates":{title:"गेट र ट्रुथ टेबल",html:`<p>डिजिटल सर्किटले 0 र 1 मात्र प्रयोग गर्छन्। हरेक सर्किट केही आधारभूत गेटबाट बनेको हुन्छ।</p>
<table><tr><th>A</th><th>B</th><th>AND</th><th>OR</th><th>XOR</th><th>NAND</th></tr><tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td></tr><tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td></tr></table>
<p>NAND गेट <em>युनिभर्सल</em> हुन्छ: अरू जुनसुकै गेट NAND बाट मात्र बनाउन सकिन्छ।</p>
<h3>सजिलो सम्झना</h3><p>AND: दुवै इनपुट 1 भए मात्र आउटपुट 1। OR: कुनै एक इनपुट 1 भए आउटपुट 1। XOR: इनपुट फरक भए आउटपुट 1। NAND: AND को उल्टो।</p>`},
"arch-cycle":{title:"फेच-डिकोड-एक्जिक्युट चक्र",html:`<p>हरेक CPU ले यी तीन चरण निरन्तर दोहोर्याउँछ:</p>
<ol><li><b>फेच (Fetch):</b> प्रोग्राम काउन्टर (PC) मा भएको ठेगानाबाट निर्देशन ल्याउने।</li><li><b>डिकोड (Decode):</b> निर्देशनले के गर्ने र कुन डाटा प्रयोग गर्ने भनेर बुझ्ने।</li><li><b>एक्जिक्युट (Execute):</b> निर्देशन चलाउने, नतिजा लेख्ने र PC अपडेट गर्ने।</li></ol>
<p>पाइपलाइनिङले यी चरणहरूलाई एकैसाथ ओभरल्याप गर्छ, जसले गर्दा हरेक क्लक साइकलमा नयाँ निर्देशन सुरु हुन्छ।</p>`}
};
/* ===== DEEPER SECTIONS appended to existing lessons (id: html) ===== */
const EXTRA={
"linux-perms":`<h3>Default permissions: umask</h3><p>New files start from 666 and new directories from 777, minus the <code>umask</code>. With the common umask <code>022</code>, files become 644 and directories 755.</p>
<h3>Special bits</h3><p><b>setuid</b> (4000) runs a program as its owner, which is how <code>passwd</code> can edit protected files. <b>sticky</b> (1000) on a shared directory such as <code>/tmp</code> lets users delete only their own files. Setgid (2000) on a directory makes new files inherit its group.</p>
<h3>Common mistakes</h3><p>Using <code>chmod 777</code> to "fix" an error hides the real problem and lets anyone modify the file. Find out which user runs the service with <code>ps aux</code>, then give <em>that</em> user the minimum access it needs.</p>
<h3>Practice</h3><p>1. What mode gives the owner full access, the group read and execute, and others nothing?</p><details><summary>Show answer</summary><p><code>750</code>: 7 = rwx, 5 = r-x, 0 = none.</p></details>
<p>2. What does <code>ls -l</code> show as <code>-rw-r--r--</code> in octal?</p><details><summary>Show answer</summary><p><code>644</code>.</p></details>`,
"os-sched":`<h3>Worked example: round robin</h3><p>Processes P1=5, P2=3, P3=1, all arriving at 0, quantum 2. Order of execution: P1(2) P2(2) P3(1, finishes at 5) P1(2) P2(1, finishes at 8) P1(1, finishes at 9). Turnaround times are 9, 8 and 5; waiting times are 4, 5 and 4 (turnaround minus burst), average waiting 4.33.</p>
<h3>Choosing an algorithm</h3><p>Batch systems favour throughput (SJF). Interactive systems favour response time (round robin with a quantum of about 10 to 100 ms). Real systems such as Linux use priority-based schedulers that adjust to behaviour.</p>
<h3>Practice</h3><p>Three jobs with bursts 8, 4 and 2 arrive together. What is the average waiting time under FCFS in that order?</p><details><summary>Show answer</summary><p>Waits are 0, 8 and 12, so the average is 20 / 3 = 6.67. Under SJF (2, 4, 8) it is (0 + 2 + 6) / 3 = 2.67.</p></details>
<p>Try these numbers in the <a href="${TOOLS_URL}#sched">scheduling simulator</a>.</p>`
};
COURSES.forEach(c=>c.lessons.forEach(l=>{if(NE[l.id])l.ne=NE[l.id];if(EXTRA[l.id])l.html+=EXTRA[l.id]}));

COURSES[1].lessons.push({id:"logic-build",title:"Designing and testing a circuit",html:`<p>Every digital design follows the same loop: describe the behaviour, write the truth table, derive an expression, draw the gates, then test every input combination. You can practise the whole loop in the <a href="${TOOLS_URL}#builder">circuit builder</a> on the tech site.</p>
<h3>Step 1: Describe and tabulate</h3><p>Take a half adder, which adds two single bits. It needs two outputs: a sum bit S and a carry bit C.</p>
<table><tr><th>A</th><th>B</th><th>C (carry)</th><th>S (sum)</th></tr><tr><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>0</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td><td>0</td></tr></table>
<h3>Step 2: Find the expressions</h3><p>The sum is 1 when the inputs differ, so <code>S = A XOR B</code>. The carry is 1 only when both inputs are 1, so <code>C = A AND B</code>.</p>
<h3>Step 3: Build it</h3><ol><li>Open the <a href="${TOOLS_URL}#builder">Build yourself</a> tool and press Clear board.</li><li>Add two Switches, one XOR gate, one AND gate and two Lamps.</li><li>Drag a wire from each switch's output dot to an input pin on both gates.</li><li>Connect the XOR output to one lamp (S) and the AND output to the other (C).</li></ol>
<h3>Step 4: Test every row</h3><p>Set the switches to all four combinations and compare the builder's truth table with yours. A circuit can match three rows and still fail the fourth, so never test just one case.</p>
<h3>Debugging checklist</h3><p>An unconnected input pin counts as 0, so a lamp that never lights often means a missing wire. Each input pin accepts only one wire. If a wire loops back to an earlier gate you have created feedback, and the circuit now has memory, as in the SR latch example.</p>
<h3>Practice</h3><p>1. How many NAND gates are needed to build an XOR gate?</p><details><summary>Show answer</summary><p>Four. Load the "XOR from NAND" example in the builder to see them.</p></details>
<p>2. An alarm sounds when the door is open and the system is armed, or when the panic button is pressed. Write the expression and count the truth table rows.</p><details><summary>Show answer</summary><p><code>Y = A\u00b7B + P</code>. Three inputs give 2<sup>3</sup> = 8 rows.</p></details>
<p>You can also explore each gate first in the <a href="${TOOLS_URL}#sim">logic simulator</a>.</p>`});
const QUIZ={
"linux-fs":{q:"Where do system logs normally live?",o:["/etc","/var","/proc"],a:1,why:"/var holds changing data such as logs. /etc holds configuration."},
"linux-perms":{q:"What does chmod 640 give the group?",o:["Read only","Read and write","Nothing"],a:0,why:"6 = rw for the owner, 4 = r for the group, 0 = nothing for others."},
"linux-services":{q:"Which command shows a service's recent logs?",o:["systemctl enable","journalctl -u name","ps aux"],a:1,why:"journalctl -u reads the systemd journal for one unit."},
"linux-scripting":{q:"Why start a script with set -euo pipefail?",o:["It runs faster","It stops on errors and unset variables","It hides output"],a:1,why:"Failing early prevents a script continuing with bad data."},
"logic-gates":{q:"Which single gate type can build any other gate?",o:["AND","XOR","NAND"],a:2,why:"NAND is universal."},
"logic-bool":{q:"Simplify A + A\u00b7B.",o:["A","B","A\u00b7B"],a:0,why:"Absorption law: A(1 + B) = A."},
"logic-ff":{q:"Which flip-flop toggles when both inputs are 1?",o:["SR","JK","D"],a:1,why:"JK with J=K=1 toggles. SR with S=R=1 is invalid."},
"logic-kmap":{q:"Why are K-map axes labelled 00, 01, 11, 10?",o:["Gray code: neighbours differ by one bit","Alphabetical order","It saves space"],a:0,why:"One-bit changes between neighbours make groups simplify."},
"logic-adder":{q:"A half adder's carry output equals:",o:["A XOR B","A AND B","A OR B"],a:1,why:"Carry is 1 only when both bits are 1."},
"logic-build":{q:"Why test every row of the truth table?",o:["It makes the circuit faster","A circuit can match some rows and still fail others","Gates wear out"],a:1,why:"Bugs often hide in a single input combination."},
"logic-counters":{q:"How many flip-flops do you need to count 0 to 9?",o:["3","4","10"],a:1,why:"3 give 8 states, 4 give 16, so 4 is the minimum."},
"arch-cycle":{q:"Which register holds the address of the next instruction?",o:["Program counter","Stack pointer","ALU"],a:0,why:"The PC is updated after each fetch."},
"arch-memory":{q:"Why do caches speed programs up?",o:["Locality of reference","They hold the OS","They are bigger than RAM"],a:0,why:"Programs reuse nearby data, so small fast memory is enough."},
"arch-pipeline":{q:"Forwarding mainly fixes which hazard?",o:["Structural","Data","Control"],a:1,why:"It sends a result straight from the ALU to the next instruction."},
"arch-isa":{q:"Which is a RISC instruction set?",o:["x86-64","RISC-V","Neither"],a:1,why:"x86-64 is CISC. RISC-V and ARM are RISC."},
"arch-twos":{q:"8-bit two's complement 11111111 equals:",o:["255","-1","-127"],a:1,why:"Invert to 00000000, add 1 to get 1, so the value is -1."},
"os-sched":{q:"Which algorithm gives the lowest average waiting time?",o:["FCFS","SJF","Round robin"],a:1,why:"Shortest job first is optimal for average waiting time."},
"os-paging":{q:"With 4 KB pages, how many bits is the offset?",o:["10","12","16"],a:1,why:"4 KB = 2^12 bytes, so 12 bits address inside a page."}
};
const PAGES={
 notes:{title:"Notes",html:`<p>Short study notes that do not need a full lesson. Add yours here in <code>PAGES.notes</code>.</p><h3>Write what you did</h3><p>After each session, record the command you ran, what you expected and what happened. A personal command glossary becomes your fastest reference.</p><h3>Work in small stages</h3><p>Pick one stage of one roadmap, build a small lab, write down the result, then continue.</p>`}
};
const MENU=[
 {title:"Learn",children:COURSES.map(c=>({title:c.title,children:c.lessons.map(l=>({title:l.title,id:l.id}))}))},
 {title:"Roadmaps",id:"roadmaps"},
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
