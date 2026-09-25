/* =========================================================
   SERENA WEDDING — Main Script
   ========================================================= */

// ── 1. NAVBAR: scroll state + hamburger ──────────────────
const navbar   = document.getElementById('mainNav');
const hamburger= document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

function updateNavbar() {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else                      navbar.classList.remove('scrolled');
}
window.addEventListener('scroll', updateNavbar, { passive: true });
window.addEventListener('load', updateNavbar);
updateNavbar();

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});


// ── 2. INTERSECTION OBSERVER: scroll animations ──────────
const animEls = document.querySelectorAll('.anim-up, .anim-left, .anim-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger delay based on position in parent
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 80}ms`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

animEls.forEach(el => observer.observe(el));


// ── 3. FAQ ACCORDION ─────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen   = btn.getAttribute('aria-expanded') === 'true';
    const answer   = btn.nextElementSibling;
    const allBtns  = document.querySelectorAll('.faq-question');

    // close all
    allBtns.forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });

    // open clicked (if it was closed)
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});


// ── 4. CONTACT FORM → WhatsApp ───────────────────────────
const WA_NUMBER = '6285694061768';

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const nama    = document.getElementById('nama').value.trim();
  const tanggal = document.getElementById('tanggal').value;
  const tamu    = document.getElementById('tamu').value;
  const pesan   = document.getElementById('pesan').value.trim();

  if (!nama) { alert('Mohon isi nama pasangan.'); return; }

  const tgl = tanggal
    ? new Date(tanggal).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' })
    : 'Belum ditentukan';

  const text = [
    `Halo Serena Wedding, saya ingin berkonsultasi mengenai paket pernikahan. 🌿`,
    ``,
    `📋 *Detail Awal:*`,
    `• Nama Pasangan : ${nama}`,
    `• Rencana Tanggal : ${tgl}`,
    `• Estimasi Tamu : ${tamu || 'Belum ditentukan'}`,
    `• Catatan : ${pesan || '-'}`,
    ``,
    `Mohon informasi lebih lanjut mengenai paket yang tersedia. Terima kasih!`
  ].join('\n');

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
});


// ── 5. SMOOTH SCROLL (anchor links) ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
