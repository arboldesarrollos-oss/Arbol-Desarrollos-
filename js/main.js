(function(){
var d=document;
var io='IntersectionObserver'in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'}):null;
function mark(el,t){el.classList.add('rv');el.style.setProperty('--dl',t+'s');io?io.observe(el):el.classList.add('in')}
d.querySelectorAll('.split .ph,.pro,.hs,.hsn,.note,.sub,details,form,.via,.alt,.ramas h2,.ramas>.btn,.hp-btn').forEach(function(el){mark(el,0)});
d.querySelectorAll('.split .tx,.head,.cta,.tan,.duo,.cards,.gal,.feat').forEach(function(g){
 Array.prototype.filter.call(g.children,function(el){return !el.classList.contains('bgi')}).forEach(function(el,i){mark(el,Math.min(i,4)*.12)})});
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
