// ── Custom Cursor ──────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;

  if (cursor) {
    cursor.style.left = mx - 3 + 'px';
    cursor.style.top  = my - 3 + 'px';
  }
});

function animateRing() {
  if (ring) {
    rx += (mx - rx - 16) * 0.12;
    ry += (my - ry - 16) * 0.12;

    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
  }
  requestAnimationFrame(animateRing);
}
animateRing();

// Hover effect
document.querySelectorAll('a, button, .skill-card, .exp-item, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (ring) {
      ring.style.width = '48px';
      ring.style.height = '48px';
    }
  });

  el.addEventListener('mouseleave', () => {
    if (ring) {
      ring.style.width = '32px';
      ring.style.height = '32px';
    }
  });
});

// ── Scroll Reveal (FIXED) ───────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');

function showAllReveal() {
  reveals.forEach(el => el.classList.add('visible'));
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
} else {
  // fallback
  showAllReveal();
}

// FORCE FIX (important for GitHub Pages)
window.addEventListener("load", showAllReveal);

// ── Active Nav Highlight ───────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.id;
    }
  });

  navLinks.forEach(a => {
    a.style.color =
      a.getAttribute('href') === '#' + current
        ? 'var(--text)'
        : '';
  });
});