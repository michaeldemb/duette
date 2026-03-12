/* ========================================
   Duette Immigration Services — Main JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('navbar__toggle--open');
        navMenu.classList.toggle('navbar__menu--open');
    });

    // Close mobile menu when a link is clicked
    navMenu.querySelectorAll('.navbar__link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('navbar__toggle--open');
            navMenu.classList.remove('navbar__menu--open');
        });
    });

    // --- Language Switcher ---
    const langSwitcher = document.querySelector('.lang-switcher');
    const langBtn = document.querySelector('.lang-switcher__btn');

    if (langBtn && langSwitcher) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langSwitcher.classList.toggle('lang-switcher--open');
        });

        document.addEventListener('click', () => {
            langSwitcher.classList.remove('lang-switcher--open');
        });
    }

    // --- Sticky Navbar Shadow on Scroll ---
    const navbar = document.getElementById('navbar');

    const handleNavScroll = () => {
        if (window.scrollY > 10) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // --- Active Nav Link Highlighting ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__link');

    const observerOptions = {
        root: null,
        rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) + 20}px 0px -50% 0px`,
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle(
                        'navbar__link--active',
                        link.getAttribute('href') === `#${id}`
                    );
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // --- Contact Form (mailto) ---
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const mailtoBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;
        const mailtoLink = `mailto:info@duettevisa.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`;

        window.location.href = mailtoLink;
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll(
        '.services__card, .team__card, .publications__card, .about__highlight-card'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        revealObserver.observe(el);
    });
});
