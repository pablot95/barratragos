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
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

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
                    entry.target.style.transform = 'translateY(0)';
                }, index * 80);
                galleryObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    collageItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        galleryObserver.observe(item);
    });

});

