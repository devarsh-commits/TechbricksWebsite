/* ===================================================
   TechBricks – Main JavaScript
   script.js
   =================================================== */

/* ─── MODAL FUNCTIONS ─── */

/**
 * Opens the enquiry modal popup and disables background scroll.
 */
function openModal() {
  document.getElementById('enquiryModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Closes the enquiry modal popup and restores background scroll.
 */
function closeModal() {
  document.getElementById('enquiryModal').classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * Closes the modal if the user clicks on the dark overlay (outside the modal box).
 * @param {MouseEvent} e
 */
function handleOverlayClick(e) {
  if (e.target === document.getElementById('enquiryModal')) {
    closeModal();
  }
}

/**
 * Handles form submission — shows a confirmation alert and closes the modal.
 * Replace alert() with a real API/form submission as needed.
 */
function submitForm() {
  const firstName = document.querySelector('#enquiryModal input[type="text"]').value.trim();
  const mobile    = document.querySelector('#enquiryModal input[type="tel"]').value.trim();
  const course    = document.querySelector('#enquiryModal select').value;

  if (!firstName) {
    alert('Please enter your first name.');
    return;
  }
  if (!mobile) {
    alert('Please enter your mobile number.');
    return;
  }
  if (!course) {
    alert('Please select a course of interest.');
    return;
  }

  alert(`Thank you, ${firstName}! 🎓\nOur team will call you at ${mobile} within 24 hours.`);
  closeModal();
}

/* ─── KEYBOARD ACCESSIBILITY ─── */
/* Close modal with Escape key */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});

/* ─── SCROLL REVEAL ─── */
/**
 * Observes elements with class "reveal" and adds "visible" when they enter the viewport.
 * Uses IntersectionObserver for performance. Falls back gracefully if not supported.
 */
(function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    // Fallback: just show all elements immediately
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          // Stagger siblings slightly for a cascade effect
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, index * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach(el => observer.observe(el));
})();

/* ─── STICKY NAV SHADOW ON SCROLL ─── */
(function initStickyNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      nav.style.boxShadow = '0 4px 32px rgba(0,0,0,0.14)';
    } else {
      nav.style.boxShadow = '0 2px 24px rgba(0,0,0,0.08)';
    }
  });
})();

/* ─── NEWSLETTER FORM ─── */
(function initNewsletter() {
  const form   = document.querySelector('.newsletter-form');
  const button = form ? form.querySelector('button') : null;

  if (!button) return;

  button.addEventListener('click', function () {
    const input = form.querySelector('input[type="email"]');
    const email = input ? input.value.trim() : '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    alert(`✅ Thank you! You've subscribed with ${email}.`);
    if (input) input.value = '';
  });
})();

/* ─── ACTIVE NAV LINK HIGHLIGHT ON SCROLL ─── */
(function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', function () {
    let current = '';

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.style.color = '';
      link.style.background = '';
      const href = link.getAttribute('href');
      if (href && href === '#' + current) {
        link.style.color = 'var(--primary)';
        link.style.background = 'var(--light2)';
      }
    });
  });
})();
