// Modal
function openModal(){document.getElementById('enquiryModal').classList.add('active');document.body.style.overflow='hidden'}
function closeModal(){document.getElementById('enquiryModal').classList.remove('active');document.body.style.overflow=''}
function submitForm(){
  var fn=document.querySelector('#enquiryModal input[type="text"]').value.trim();
  var m=document.querySelector('#enquiryModal input[type="tel"]').value.trim();
  var c=document.querySelector('#enquiryModal select').value;
  if(!fn){alert('Please enter your first name.');return}
  if(!m){alert('Please enter your mobile number.');return}
  if(!c){alert('Please select a course.');return}
  alert('Thank you, '+fn+'! 🎓\nWe will call you at '+m+' within 24 hours.');
  closeModal();
}
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal()});

// Mobile Nav
function closeMnav(){document.getElementById('hbg').classList.remove('open');document.getElementById('mnav').classList.remove('open');document.body.style.overflow=''}
(function(){
  var hbg=document.getElementById('hbg'),mnav=document.getElementById('mnav');
  if(!hbg||!mnav)return;
  hbg.addEventListener('click',function(){
    var o=mnav.classList.contains('open');
    if(o){closeMnav();}else{hbg.classList.add('open');mnav.classList.add('open');document.body.style.overflow='hidden';}
  });
  mnav.querySelectorAll('a').forEach(function(l){l.addEventListener('click',function(){var h=l.getAttribute('href');if(h&&h.startsWith('#'))closeMnav();});});
  document.querySelectorAll('.mst').forEach(function(t){
    t.addEventListener('click',function(e){
      e.preventDefault();
      var s=document.getElementById(t.getAttribute('data-t'));
      var o=t.classList.contains('open');
      document.querySelectorAll('.mst').forEach(function(x){x.classList.remove('open');});
      document.querySelectorAll('.msub').forEach(function(x){x.classList.remove('open');});
      if(!o&&s){t.classList.add('open');s.classList.add('open');}
    });
  });
})();

// Scroll Reveal
(function(){
  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('visible');});return;}
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(en,i){
      if(en.isIntersecting){setTimeout(function(){en.target.classList.add('visible');},i*70);obs.unobserve(en.target);}
    });
  },{threshold:0.08});
  els.forEach(function(e){obs.observe(e);});
})();

// Counter Animation
function animateCounter(el){
  var target=parseFloat(el.getAttribute('data-target'));
  var duration=1800;
  var start=null;
  function step(ts){
    if(!start)start=ts;
    var progress=Math.min((ts-start)/duration,1);
    var ease=1-Math.pow(1-progress,4);
    el.textContent=Math.floor(ease*target);
    if(progress<1)requestAnimationFrame(step);
    else el.textContent=target;
  }
  requestAnimationFrame(step);
}
(function(){
  var counters=document.querySelectorAll('.counter');
  if(!('IntersectionObserver' in window)){counters.forEach(function(c){c.textContent=c.getAttribute('data-target');});return;}
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){animateCounter(en.target);obs.unobserve(en.target);}
    });
  },{threshold:0.3});
  counters.forEach(function(c){obs.observe(c);});
})();

// Sticky nav
(function(){
  var nav=document.querySelector('nav');
  window.addEventListener('scroll',function(){
    nav.style.boxShadow=window.scrollY>10?'0 1px 0 rgba(54,0,93,.15),0 12px 40px rgba(54,0,93,.12)':'0 1px 0 rgba(54,0,93,.1),0 8px 32px rgba(54,0,93,.08)';
  });
})();

// Newsletter
(function(){
  var btn=document.querySelector('.nf button');
  if(!btn)return;
  btn.addEventListener('click',function(){
    var inp=document.querySelector('.nf input[type="email"]');
    var em=inp?inp.value.trim():'';
    if(!em||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){alert('Please enter a valid email.');return;}
    alert('✅ Subscribed! Thank you — '+em);
    if(inp)inp.value='';
  });
})();