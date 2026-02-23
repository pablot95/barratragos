document.addEventListener('DOMContentLoaded', () => {

    // ========================
    // HAMBURGER MENU
    // ========================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // ========================
    // SMOOTH SCROLL
    // ========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ========================
    // NAVBAR SCROLL EFFECT
    // ========================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ========================
    // HERO CAROUSEL (Desktop)
    // ========================
    const slides = document.querySelectorAll('.hero-carousel .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 6000;

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, slideInterval);
    }

    // ========================
    // SCROLL REVEAL ANIMATION
    // ========================
    const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-clip, .stagger-children';
    const revealElements = document.querySelectorAll(revealSelectors);

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========================
    // HERO PARALLAX ON SCROLL
    // ========================
    const heroContent = document.querySelector('.hero-content');
    const heroOverlay = document.querySelector('.hero-overlay');

    if (heroContent) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.pageYOffset;
                    const heroH = window.innerHeight;
                    if (scrollY < heroH) {
                        const progress = scrollY / heroH;
                        const opacity = 1 - progress * 1.5;
                        const translateY = scrollY * 0.3;
                        const scale = 1 - progress * 0.08;
                        heroContent.style.opacity = Math.max(0, opacity);
                        heroContent.style.transform = `translate(-50%, calc(-50% + ${translateY}px)) scale(${scale})`;
                        if (heroOverlay) {
                            heroOverlay.style.background = `linear-gradient(
                                to bottom,
                                rgba(0,0,0,${0.3 + progress * 0.3}) 0%,
                                rgba(0,0,0,${0.1 + progress * 0.2}) 40%,
                                rgba(0,0,0,${0.5 + progress * 0.3}) 100%
                            )`;
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ========================
    // CONTACT FORM → WHATSAPP
    // ========================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const nombre = formData.get('nombre') || '';
            const email = formData.get('email') || '';
            const telefono = formData.get('telefono') || '';
            const fecha = formData.get('fecha') || '';
            const personas = formData.get('personas') || '';
            const lugar = formData.get('lugar') || '';
            const mensaje = formData.get('mensaje') || '';

            // Format date for readability
            let fechaFormateada = fecha;
            if (fecha) {
                const d = new Date(fecha + 'T00:00:00');
                fechaFormateada = d.toLocaleDateString('es-AR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            }

            const text = [
                `¡Hola! Soy *${nombre}*.`,
                ``,
                `📧 Email: ${email}`,
                `📱 Teléfono: ${telefono}`,
                `📅 Fecha del evento: ${fechaFormateada}`,
                `👥 Cantidad de personas: ${personas}`,
                `📍 Lugar: ${lugar}`,
                mensaje ? `💬 Mensaje: ${mensaje}` : '',
                ``,
                `Quisiera recibir más información sobre su servicio de barra de tragos. ¡Gracias!`
            ].filter(line => line !== undefined).join('\n');

            const url = `https://wa.me/5491131237111?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        });
    }

    // ========================
    // GALLERY ITEMS STAGGER
    // ========================
    const collageItems = document.querySelectorAll('.collage-item');

    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateX(0) scale(1) rotate(0deg)';
                }, index * 120);
                galleryObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
    });

    const directions = [
        'translateY(25px)',
        'translateY(20px) scale(0.97)',
        'translateY(30px)',
        'translateY(20px) rotate(1deg)',
        'translateY(35px) scale(0.98)',
        'translateY(15px)',
        'translateY(28px) scale(0.97)',
        'translateY(22px)'
    ];

    collageItems.forEach((item, i) => {
        const dir = directions[i % directions.length];
        item.style.opacity = '0';
        item.style.transform = dir;
        item.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)`;
        galleryObserver.observe(item);
    });

});

