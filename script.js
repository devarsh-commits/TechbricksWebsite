// MODAL
function openModal() {
  document.getElementById('enquiryModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('enquiryModal').classList.remove('active');
  document.body.style.overflow = '';
}
function handleOverlayClick(e) {
  if (e.target === document.getElementById('enquiryModal')) closeModal();
}
function submitForm() {
  var firstName = document.querySelector('#enquiryModal input[type="text"]').value.trim();
  var mobile    = document.querySelector('#enquiryModal input[type="tel"]').value.trim();
  var course    = document.querySelector('#enquiryModal select').value;
  if (!firstName) { alert('Please enter your first name.'); return; }
  if (!mobile)    { alert('Please enter your mobile number.'); return; }
  if (!course)    { alert('Please select a course of interest.'); return; }
  alert('Thank you, ' + firstName + '! 🎓\nOur team will call you at ' + mobile + ' within 24 hours.');
  closeModal();
}
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeModal(); });

// MOBILE NAV
function closeMobileNav() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileNav').classList.remove('open');
  document.body.style.overflow = '';
}
(function() {
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');
  if (!hamburger || !mobileNav) return;
  hamburger.addEventListener('click', function() {
    var isOpen = mobileNav.classList.contains('open');
    if (isOpen) { closeMobileNav(); }
    else { hamburger.classList.add('open'); mobileNav.classList.add('open'); document.body.style.overflow = 'hidden'; }
  });
  mobileNav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) closeMobileNav();
    });
  });
  document.querySelectorAll('.mob-submenu-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      var submenu = document.getElementById(toggle.getAttribute('data-target'));
      var isOpen  = toggle.classList.contains('open');
      document.querySelectorAll('.mob-submenu-toggle').forEach(function(t) { t.classList.remove('open'); });
      document.querySelectorAll('.mobile-submenu').forEach(function(s) { s.classList.remove('open'); });
      if (!isOpen && submenu) { toggle.classList.add('open'); submenu.classList.add('open'); }
    });
  });
})();

// SCROLL REVEAL
(function() {
  var reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { reveals.forEach(function(el) { el.classList.add('visible'); }); return; }
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
      if (entry.isIntersecting) { setTimeout(function() { entry.target.classList.add('visible'); }, i * 60); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.1 });
  reveals.forEach(function(el) { observer.observe(el); });
})();

// STICKY NAV
(function() {
  var nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', function() {
    nav.style.boxShadow = window.scrollY > 10 ? '0 4px 32px rgba(0,0,0,0.14)' : '0 2px 24px rgba(0,0,0,0.08)';
  });
})();

// NEWSLETTER
(function() {
  var btn = document.querySelector('.newsletter-form button');
  if (!btn) return;
  btn.addEventListener('click', function() {
    var input = document.querySelector('.newsletter-form input[type="email"]');
    var email = input ? input.value.trim() : '';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email address.'); return; }
    alert('✅ Subscribed! Thank you — ' + email + ' is now on our list.');
    if (input) input.value = '';
  });
})();