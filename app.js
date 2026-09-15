const projects=[
 {id:'cricket',cat:['analytics','bi'],title:"ICC Men's Cricket World Cup 2023 Analytics",meta:'SAS ANALYTICS · SPORTS DATA',img:'assets/projects/cricket.webp',desc:'Sports analytics dashboard analysing 312 matches, 25.6K runs and 842 wickets across 120 players.',chips:['SAS','Data Analysis','Reporting'],url:'https://sasproject2023.netlify.app/',details:'Analysed batting and bowling performance, match trends and dismissal patterns during the SAS Institute internship.'},
 {id:'portfolio',cat:['bi'],title:'3D Personal Portfolio',meta:'WEB · INTERACTIVE EXPERIENCE',img:'assets/projects/portfolio.webp',desc:'An interactive portfolio concept where real project thumbnails become a responsive 3D data universe.',chips:['HTML','CSS','JavaScript','Three.js'],url:'#home',details:'Interactive portfolio architecture with WebGL project cards, mouse parallax, scroll-linked motion and responsive fallback.'},
 {id:'india',cat:['ai'],title:'Incredible India AI',meta:'AI-POWERED TOURISM PLATFORM',img:'assets/projects/india-ai.webp',desc:'AI travel assistant covering 28 states, 140+ destinations and 40 UNESCO sites with voice and live weather capabilities.',chips:['Spring Boot','JavaScript','Groq AI','Web Speech API'],url:'https://incredibleindia-ai-2.onrender.com/',details:'Built a recommendation engine, voice-assisted guide and weather layer designed to turn trip planning into a short conversational workflow.'},
 {id:'forecast',cat:['ai','forecast'],title:'AI-Driven Demand Forecasting',meta:'MBA FINAL PROJECT · AI / FORECASTING',img:'assets/projects/forecasting.webp',desc:'128,975 Amazon India sales transactions analysed for demand forecasting and inventory planning. ARIMA and Prophet models evaluated with MAE and RMSE.',chips:['Python','ARIMA','Prophet','Time Series'],url:'https://mbafinalproject.netlify.app/',details:'Compared ARIMA and Prophet forecasting approaches, revealing 30.74% lower MAE for single-category forecasting and a three-category tipping point in model performance.'},
 {id:'aml',cat:['aml','analytics'],title:'AML/KYC Compliance Analytics Platform',meta:'RISK · COMPLIANCE · ANALYTICS',img:'assets/projects/aml-kyc.webp',desc:'End-to-end AML/KYC framework covering CDD, EDD, transaction monitoring, risk scoring and SAR workflows.',chips:['Python','Power BI','AML/KYC','Risk'],url:'https://amlkycproject2122.netlify.app/',details:'Modelled 12,842 customers, 3,256 high-risk customers and 245 SARs at a 94% compliance score using PaySim transaction data and a policy framework aligned to FATF and PMLA 2002.'},
 {id:'sales',cat:['analytics','bi'],title:'Global Sales Performance Dashboard',meta:'TABLEAU · BUSINESS INTELLIGENCE',img:null,desc:'Interactive Tableau dashboard surfacing ₹6M+ revenue across six countries and 22 products with KPI, shipment and drill-down analysis.',chips:['Tableau','KPI Dashboards','Visual Storytelling'],url:'https://public.tableau.com/',details:'Designed a business-facing dashboard to turn recurring sales reviews into a faster, filterable decision workflow.'},
 {id:'smartserve',cat:['ai','bi'],title:'SmartServe AI Workflow Automation',meta:'AI WORKFLOW · OPERATIONS',img:null,desc:'AI-powered workflow and ticket management system designed in Notion with automated routing rules and a single operational view.',chips:['Notion','AI Workflow','Automation','Process Management'],url:'#projects',details:'Designed an operational workflow for ticket routing and process visibility, reducing manual triage steps.'},
 {id:'agentforce',cat:['ai'],title:'Salesforce Agentforce Learning Project',meta:'CRM · AI AGENTS',img:null,desc:'Salesforce Trailhead Agentforce learning path covering AI agent design, CRM automation, workflow integration and AI guardrails.',chips:['Salesforce','Agentforce','CRM','AI Guardrails'],url:'https://salesforce.com/trailblazer/rohansaipavan2122',details:'Completed the Agentforce path with 6 badges and 1,400+ points.'}
];

const canvas=document.getElementById('webgl');
const scene=new THREE.Scene();
scene.fog=new THREE.FogExp2(0x03050b,.065);
const camera=new THREE.PerspectiveCamera(45,innerWidth/innerHeight,.1,100);
camera.position.set(0,0,10);
const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;
scene.add(new THREE.AmbientLight(0x5b73b5,1.2));
const key=new THREE.PointLight(0x4b8dff,70,28);key.position.set(3,4,5);scene.add(key);
const violet=new THREE.PointLight(0x8b5cf6,55,25);violet.position.set(-5,-2,2);scene.add(violet);
const red=new THREE.PointLight(0xff365c,35,20);red.position.set(5,-4,-2);scene.add(red);

const group=new THREE.Group();scene.add(group);
const loader=new THREE.TextureLoader();
const positions=[[-3.9,2.1,-.8,-.08,-.22],[3.6,2.1,-1.5,.07,.18],[-4.1,-2.0,-1.2,.04,.25],[3.8,-1.9,-.7,-.06,-.18],[0,3.6,-2.8,.03,.1]];
const colors=[0x3d8bff,0x8b5cf6,0xffb72b,0x9a65ff,0xff4b62,0x5d8fff];
const cards=[];
function makeCard(p,i){
 const g=new THREE.Group();g.position.set(p[0],p[1],p[2]);g.rotation.set(p[3],p[4],(i%2?-.035:.035));
 const tex=loader.load(projects[i%projects.length].img);tex.colorSpace=THREE.SRGBColorSpace;
 const geo=new THREE.PlaneGeometry(4.15,2.72,1,1);const mat=new THREE.MeshBasicMaterial({map:tex,transparent:true,side:THREE.DoubleSide});const mesh=new THREE.Mesh(geo,mat);g.add(mesh);
 const frame=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(4.24,2.81,.05)),new THREE.LineBasicMaterial({color:colors[i%colors.length],transparent:true,opacity:.8}));frame.position.z=.03;g.add(frame);
 const glow=new THREE.Mesh(new THREE.PlaneGeometry(4.4,2.95),new THREE.MeshBasicMaterial({color:colors[i%colors.length],transparent:true,opacity:.055,side:THREE.DoubleSide}));glow.position.z=-.05;g.add(glow);
 g.userData={baseY:p[1],phase:i*.8,speed:.45+i*.035};group.add(g);cards.push(g);
}
for(let i=0;i<positions.length;i++)makeCard(positions[i],i);

// particles
const count=650;const arr=new Float32Array(count*3);for(let i=0;i<count;i++){arr[i*3]=(Math.random()-.5)*18;arr[i*3+1]=(Math.random()-.5)*11;arr[i*3+2]=(Math.random()-.5)*12-3}
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(arr,3));const pm=new THREE.PointsMaterial({color:0x6f9dff,size:.025,transparent:true,opacity:.7});scene.add(new THREE.Points(pg,pm));
// data rings
for(let i=0;i<3;i++){const ring=new THREE.Mesh(new THREE.TorusGeometry(2.7+i*1.2,.008,8,120),new THREE.MeshBasicMaterial({color:i===1?0x8b5cf6:0x2f72ff,transparent:true,opacity:.32}));ring.rotation.x=Math.PI/2;ring.position.z=-4-i*.4;scene.add(ring)}

let mx=0,my=0,scroll=0;window.addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5);my=(e.clientY/innerHeight-.5)});window.addEventListener('scroll',()=>scroll=scrollY);
const clock=new THREE.Clock();
function animate(){requestAnimationFrame(animate);const t=clock.getElapsedTime();
 group.rotation.y += ((mx*.08)-group.rotation.y)*.018;group.rotation.x += ((-my*.045)-group.rotation.x)*.018;
 camera.position.x += ((mx*.55)-camera.position.x)*.015;camera.position.y += ((-my*.35)-camera.position.y)*.015;camera.lookAt(0,0,0);
 cards.forEach((c,i)=>{c.position.y=c.userData.baseY+Math.sin(t*c.userData.speed+c.userData.phase)*.11;c.rotation.y+=Math.sin(t*.25+i)*.0007;c.rotation.x+=Math.cos(t*.21+i)*.00035});
 renderer.render(scene,camera)}animate();
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.7))});

// DOM project cards
const grid=document.getElementById('projectGrid');
function renderProjects(filter='all'){grid.innerHTML='';projects.forEach((p)=>{if(filter!=='all'&&!p.cat.includes(filter))return;const el=document.createElement('article');el.className='project-card glass';el.dataset.cat=p.cat.join(' ');el.innerHTML=`${p.img?`<div class="project-img"><img src="${p.img}" alt="${p.title}" loading="lazy"></div>`:`<div class="project-img placeholder"><div><span>AI / DATA</span><b>${p.id==='smartserve'?'WORKFLOW AUTOMATION':'CRM · AI AGENTS'}</b></div></div>`}<div class="project-body"><div class="project-meta"><span>${p.meta}</span><span>VIEW ↗</span></div><h3>${p.title}</h3><p>${p.desc}</p><div class="chips">${p.chips.map(x=>`<b>${x}</b>`).join('')}</div></div>`;el.addEventListener('click',()=>openModal(p));grid.appendChild(el)})}
renderProjects();
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderProjects(btn.dataset.filter)}));
const modal=document.getElementById('modal'),modalContent=document.getElementById('modalContent');
function openModal(p){modalContent.innerHTML=`${p.img?`<img src="${p.img}" alt="${p.title}">`:''}<div class="project-meta"><span>${p.meta}</span></div><h2>${p.title}</h2><p>${p.details}</p><div class="chips">${p.chips.map(x=>`<b>${x}</b>`).join('')}</div><div class="modal-links"><a class="btn primary" href="${p.url}" target="_blank" rel="noreferrer">Open project ↗</a><a class="btn ghost" href="#projects" onclick="closeModal()">Back to projects</a></div>`;modal.classList.add('open');document.body.style.overflow='hidden'}
function closeModal(){modal.classList.remove('open');document.body.style.overflow=''}window.closeModal=closeModal;document.getElementById('modalClose').onclick=closeModal;modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

// nav
const menuBtn=document.getElementById('menuBtn'),nav=document.getElementById('nav');menuBtn.onclick=()=>nav.classList.toggle('open');nav.querySelectorAll('a').forEach(a=>a.onclick=()=>nav.classList.remove('open'));
// reveal motion
if(window.gsap){gsap.utils.toArray('.reveal').forEach((el,i)=>gsap.to(el,{opacity:1,y:0,duration:1.1,delay:.7+i*.08,ease:'power3.out'}));gsap.utils.toArray('.content-section,.projects-section').forEach(sec=>{gsap.from(sec.querySelectorAll('.section-kicker,.section-head'),{scrollTrigger:undefined});});}
window.addEventListener('load',()=>{setTimeout(()=>{const l=document.getElementById('loader');l.style.opacity='0';setTimeout(()=>l.remove(),650)},450)});

