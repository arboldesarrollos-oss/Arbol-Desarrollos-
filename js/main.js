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
})();
