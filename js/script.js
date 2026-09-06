window.addEventListener('load', () => {

    // SWIPER 1
    new Swiper('.mySwiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        speed: 800,
        spaceBetween: 40,
        autoplay: { delay: 2000, disableOnInteraction: false },
        coverflowEffect: { rotate: 0, stretch: -40, depth: 150, modifier: 1, slideShadows: false },
        pagination: { el: '.swiper-pagination', clickable: false },
    });

    // SWIPER 2
    new Swiper('.tipsSwiper', {
        slidesPerView: 'auto',
        spaceBetween: 35,
        loop: true,
        centeredSlides: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.tipsSwiper .swiper-pagination', clickable: false },
    });

    // АНІМАЦІЯ ПОЯВИ СЕКЦІЙ
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('section, .footer_top').forEach(el => observer.observe(el));

    // SCROLL TO TOP
    const scrollBtn = document.createElement('button');
    scrollBtn.textContent = '↑';
    scrollBtn.id = 'scrollTop';
    document.body.appendChild(scrollBtn);
    window.addEventListener('scroll', () => {
        scrollBtn.style.opacity = window.scrollY > 400 ? '1' : '0';
    });
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // БУРГЕР МЕНЮ
    const burger = document.getElementById('burger');
    const menu = document.querySelector('.menu');
    if (burger && menu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('open');
            menu.classList.toggle('open');
        });
    }

    // ACTIVE NAV
    const navLinks = document.querySelectorAll('.nav_link');
    const navSections = document.querySelectorAll('#home, #about, #gallery, #products, #tips, #footer');
    const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const activeLink = document.querySelector(`.nav_link[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, { threshold: 0.3, rootMargin: '-50px 0px -50% 0px' });
    navSections.forEach(s => navObserver.observe(s));

});