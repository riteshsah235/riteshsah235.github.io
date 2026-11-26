(function(){
const c=document.getElementById('moon'),x=c.getContext('2d');
let S=0,pts=[],t=0;
function noise(a,b,cc){return Math.sin(a*7.1+b*3.3)*Math.sin(b*6.2-cc*4.1)*Math.sin(cc*5.3+a*2.2)}
function build(){
 const N=innerWidth<820?14000:26000;pts=[];const g=Math.PI*(3-Math.sqrt(5));
 const craters=[];for(let i=0;i<34;i++){const u=Math.random()*2-1,a=Math.random()*6.283,r=Math.sqrt(1-u*u);craters.push([Math.cos(a)*r,u,Math.sin(a)*r,.07+Math.random()*.2])}
 for(let i=0;i<N;i++){const y=1-(i/(N-1))*2,r=Math.sqrt(1-y*y),th=g*i;
  const px=Math.cos(th)*r,pz=Math.sin(th)*r;let h=.55+.55*noise(px*1.3,y*1.3,pz*1.3)+.18*noise(px*3.1,y*3.1,pz*3.1);
  for(const k of craters){const d=Math.hypot(px-k[0],y-k[1],pz-k[2]);if(d<k[3])h*=.25+.75*(d/k[3]);if(Math.abs(d-k[3])<.015)h+=.5}
  pts.push([px,y,pz,Math.max(0,Math.min(1,h)),Math.random()])}}
function size(){const d=Math.min(devicePixelRatio||1,2);S=c.clientWidth;c.width=c.height=S*d;x.setTransform(d,0,0,d,0,0)}
function render(){
 x.clearRect(0,0,S,S);
 const R=S*.43,cx=S/2,cy=S*.46,ca=Math.cos(t),sa=Math.sin(t),tilt=.35,ct=Math.cos(tilt),st=Math.sin(tilt);
 for(const p of pts){
  let X=p[0]*ca+p[2]*sa,Z=-p[0]*sa+p[2]*ca,Y=p[1];
  const Y2=Y*ct-Z*st,Z2=Y*st+Z*ct;
  if(Z2<0)continue;
  const lit=Math.pow(Math.max(0,.6*-X+.55*-Y2+.5*Z2),.7);
  if(p[4]>.25+p[3]*1.1)continue;const v=lit*(.1+p[3]*p[3]*1.4);if(v<.04)continue;
  const a=Math.min(1,.3+v*1.2);
  x.fillStyle='rgba('+(120+v*110|0)+','+(170+v*70|0)+',255,'+a.toFixed(2)+')';
  const s=(.9+Z2*.7)*(S/900)+.4;
  x.fillRect(cx+X*R,cy+Y2*R,s,s)}
 x.strokeStyle='rgba(120,190,255,.25)';x.lineWidth=1;x.beginPath();x.arc(cx,cy,R,0,6.283);x.stroke()}
let vis=true,py=0,mx=0;new IntersectionObserver(e=>{vis=e[0].isIntersecting}).observe(document.querySelector('.hero'));
function loop(){if(vis){t+=.0016+mx*.0006;render()}requestAnimationFrame(loop)}
addEventListener('scroll',()=>{py=Math.min(scrollY,innerHeight);c.style.translate='0 '+(-py*.18)+'px'},{passive:true});
addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5)*2},{passive:true});
build();size();addEventListener('resize',()=>{size();render()});
if(location.search.includes('static')||matchMedia('(prefers-reduced-motion: reduce)').matches){t=1.2;render()}else requestAnimationFrame(loop);
const links=[...document.querySelectorAll('.pill a')];
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('on',l.dataset.s===e.target.id))}})},{rootMargin:'-40% 0px -50% 0px'});
['works','about','skills','contact'].forEach(id=>io.observe(document.getElementById(id)));

document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{
 document.querySelectorAll('.filters button').forEach(x=>x.classList.toggle('on',x===b));
 const f=b.dataset.f;document.querySelectorAll('.chip').forEach(c=>c.classList.toggle('off',f!=='all'&&!c.dataset.g.split(' ').includes(f)))});
const API='https://github-contributions-api.jogruber.de/v4/riteshsah235?y=last';
function drawHeat(d,label){
 const box=document.getElementById('blocks');box.innerHTML='';
 const days=d.contributions;if(!days||!days.length)throw new Error('empty');
 const first=new Date(days[0].date+'T00:00:00Z').getUTCDay();
 const cells=[];for(let i=0;i<first;i++)cells.push(null);days.forEach(x=>cells.push(x));
 const weeks=Math.ceil(cells.length/7),parts=innerWidth<820?2:1,per=Math.ceil(weeks/parts);
 let lastM=-1;
 for(let p=0;p<parts;p++){
  const w0=p*per,w1=Math.min(weeks,w0+per),n=w1-w0;
  const blk=document.createElement('div');blk.className='blk';
  const mo=document.createElement('div');mo.className='months';
  const g=document.createElement('div');g.className='heat';g.style.setProperty('--cols',per);
  for(let k=w0*7;k<Math.min(cells.length,w1*7);k++){
   const x=cells[k],e=document.createElement('i');
   if(!x){e.style.visibility='hidden'}else{
    e.className='l'+x.level;e.style.setProperty('--c',k/7|0);
    e.dataset.tip=x.count+' contribution'+(x.count==1?'':'s')+' on '+new Date(x.date+'T00:00:00Z').toLocaleDateString('en',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'});
    const dt=new Date(x.date+'T00:00:00Z'),m=dt.getUTCMonth();
    if(m!==lastM&&dt.getUTCDate()<=7){const s=document.createElement('span');s.textContent=dt.toLocaleString('en',{month:'short',timeZone:'UTC'});s.style.left=(((k/7|0)-w0)/per*100)+'%';mo.appendChild(s);lastM=m}
   }
   g.appendChild(e)}
  blk.append(mo,g);box.appendChild(blk)}
 const tot=days.reduce((a,x)=>a+x.count,0);
 document.getElementById('totalnum').textContent=tot.toLocaleString('en');
 document.getElementById('total').textContent='contributions in the last year';
 document.getElementById('src').textContent=label;
 box.querySelectorAll('.heat').forEach(g=>hio.observe(g))}
const tip=document.createElement('div');tip.className='tip';document.body.appendChild(tip);
document.addEventListener('pointermove',e=>{const t=e.target.closest&&e.target.closest('.heat i[data-tip]');if(!t){tip.style.opacity=0;return}tip.textContent=t.dataset.tip;tip.style.opacity=1;tip.style.left=Math.min(innerWidth-tip.offsetWidth-8,Math.max(8,e.clientX-tip.offsetWidth/2))+'px';tip.style.top=(e.clientY-40)+'px'},{passive:true});
fetch('contrib.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw 0;return r.json()}).then(d=>{if(!d.generated_at)throw 0;const t=new Date(d.generated_at).toLocaleString('en',{day:'numeric',month:'short',year:'numeric',hour:'numeric',minute:'2-digit',timeZone:'Asia/Kolkata'});drawHeat(d,'Source: github.com/riteshsah235 public contribution graph. Updated hourly by a GitHub Action. Last update: '+t+' IST.')})
.catch(()=>fetch(API).then(r=>{if(!r.ok)throw 0;return r.json()}).then(d=>drawHeat(d,'Snapshot feed from github-contributions-api.jogruber.de. It is cached and the latest days can lag.')).catch(()=>{document.getElementById('total').textContent='Contribution data is unavailable right now.'}));

/* reveal on scroll */
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('[data-reveal]>*,.grid>.card').forEach((el,i)=>{el.style.setProperty('--i',[...el.parentNode.children].indexOf(el))});
const rio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rio.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('[data-reveal],.grid').forEach(el=>rio.observe(el));
const hio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in')}}),{threshold:.2});

/* card spotlight */
document.querySelectorAll('[data-card]').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')}));
/* sliding nav indicator */
const pill=document.querySelector('.pill'),ind=pill.querySelector('.ind');
function moveInd(){const a=pill.querySelector('a.on');if(!a){ind.style.width='0';return}ind.style.width=a.offsetWidth+'px';ind.style.transform='translateX('+a.offsetLeft+'px)'}
new MutationObserver(moveInd).observe(pill,{subtree:true,attributes:true,attributeFilter:['class']});addEventListener('resize',moveInd);

/* about: generated halftone moon glyph (original artwork) + local time */
(function(){const cv=document.getElementById('glyph');if(!cv)return;const x=cv.getContext('2d');let vis=true,t=0;
function fit(){const r=cv.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);cv.width=r.width*d;cv.height=r.height*d;draw()}
function draw(){const W=cv.width,H=cv.height;x.clearRect(0,0,W,H);const step=Math.max(6,W/38),R=Math.min(W,H)*.44,cx=W/2,cy=H*.5;
 const lx=Math.cos(t)*.8,ly=-.45;
 for(let gy=step/2;gy<H;gy+=step)for(let gx=step/2;gx<W;gx+=step){const dx=(gx-cx)/R,dy=(gy-cy)/R,d2=dx*dx+dy*dy;let v;
  if(d2<=1){const z=Math.sqrt(1-d2),l=Math.max(0,dx*lx+dy*ly+z*.6);const n=Math.sin(dx*9+1)*Math.cos(dy*8)*.12+Math.sin(dx*21)*Math.sin(dy*17)*.06;v=Math.min(1,l*.95+n)}
  else{v=Math.max(0,.22-(Math.sqrt(d2)-1)*.9)*.5;}
  if(v<.06)continue;x.fillStyle=`rgba(${170+v*85|0},${215+v*40|0},255,${.35+v*.65})`;x.beginPath();x.arc(gx,gy,step*.46*v+.5,0,6.283);x.fill()}}
fit();addEventListener('resize',fit);
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){new IntersectionObserver(e=>{vis=e[0].isIntersecting}).observe(cv);(function l(){if(vis){t+=.012;draw()}requestAnimationFrame(l)})()}
const lt=document.getElementById('lt');function tick(){lt.textContent=new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:true,timeZone:'Asia/Kolkata'}).toUpperCase()}tick();setInterval(tick,15000)})();
})();
