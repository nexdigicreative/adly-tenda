/* ================================================================
   SERENA WEDDING — Main Script
   ================================================================ */

// ── NAVBAR ──
const navbar = document.getElementById('mainNav');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

function updateNav(){ window.scrollY>60 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled'); }
window.addEventListener('scroll', updateNav, {passive:true});
window.addEventListener('load', updateNav);
updateNav();

hamburger.addEventListener('click',()=>{
  const open = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  document.body.style.overflow = open?'hidden':'';
});
navLinks.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click',()=>{ hamburger.classList.remove('open'); navLinks.classList.remove('open'); document.body.style.overflow=''; });
});

// ── REVEAL ANIMATIONS ──
const revealObs = new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      const idx=[...e.target.parentElement.children].indexOf(e.target);
      e.target.style.transitionDelay=`${idx*70}ms`;
      e.target.classList.add('in');
      revealObs.unobserve(e.target);
    }
  });
},{threshold:.1,rootMargin:'0px 0px -32px 0px'});
document.querySelectorAll('.reveal').forEach(el=>revealObs.observe(el));

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq__q').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const isOpen = btn.getAttribute('aria-expanded')==='true';
    document.querySelectorAll('.faq__q').forEach(b=>{ b.setAttribute('aria-expanded','false'); b.nextElementSibling.classList.remove('open'); });
    if(!isOpen){ btn.setAttribute('aria-expanded','true'); btn.nextElementSibling.classList.add('open'); }
  });
});

// ── CONTACT → WA ──
const WA = '6285694061768';
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit',function(e){
    e.preventDefault();
    const nama    = document.getElementById('nama').value.trim();
    const tanggal = document.getElementById('tanggal').value;
    const tamu    = document.getElementById('tamu').value;
    const pesan   = document.getElementById('pesan').value.trim();
    if(!nama){ alert('Mohon isi nama pasangan.'); return; }
    const tgl = tanggal ? new Date(tanggal).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'}) : 'Belum ditentukan';
    const text = [
      `Halo Serena Wedding, saya ingin berkonsultasi mengenai paket pernikahan. 🌿`,``,
      `📋 *Detail Awal:*`,
      `• Nama Pasangan : ${nama}`,
      `• Rencana Tanggal : ${tgl}`,
      `• Estimasi Tamu : ${tamu||'Belum ditentukan'}`,
      `• Catatan : ${pesan||'-'}`,``,
      `Mohon informasi lebih lanjut. Terima kasih!`
    ].join('\n');
    // Get WA number from CMS data if available
    let waNum = WA;
    try{ const d=JSON.parse(localStorage.getItem('serena_cms_data')||'{}'); if(d.kontak&&d.kontak.waNum) waNum=d.kontak.waNum; }catch(e){}
    window.open(`https://wa.me/${waNum}?text=${encodeURIComponent(text)}`, '_blank');
  });
}

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(!target) return;
    e.preventDefault();
    const offset = (navbar?navbar.offsetHeight:80)+16;
    window.scrollTo({top:target.getBoundingClientRect().top+window.scrollY-offset, behavior:'smooth'});
  });
});
