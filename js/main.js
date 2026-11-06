(function(){
var d=document;
var root=d.documentElement,rm=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
var held=[];
try{sessionStorage.setItem('arb_intro','1')}catch(e){}
var io='IntersectionObserver'in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'}):null;
function obs(el){
 if(!io){el.classList.add('in');return}
 if(root.classList.contains('ld')&&el.closest('.hero')){held.push(el);return}
 io.observe(el)}
function words(el){
 var n=0;
 (function walk(node){
  Array.prototype.slice.call(node.childNodes).forEach(function(c){
   if(c.nodeType===3){
    var fr=d.createDocumentFragment();
    c.textContent.split(/(\s+)/).forEach(function(p){
     if(!p)return;
     if(/^\s+$/.test(p)){fr.appendChild(d.createTextNode(' '));return}
     var w=d.createElement('span'),i=d.createElement('span');
     w.className='w';i.className='wi';i.textContent=p;i.style.setProperty('--i',n++);
     w.appendChild(i);fr.appendChild(w)});
    c.parentNode.replaceChild(fr,c)}
   else if(c.nodeType===1&&c.tagName!=='BR')walk(c)})})(el)}
function lines(el){
 var parts=el.innerHTML.split(/<br\s*\/?>/i);
 el.innerHTML=parts.map(function(h,i){return'<span class="ln" style="--i:'+i+'">'+h+'</span>'}).join('')}
function mark(el,t){
 if(el.classList.contains('rv')||el.classList.contains('rw')||el.classList.contains('rl'))return;
 if(el.matches('h1.script')){lines(el);el.classList.add('rl')}
 else if(/^H[1-3]$/.test(el.tagName)){words(el);el.classList.add('rw')}
 else{el.classList.add('rv');if(el.matches('.ph,.gal>div'))el.classList.add('ri')}
 el.style.setProperty('--dl',t+'s');obs(el)}
d.querySelectorAll('.split .ph,.pro,.hs,.hsn,.note,.sub,details,form,.via,.alt,.ramas h2,.ramas>.btn,.hp-btn,.blk>h2,.legal h2,.lead,footer').forEach(function(el){mark(el,0)});
d.querySelectorAll('.split .tx,.head,.cta,.tan,.duo,.cards,.gal,.feat,.grid3,.planos,.ubi').forEach(function(g){
 Array.prototype.filter.call(g.children,function(el){return !el.classList.contains('bgi')}).forEach(function(el,i){mark(el,Math.min(i,4)*.12)})});
d.querySelectorAll('.hero').forEach(function(g){
 Array.prototype.filter.call(g.children,function(el){return !el.classList.contains('bgi')}).forEach(function(el,i){mark(el,.1+i*.22)})});
/* fotos de fondo: desplazamiento suave (paralaje) */
var px=[].slice.call(d.querySelectorAll('.hero .bgi,.tan .bgi,.cta .bgi'));
if(px.length&&!rm){
 var tick=false,upd=function(){
  tick=false;var vh=window.innerHeight;
  px.forEach(function(im){
   var r=im.parentNode.getBoundingClientRect();
   if(r.bottom<0||r.top>vh)return;
   var p=(r.top+r.height/2-vh/2)/(vh/2+r.height/2);
   p=Math.max(-1,Math.min(1,p));
   im.style.transform='translate3d(0,'+(-p*r.height*.07).toFixed(1)+'px,0)'})};
 var req=function(){if(!tick){tick=true;requestAnimationFrame(upd)}};
 window.addEventListener('scroll',req,{passive:true});window.addEventListener('resize',req);upd()}
/* imágenes: fundido al terminar de cargar */
d.querySelectorAll('img[loading=lazy]').forEach(function(im){
 if(im.complete)return;
 im.classList.add('im');
 var ok=function(){im.classList.add('ok')};
 im.addEventListener('load',ok);im.addEventListener('error',ok)});
/* transición suave al pasar de una página a otra */
d.addEventListener('click',function(e){
 var a=e.target.closest&&e.target.closest('a');
 if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||rm)return;
 if((a.target&&a.target!=='_self')||a.hasAttribute('download'))return;
 var u;try{u=new URL(a.href)}catch(x){return}
 if(u.protocol!==location.protocol||u.origin!==location.origin)return;
 if(u.pathname===location.pathname&&u.search===location.search)return;
 e.preventDefault();root.classList.add('leave');
 setTimeout(function(){location.href=a.href},320)});
window.addEventListener('pageshow',function(e){if(e.persisted)root.classList.remove('leave')});
/* barra superior: línea sutil al bajar */
var hd=d.querySelector('header');
if(hd){var sc=function(){hd.classList.toggle('scr',window.scrollY>8)};window.addEventListener('scroll',sc,{passive:true});sc()}
/* pantalla de carga: árbol -> marca completa -> se abre la web */
var L=d.getElementById('ldr');
var begin=function(){root.classList.add('rd');held.forEach(function(el){io.observe(el)});held=[]};
if(L&&root.classList.contains('ld')){
 var done=false,n=0;
 var out=function(){
  if(done)return;done=true;L.classList.add('out');
  setTimeout(begin,700);
  setTimeout(function(){root.classList.remove('ld');if(L.parentNode)L.parentNode.removeChild(L)},1500)};
 var step=function(){if(++n===2)out()};
 setTimeout(step,Math.max(0,3100-performance.now()));
 if(d.readyState==='complete')step();else window.addEventListener('load',step);
 setTimeout(out,8000);
 L.addEventListener('click',out)
}else begin();
d.querySelectorAll('.hs').forEach(function(h){
 var b=h.nextElementSibling.children;
 var stp=function(){return h.firstElementChild.offsetWidth+18};
 var end=function(){return h.scrollLeft+h.clientWidth>=h.scrollWidth-8};
 b[0].onclick=function(){h.scrollLeft<8?h.scrollTo({left:h.scrollWidth,behavior:'smooth'}):h.scrollBy({left:-stp(),behavior:'smooth'})};
 b[1].onclick=function(){end()?h.scrollTo({left:0,behavior:'smooth'}):h.scrollBy({left:stp(),behavior:'smooth'})}});
var bg=d.getElementById('bg'),mn=d.getElementById('mn');
if(bg&&mn){
 var close=function(){mn.classList.remove('open');bg.setAttribute('aria-expanded','false')};
 bg.onclick=function(){bg.setAttribute('aria-expanded',mn.classList.toggle('open'))};
 d.addEventListener('keydown',function(e){if(e.key==='Escape'&&mn.classList.contains('open')){close();bg.focus()}});
 mn.addEventListener('click',function(e){if(e.target.closest('a'))close()})}
var f=d.getElementById('f');
if(f){
 f.addEventListener('submit',function(e){
  e.preventDefault();
  var btn=f.querySelector('button[type=submit]'),err=d.getElementById('err');
  err.style.display='none';
  var fail=function(m){err.textContent='No pudimos enviar la consulta'+(m?' ('+m+')':'')+'. Probá de nuevo o escribinos por mail o WhatsApp.';err.style.display='block';btn.disabled=false;btn.textContent='Enviar'};
  btn.disabled=true;btn.textContent='Enviando…';
  var data={};new FormData(f).forEach(function(v,k){data[k]=v});
  fetch(f.action,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(data)})
   .then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok||!j.success)throw new Error(j.message||('Error '+r.status));})})
   .then(function(){f.style.display='none';var ok=d.getElementById('ok');ok.style.display='block';ok.focus()})
   .catch(function(x){fail(x.message)})})}

var tps=d.querySelectorAll('.tp');
if(tps.length)(function(){
 var bar=d.createElement('nav');bar.className='tabs';bar.setAttribute('aria-label','Secciones del proyecto');
 var links=[];
 tps.forEach(function(t){var a=d.createElement('button');a.type='button';a.setAttribute('data-id',t.id);a.textContent=t.getAttribute('data-t');a.setAttribute('role','tab');bar.appendChild(a);links.push(a)});
 tps[0].parentNode.insertBefore(bar,tps[0]);
 var show=function(id,scroll){
  var ok=false;tps.forEach(function(t){if(t.id===id)ok=true});
  if(!ok)id=tps[0].id;
  tps.forEach(function(t){t.hidden=t.id!==id});
  links.forEach(function(a){a.setAttribute('aria-selected',a.getAttribute('data-id')===id)});
  var act=bar.querySelector('[aria-selected=true]');
  if(act&&bar.scrollTo)bar.scrollTo({left:act.offsetLeft-20,behavior:'smooth'});
  if(scroll){var top=bar.getBoundingClientRect().top;if(top<62||top>window.innerHeight*.6)window.scrollTo({top:window.scrollY+top-62,behavior:'smooth'})}
 };
 bar.addEventListener('click',function(e){var a=e.target.closest('button');if(!a)return;show(a.getAttribute('data-id'),true)});
 show('',false);
})();

if(d.querySelector('.tp'))(function(){
 var groups=[['.hs img',function(i){return i.getAttribute('src')}],['.planos figure a',function(a){return a.getAttribute('href')}],['.ubi figure img',function(i){return i.getAttribute('src')}]];
 var lb=null,img,cap,cnt,cur=[],ix=0,last=null;
 var build=function(){
  lb=d.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Imagen ampliada');lb.hidden=true;
  lb.innerHTML='<button type="button" class="lbx" aria-label="Cerrar">×</button><button type="button" class="lbp" aria-label="Anterior">‹</button><div class="lbs"><img alt=""></div><button type="button" class="lbn" aria-label="Siguiente">›</button><div class="lbc"></div>';
  d.body.appendChild(lb);img=lb.querySelector('img');cap=lb.querySelector('.lbc');
  lb.querySelector('.lbx').onclick=close;lb.querySelector('.lbp').onclick=function(e){e.stopPropagation();go(-1)};lb.querySelector('.lbn').onclick=function(e){e.stopPropagation();go(1)};
  lb.addEventListener('click',function(e){if(e.target===lb||e.target.className==='lbs')close()});
  img.addEventListener('click',function(){lb.classList.toggle('zm')});
  var x0=null;
  lb.addEventListener('touchstart',function(e){x0=lb.classList.contains('zm')||e.touches.length>1?null:e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>60)go(dx<0?1:-1);x0=null});
 };
 var show=function(){
  var it=cur[ix];lb.classList.remove('zm');img.src=it.src;img.alt=it.alt;
  cap.textContent=it.alt?it.alt+(cur.length>1?'  ·  '+(ix+1)+' / '+cur.length:''):'';
  lb.classList.toggle('one',cur.length<2);
 };
 var go=function(n){ix=(ix+n+cur.length)%cur.length;show()};
 var close=function(){lb.hidden=true;d.body.classList.remove('lbo');if(last)last.focus()};
 var open=function(list,i,from){if(!lb)build();cur=list;ix=i;last=from;lb.hidden=false;d.body.classList.add('lbo');show();lb.querySelector('.lbx').focus()};
 groups.forEach(function(g){
  d.querySelectorAll(g[0]).forEach(function(el){
   var scope=el.closest('.hs,.planos,.ubi');
   el.style.cursor='zoom-in';
   var trg=el;
   if(el.tagName==='IMG'){el.tabIndex=0;el.setAttribute('role','button')}
   var act=function(e){
    e.preventDefault();
    var els=Array.prototype.slice.call(scope.querySelectorAll(g[0]));
    var list=els.map(function(x){var im=x.tagName==='IMG'?x:x.querySelector('img');return{src:g[1](x),alt:im.getAttribute('alt')||''}});
    open(list,els.indexOf(el),el)};
   el.addEventListener('click',act);
   if(el.tagName==='IMG')el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')act(e)});
  })});
 d.addEventListener('keydown',function(e){if(!lb||lb.hidden)return;if(e.key==='Escape')close();else if(e.key==='ArrowLeft')go(-1);else if(e.key==='ArrowRight')go(1)});
})();
})();
