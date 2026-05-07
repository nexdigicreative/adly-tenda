// Inisialisasi AOS (Animasi)
if (typeof AOS !== 'undefined' && AOS && typeof AOS.init === 'function') {
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
    });
}

// Script untuk Navbar Glassmorphism Scroll Effect
const navbar = document.getElementById('mainNav');
if (navbar) {
    const updateNavbarState = function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // Run on scroll, load, and page show
    window.addEventListener('scroll', updateNavbarState);
    window.addEventListener('load', updateNavbarState);
    window.addEventListener('pageshow', updateNavbarState); // For back/forward cache
    
    // Initial check
    updateNavbarState();
}

// Animasi Menu Mobile (Hamburger Icon Toggle)
const navbarCollapseEl = document.getElementById('navbarNav');
const navbarIcon = document.querySelector('.navbar-toggler i');

if (navbarCollapseEl && typeof bootstrap !== 'undefined') {
    // toggle icon animation (guarded)
    if (navbarIcon) {
        navbarCollapseEl.addEventListener('show.bs.collapse', function () {
            navbarIcon.style.transition = 'transform 0.25s ease';
            navbarIcon.style.transform = 'rotate(90deg)';
            setTimeout(() => {
                navbarIcon.classList.remove('fa-bars');
                navbarIcon.classList.add('fa-times');
                navbarIcon.style.transform = 'rotate(0deg)';
            }, 120);
        });

        navbarCollapseEl.addEventListener('hide.bs.collapse', function () {
            navbarIcon.style.transition = 'transform 0.25s ease';
            navbarIcon.style.transform = 'rotate(-90deg)';
            setTimeout(() => {
                navbarIcon.classList.remove('fa-times');
                navbarIcon.classList.add('fa-bars');
                navbarIcon.style.transform = 'rotate(0deg)';
            }, 120);
        });
    }

    // Auto-close menu saat salah satu link diklik (khusus mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992 && navbarCollapseEl.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapseEl);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });
} else {
    // Fallback: attach safe click-close behavior even if bootstrap instance not found
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            try {
                if (window.innerWidth < 992 && navbarCollapseEl && navbarCollapseEl.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapseEl);
                    if (bsCollapse) bsCollapse.hide();
                }
            } catch (e) {
                // silent fail to avoid uncaught exceptions
            }
        });
    });
}

// Auto-close menu saat salah satu link diklik (khusus mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 992 && navbarCollapseEl.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapseEl);
            if (bsCollapse) bsCollapse.hide();
        }
    });
});