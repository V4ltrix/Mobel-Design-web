                                    // AOS — ініціалізація
AOS.init({
    duration: 700,            // тривалість анімації в мс
    easing: 'ease-out-cubic', // тип згладжування (можна: 'ease', 'ease-in', 'ease-out', 'linear', 'ease-in-out-back' тощо)
    once: true,                // true = анімація спрацьовує лише 1 раз; false = повторюється при кожному в'їзді у viewport
    mirror: false,             // якщо once: false — чи програвати анімацію "назад" при скролі вгору
    offset: 80,                 // за скільки пікселів ДО появи елемента в зоні видимості спрацює анімація
});

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

                                    // прогрес бар
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
});

                                // анімація цифр

function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current).toLocaleString();
        }
    }, 20);
}

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));



                                // прикріплений хедер
$(function() {
    let top = $("#home");
    let topH = top.height();
    let header = $("#header");

    $(window).on("scroll load", function() {
        let scrollPos = $(this).scrollTop();

        if (scrollPos > topH) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        }
    });
});
