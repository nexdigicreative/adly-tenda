/* ================================================================
   SERENA WEDDING — CMS Engine
   Membaca data dari localStorage dan menerapkan ke halaman publik
   ================================================================ */
(function(){
  const KEY = 'serena_cms_data';

  const DEFAULTS = {
    colors: { accent:'#2B4D3F', gold:'#B8935B' },
    seo: {
      title: 'Serena Wedding | Wedding Organizer Profesional Jakarta',
      desc: 'Wedding organizer berpengalaman dengan sentuhan personal.',
      ogTitle: 'Serena Wedding | Wedding Organizer Profesional',
      ogDesc: 'Wedding organizer berpengalaman.',
      ogImage: 'Assets/hero_main.jpg'
    },
    brand: { name: 'Serena <em>Wedding</em>' },
    hero: {
      img: 'Assets/hero_main.jpg',
      eyebrow: 'Wedding Organizer · Jakarta',
      title: 'Hari yang paling<br/><em>Anda impikan,</em><br/>kami wujudkan.',
      sub: 'Setiap detail pernikahan Anda kami rancang dengan penuh perhatian.',
      stat1num:'320+', stat1lbl:'Acara',
      stat2num:'8 Thn', stat2lbl:'Pengalaman',
      stat3num:'4.9★', stat3lbl:'Rating'
    },
    video: {
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      title: 'Lihat bagaimana kami<br/>menciptakan keajaiban'
    },
    about: {
      eyebrow:'Tentang Kami',
      title:'Bukan sekadar vendor —<br/>kami teman perjalanan Anda.',
      body1:'Serena Wedding lahir dari keyakinan bahwa setiap pernikahan adalah kisah unik yang tak bisa diulang.',
      body2:'Kami percaya keajaiban sebuah hari-H terletak pada detail kecil yang dirasakan, bukan sekadar dilihat.',
      quote:'"Pernikahan yang sempurna bukan yang bebas hambatan — tapi yang dinikmati sepenuh hati."',
      img:'Assets/portfolio_3.jpg',
      badgeNum:'320+', badgeLbl:'Pasangan Bahagia'
    },
    packages: {
      eyebrow:'Layanan & Paket',
      title:'Pilih paket yang sesuai<br/>dengan impian Anda',
      sub:'Semua harga bersifat estimasi dan akan disesuaikan saat konsultasi.',
      pkg1:{ name:'Intimate', price:'Mulai Rp 25 juta', desc:'Untuk pernikahan privat yang hangat, maks. 150 tamu.', list:'Konsultasi & perencanaan konsep\nKoordinasi hari-H (8 jam)\nDekorasi sederhana & floral\nKoordinasi vendor\nRundown & briefing tim' },
      pkg2:{ name:'Signature', price:'Mulai Rp 55 juta', desc:'Pernikahan berkesan untuk 150–400 tamu.', list:'Konsultasi & konsep penuh\nKoordinasi hari-H (12 jam)\nDekorasi custom & floral\nKoordinasi semua vendor\nMC profesional & entertainment\nCoordinator on-site (3 orang)\nSouvenir & stationery' },
      pkg3:{ name:'Grand', price:'Kustom / Hubungi Kami', desc:'Pernikahan mewah 400+ tamu atau multi-hari.', list:'Full planning (venue s/d hari-H)\nKonsep eksklusif & desain custom\nDekorasi premium & lighting\nManajemen vendor lengkap\nLive music & entertainment\nTim 5+ koordinator\nLayanan luar kota & destinasi' }
    },
    proses: {
      title:'Dari impian menjadi<br/>kenangan nyata',
      p1:{ title:'Konsultasi', desc:'Kami mendengarkan impian, budget, dan preferensi Anda — tanpa tekanan.' },
      p2:{ title:'Konsep & Perencanaan', desc:'Tim kami merancang konsep, mood board, dan estimasi anggaran yang transparan.' },
      p3:{ title:'Persiapan', desc:'Koordinasi vendor, survei lokasi, fitting dekorasi, dan gladi bersih.' },
      p4:{ title:'Hari-H', desc:'Tim kami hadir dari setup pertama hingga tamu terakhir.' },
      p5:{ title:'Pasca Acara', desc:'Laporan dokumentasi, koordinasi pengembalian properti, dan follow-up.' }
    },
    portfolio: {
      title:'Kisah-kisah yang<br/>kami bantu tulis',
      p1:{ img:'Assets/portfolio_1.jpg', label:'Resepsi Mewah · Jakarta' },
      p2:{ img:'Assets/portfolio_2.jpg', label:'Outdoor Garden · Bali' },
      p3:{ img:'Assets/portfolio_3.jpg', label:'Adat Jawa · Yogyakarta' },
      p4:{ img:'Assets/portfolio_4.jpg', label:'Boho Ceremony · Bandung' }
    },
    testimoni: {
      title:'Kata mereka tentang<br/>hari istimewa mereka',
      t1:{ quote:'Kami nggak perlu khawatir apapun di hari-H. Tim Serena benar-benar hadir untuk kami.', name:'Rizky & Amelia', pkg:'Paket Signature · Maret 2025', photo:'', video:'' },
      t2:{ quote:'Dekorasinya jauh melewati ekspektasi kami. Setiap sudut terasa personal dan hangat.', name:'Dimas & Nadia', pkg:'Paket Grand · November 2024', photo:'', video:'' },
      t3:{ quote:'Paket Intimate tapi hasilnya benar-benar mewah. Tim Serena sangat kreatif.', name:'Farhan & Sari', pkg:'Paket Intimate · Agustus 2025', photo:'', video:'' },
      t4:{ quote:'Komunikasinya luar biasa responsif dari awal sampai akhir.', name:'Aldi & Putri', pkg:'Paket Signature · Januari 2025', photo:'', video:'' }
    },
    faq: {
      faq1:{ q:'Berapa lama sebaiknya booking sebelum hari-H?', a:'Kami menyarankan minimal 6–12 bulan untuk Signature dan Grand. Paket Intimate minimal 3–4 bulan.' },
      faq2:{ q:'Apakah paket bisa dikustomisasi?', a:'Tentu! Semua paket bersifat fleksibel. Kami bisa menambahkan atau mengurangi layanan.' },
      faq3:{ q:'Berapa DP untuk booking?', a:'DP awal 30% dari total paket. Pelunasan bertahap: 50% saat H-3 bulan, sisanya H-7 sebelum acara.' },
      faq4:{ q:'Apakah melayani acara di luar kota?', a:'Ya! Kami melayani seluruh Indonesia termasuk Bali, Yogyakarta, Lombok, dan kota lainnya.' },
      faq5:{ q:'Bagaimana jika vendor pilihan sudah booked?', a:'Kami memiliki jaringan vendor terpercaya yang luas dan menyiapkan alternatif berkualitas setara.' }
    },
    kontak: {
      title:'Mari mulai perjalanan<br/>indah ini bersama',
      sub:'Isi form di bawah, kami balas via WhatsApp dalam 24 jam.',
      waNum:'6285694061768', waDisplay:'0856-9406-1768',
      alamat:'Jl. [Nama Jalan], Jakarta Selatan',
      jam:'Senin–Sabtu, 09.00–18.00 WIB',
      email:'hello@serenawedding.id',
      ig:'#', tiktok:'#'
    },
    footer: {
      brand:'Serena <em>Wedding</em>',
      tagline:'Membantu Anda merayakan cinta dengan cara yang paling indah.',
      copyright:'© 2026 Serena Wedding. Hak Cipta Dilindungi.'
    }
  };

  // Merge saved data with defaults
  function getData(){
    try{
      const saved = JSON.parse(localStorage.getItem(KEY)||'{}');
      return deepMerge(DEFAULTS, saved);
    }catch(e){ return DEFAULTS; }
  }

  function deepMerge(target, source){
    const out = Object.assign({}, target);
    for(const k in source){
      if(source[k] && typeof source[k]==='object' && !Array.isArray(source[k])){
        out[k] = deepMerge(target[k]||{}, source[k]);
      } else {
        out[k] = source[k];
      }
    }
    return out;
  }

  function set(id, html){
    const el = document.getElementById(id);
    if(el) el.innerHTML = html;
  }
  function setSrc(id, src){
    const el = document.getElementById(id);
    if(el) el.src = src;
  }
  function setHref(id, href){
    const el = document.getElementById(id);
    if(el) el.href = href;
  }
  function setAttr(id, attr, val){
    const el = document.getElementById(id);
    if(el) el.setAttribute(attr, val);
  }

  function applyColors(colors){
    document.documentElement.style.setProperty('--c-accent', colors.accent);
    document.documentElement.style.setProperty('--c-gold',   colors.gold);
  }

  function applyList(id, listStr){
    const el = document.getElementById(id);
    if(!el) return;
    const items = listStr.split('\n').filter(s=>s.trim());
    el.innerHTML = items.map(i=>`<li>${i.trim()}</li>`).join('');
  }

  function applyAll(d){
    // Colors
    applyColors(d.colors);

    // SEO
    document.title = d.seo.title;
    setAttr('cms-desc','content',d.seo.desc);
    setAttr('cms-og-title','content',d.seo.ogTitle);
    setAttr('cms-og-desc','content',d.seo.ogDesc);
    setAttr('cms-og-image','content',d.seo.ogImage);

    // Brand
    set('cms-brand-name', d.brand.name);
    set('cms-footer-brand', d.footer.brand);

    // Hero
    setSrc('cms-hero-img', d.hero.img);
    set('cms-hero-eyebrow', d.hero.eyebrow);
    set('cms-hero-title', d.hero.title);
    set('cms-hero-sub', d.hero.sub);
    set('cms-stat1-num', d.hero.stat1num); set('cms-stat1-lbl', d.hero.stat1lbl);
    set('cms-stat2-num', d.hero.stat2num); set('cms-stat2-lbl', d.hero.stat2lbl);
    set('cms-stat3-num', d.hero.stat3num); set('cms-stat3-lbl', d.hero.stat3lbl);

    // Video
    setSrc('cms-video-iframe', d.video.url);
    set('cms-video-title', d.video.title);

    // About
    set('cms-about-eyebrow', d.about.eyebrow);
    set('cms-about-title', d.about.title);
    set('cms-about-body1', d.about.body1);
    set('cms-about-body2', d.about.body2);
    set('cms-about-quote', d.about.quote);
    setSrc('cms-about-img', d.about.img);
    set('cms-about-badge-num', d.about.badgeNum);
    set('cms-about-badge-lbl', d.about.badgeLbl);

    // Packages
    set('cms-pkg-eyebrow', d.packages.eyebrow);
    set('cms-pkg-title', d.packages.title);
    set('cms-pkg-sub', d.packages.sub);
    ['pkg1','pkg2','pkg3'].forEach(p=>{
      const pk = d.packages[p];
      set(`cms-${p}-name`, pk.name);
      set(`cms-${p}-price`, pk.price);
      set(`cms-${p}-desc`, pk.desc);
      applyList(`cms-${p}-list`, pk.list);
    });

    // Proses
    set('cms-proses-title', d.proses.title);
    ['p1','p2','p3','p4','p5'].forEach(p=>{
      set(`cms-${p}-title`, d.proses[p].title);
      set(`cms-${p}-desc`, d.proses[p].desc);
    });

    // Portfolio
    set('cms-porto-title', d.portfolio.title);
    ['p1','p2','p3','p4'].forEach((p,i)=>{
      const pk = d.portfolio[`p${i+1}`];
      setSrc(`cms-porto${i+1}-img`, pk.img);
      set(`cms-porto${i+1}-label`, pk.label);
    });

    // Testimoni
    set('cms-testi-title', d.testimoni.title);
    ['t1','t2','t3','t4'].forEach(t=>{
      const tk = d.testimoni[t];
      set(`cms-${t}-quote`, tk.quote);
      set(`cms-${t}-name`, tk.name);
      set(`cms-${t}-pkg`, tk.pkg);
      // Photo
      const photoEl = document.getElementById(`cms-${t}-photo`);
      const avEl    = document.getElementById(`cms-${t}-av`);
      if(photoEl && avEl){
        if(tk.photo){ photoEl.src=tk.photo; photoEl.style.display='block'; avEl.style.display='none'; }
        else { photoEl.style.display='none'; avEl.style.display='flex'; }
      }
      // Video
      const vidWrap = document.getElementById(`cms-${t}-video-wrap`);
      const vidEl   = document.getElementById(`cms-${t}-video`);
      if(vidWrap && vidEl){
        if(tk.video){ vidEl.src=tk.video; vidWrap.style.display='block'; }
        else { vidWrap.style.display='none'; }
      }
    });

    // FAQ
    ['faq1','faq2','faq3','faq4','faq5'].forEach(f=>{
      set(`cms-${f}-q`, d.faq[f].q);
      set(`cms-${f}-a`, d.faq[f].a);
    });

    // Kontak
    set('cms-kontak-title', d.kontak.title);
    set('cms-kontak-sub', d.kontak.sub);
    set('cms-wa-num', d.kontak.waDisplay);
    setHref('cms-wa-link', `https://wa.me/${d.kontak.waNum}`);
    setHref('cms-wa-float', `https://wa.me/${d.kontak.waNum}?text=Halo%20Serena%20Wedding`);
    set('cms-alamat', d.kontak.alamat);
    set('cms-jam', d.kontak.jam);
    const emailEl = document.getElementById('cms-email');
    if(emailEl){ emailEl.textContent = d.kontak.email; emailEl.href = `mailto:${d.kontak.email}`; }
    setHref('cms-ig', d.kontak.ig);
    setHref('cms-tiktok', d.kontak.tiktok);

    // Footer
    set('cms-footer-tagline', d.footer.tagline);
    set('cms-copyright', d.footer.copyright);
  }

  // Run on load
  window.addEventListener('DOMContentLoaded', ()=>{ applyAll(getData()); });
  // Expose for dashboard
  window.CMS = { getData, DEFAULTS, KEY };
})();
