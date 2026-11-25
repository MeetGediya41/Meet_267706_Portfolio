(function(){
var root=document.documentElement,tb=document.getElementById('theme');
function dark(){var t=root.getAttribute('data-theme');return t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches}
function sync(){tb.textContent=dark()?'☾':'☼'}
try{var s=localStorage.getItem('theme');if(s)root.setAttribute('data-theme',s)}catch(e){}
sync();
tb.addEventListener('click',function(){var n=dark()?'light':'dark';root.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(e){}sync()});

var m=document.getElementById('menu'),l=document.getElementById('links');
m.addEventListener('click',function(){var o=l.classList.toggle('open');m.setAttribute('aria-expanded',o)});
l.addEventListener('click',function(){l.classList.remove('open');m.setAttribute('aria-expanded','false')});

var rv=document.querySelectorAll('.rv');
if('IntersectionObserver' in window){
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
rv.forEach(function(el){io.observe(el)});
}else{rv.forEach(function(el){el.classList.add('in')})}

var secs=document.querySelectorAll('main section, .hero'),links=document.querySelectorAll('.links a'),bar=document.getElementById('bar'),top=document.getElementById('top');
function onScroll(){
var y=scrollY+120,cur='home';
secs.forEach(function(s){if(s.offsetTop<=y)cur=s.id});
links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+cur)});
var h=document.documentElement.scrollHeight-innerHeight;
bar.style.width=(h>0?scrollY/h*100:0)+'%';
top.classList.toggle('show',scrollY>500);
}
addEventListener('scroll',onScroll,{passive:true});onScroll();
top.addEventListener('click',function(){scrollTo({top:0})});

var words=['AI & Machine Learning','Data Science','Web Development','Design Thinking'],wi=0,ci=0,del=false,el=document.getElementById('typed');
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
(function tick(){
var w=words[wi];ci+=del?-1:1;el.textContent=w.slice(0,ci);
var d=del?35:70;
if(!del&&ci===w.length){del=true;d=1400}
else if(del&&ci===0){del=false;wi=(wi+1)%words.length;d=300}
setTimeout(tick,d);
})();
}

document.getElementById('yr').textContent=new Date().getFullYear();

var form=document.getElementById('form');
function setErr(id,msg){document.getElementById(id).classList.toggle('bad',!!msg);document.getElementById('e'+id).textContent=msg}
function validate(){
var n=document.getElementById('n').value.trim(),e=document.getElementById('e').value.trim(),msg=document.getElementById('m').value.trim(),ok=true;
if(n.length<2){setErr('n','Please enter your name (min 2 letters).');ok=false}else setErr('n','');
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)){setErr('e','Please enter a valid email address.');ok=false}else setErr('e','');
if(msg.length<10){setErr('m','Message should be at least 10 characters.');ok=false}else setErr('m','');
return ok}
['n','e','m'].forEach(function(id){document.getElementById(id).addEventListener('input',validate)});
form.addEventListener('submit',function(ev){
ev.preventDefault();
var note=document.getElementById('note');
if(!validate()){note.textContent='Please fix the highlighted fields.';return}
var n=document.getElementById('n').value,e=document.getElementById('e').value,msg=document.getElementById('m').value;
location.href='mailto:gediyameet3@gmail.com?subject='+encodeURIComponent('Portfolio message from '+n)+'&body='+encodeURIComponent(msg+'\n\n— '+n+' ('+e+')');
note.textContent='Opening your email app to send the message…';
});
})();