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

                                // ПЛАВНИЙ СКРОЛ ПО КНОПКАХ ХЕДЕРА
    const navLinksSmooth = document.querySelectorAll('.nav_link');
    navLinksSmooth.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            
            if (burger && menu) {
                burger.classList.remove('open');
                menu.classList.remove('open');
            }
        });
    });

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

                                    // ============================================================
                                    // ХЕДЕР — ПОШУК / КОШИК / ОБРАНЕ / АКАУНТ
                                    // ============================================================
(function () {
    const overlay       = document.getElementById('overlay');
    const searchPanel   = document.getElementById('searchPanel');
    const cartPanel     = document.getElementById('cartPanel');
    const favPanel      = document.getElementById('favPanel');
    const accountModal  = document.getElementById('accountModal');

    const searchBtn = document.getElementById('searchBtn');
    const cartBtn   = document.getElementById('cartBtn');
    const favBtn    = document.getElementById('favBtn');
    const userBtn   = document.getElementById('userBtn');

    const searchInput   = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    const cartBody   = document.getElementById('cartBody');
    const cartFooter = document.getElementById('cartFooter');
    const cartBadge  = document.getElementById('cartBadge');

    const favBody  = document.getElementById('favBody');
    const favBadge = document.getElementById('favBadge');

    const accountContent = document.getElementById('accountContent');

    if (!overlay || !searchPanel || !cartPanel || !favPanel || !accountModal) return;

                                // ---------- ВІДКРИТТЯ / ЗАКРИТТЯ ПАНЕЛЕЙ ----------
    function openPanel(panel) {
        closeAllPanels();
        overlay.classList.add('show');
        panel.classList.add('open');
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = scrollbarWidth + 'px';
        if (panel === searchPanel) setTimeout(() => searchInput.focus(), 300);
    }

    function closeAllPanels() {
        [searchPanel, cartPanel, favPanel, accountModal].forEach(p => p.classList.remove('open'));
        overlay.classList.remove('show');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }

    overlay.addEventListener('click', closeAllPanels);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllPanels();
    });

    document.getElementById('searchClose').addEventListener('click', closeAllPanels);
    document.getElementById('cartClose').addEventListener('click', closeAllPanels);
    document.getElementById('favClose').addEventListener('click', closeAllPanels);
    document.getElementById('accountClose').addEventListener('click', closeAllPanels);

    searchBtn.addEventListener('click', () => openPanel(searchPanel));
    cartBtn.addEventListener('click', () => { renderCart(); openPanel(cartPanel); });
    favBtn.addEventListener('click', () => { renderFavorites(); openPanel(favPanel); });
    userBtn.addEventListener('click', () => { renderAccount(); openPanel(accountModal); });

                                // ---------- СТАН: КОШИК / ОБРАНЕ (localStorage) ----------
    function loadState(key) {
        try { return JSON.parse(localStorage.getItem(key)) || {}; }
        catch (e) { return {}; }
    }
    function saveState(key, obj) {
        localStorage.setItem(key, JSON.stringify(obj));
    }

    let cart = loadState('mobel_cart');       // { productId: qty }
    let favorites = loadState('mobel_favs');  // { productId: true }

    function getProducts() {
        return Array.from(document.querySelectorAll('.product_card')).map(card => ({
            id: card.dataset.productId,
            name: card.querySelector('.product_name').textContent.trim(),
            material: card.querySelector('.product_material').textContent.trim(),
            price: parseInt(card.querySelector('.product_price').textContent.replace(/\D/g, ''), 10) || 0,
            img: card.querySelector('.product_img').getAttribute('src')
        }));
    }

    function updateBadges() {
        const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
        const favCount = Object.keys(favorites).length;
        cartBadge.textContent = cartCount;
        cartBadge.classList.toggle('show', cartCount > 0);
        favBadge.textContent = favCount;
        favBadge.classList.toggle('show', favCount > 0);
    }

    function syncFavToggles() {
        document.querySelectorAll('.product_card').forEach(card => {
            const id = card.dataset.productId;
            const toggle = card.querySelector('.fav_toggle');
            if (toggle) toggle.classList.toggle('active', !!favorites[id]);
        });
    }

                                // ---------- РЕНДЕР КОШИКА ----------
    function renderCart() {
        const products = getProducts();
        const items = Object.keys(cart)
            .filter(id => cart[id] > 0)
            .map(id => {
                const p = products.find(pr => pr.id === id);
                return p ? Object.assign({}, p, { qty: cart[id] }) : null;
            })
            .filter(Boolean);

        if (items.length === 0) {
            cartBody.innerHTML = '<p class="panel_empty">Кошик порожній. Додайте товари з розділу «Продукти».</p>';
            cartFooter.innerHTML = '';
            return;
        }

        cartBody.innerHTML = items.map(item => `
            <div class="cart_item" data-id="${item.id}">
                <img src="${item.img}" alt="">
                <div class="cart_item_info">
                    <p class="cart_item_name">${item.name}</p>
                    <p class="cart_item_price">${item.price}€</p>
                    <div class="qty_control">
                        <button class="qty_btn" data-action="dec">−</button>
                        <span>${item.qty}</span>
                        <button class="qty_btn" data-action="inc">+</button>
                    </div>
                </div>
                <button class="cart_item_remove" aria-label="Видалити товар">&times;</button>
            </div>
        `).join('');

        const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
        cartFooter.innerHTML = `
            <div class="cart_total"><span>Разом</span><span>${total}€</span></div>
            <button class="btn_checkout" id="checkoutBtn">Оформити замовлення</button>
        `;

        document.getElementById('checkoutBtn').addEventListener('click', () => {
            cartFooter.innerHTML = '<p class="checkout_success">Дякуємо! Замовлення оформлено ✓</p>';
            cart = {};
            saveState('mobel_cart', cart);
            updateBadges();
            setTimeout(renderCart, 2200);
        });

        cartBody.querySelectorAll('.qty_btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.closest('.cart_item').dataset.id;
                if (btn.dataset.action === 'inc') {
                    cart[id] = (cart[id] || 0) + 1;
                } else {
                    cart[id] = Math.max(0, (cart[id] || 0) - 1);
                    if (cart[id] === 0) delete cart[id];
                }
                saveState('mobel_cart', cart);
                updateBadges();
                renderCart();
            });
        });

        cartBody.querySelectorAll('.cart_item_remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.closest('.cart_item').dataset.id;
                delete cart[id];
                saveState('mobel_cart', cart);
                updateBadges();
                renderCart();
            });
        });
    }

                                // ---------- РЕНДЕР ОБРАНОГО ----------
    function renderFavorites() {
        const products = getProducts();
        const items = Object.keys(favorites)
            .map(id => products.find(p => p.id === id))
            .filter(Boolean);

        if (items.length === 0) {
            favBody.innerHTML = '<p class="panel_empty">Ще немає обраних товарів. Тисніть ♥ на картці товару.</p>';
            return;
        }

        favBody.innerHTML = items.map(item => `
            <div class="cart_item" data-id="${item.id}">
                <img src="${item.img}" alt="">
                <div class="cart_item_info">
                    <p class="cart_item_name">${item.name}</p>
                    <p class="cart_item_price">${item.price}€</p>
                </div>
                <div class="fav_item_actions">
                    <button class="cart_item_add" aria-label="Додати в кошик"><img src="images/Basket_alt_3.svg" alt=""></button>
                    <button class="cart_item_remove" aria-label="Прибрати з обраного">&times;</button>
                </div>
            </div>
        `).join('');

        favBody.querySelectorAll('.cart_item_add').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.closest('.cart_item').dataset.id;
                cart[id] = (cart[id] || 0) + 1;
                saveState('mobel_cart', cart);
                updateBadges();
            });
        });

        favBody.querySelectorAll('.cart_item_remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.closest('.cart_item').dataset.id;
                delete favorites[id];
                saveState('mobel_favs', favorites);
                syncFavToggles();
                updateBadges();
                renderFavorites();
            });
        });
    }

                                // ---------- КНОПКИ НА КАРТКАХ ТОВАРІВ ----------
    document.querySelectorAll('.product_card').forEach(card => {
        const id = card.dataset.productId;

        const addBtn = card.querySelector('.product_btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                cart[id] = (cart[id] || 0) + 1;
                saveState('mobel_cart', cart);
                updateBadges();
                addBtn.classList.add('bounced');
                setTimeout(() => addBtn.classList.remove('bounced'), 400);
            });
        }

        const favToggle = card.querySelector('.fav_toggle');
        if (favToggle) {
            favToggle.addEventListener('click', () => {
                if (favorites[id]) delete favorites[id];
                else favorites[id] = true;
                saveState('mobel_favs', favorites);
                syncFavToggles();
                updateBadges();
            });
        }
    });

                                // ---------- ПОШУК ----------
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) { searchResults.innerHTML = ''; return; }

        const found = getProducts().filter(p =>
            p.name.toLowerCase().includes(query) || p.material.toLowerCase().includes(query)
        );

        if (found.length === 0) {
            searchResults.innerHTML = `<p class="panel_empty">Нічого не знайдено за запитом «${searchInput.value}»</p>`;
            return;
        }

        searchResults.innerHTML = found.map(p => `
            <button class="search_result" data-id="${p.id}">
                <img src="${p.img}" alt="">
                <span class="search_result_name">${p.name}</span>
                <span class="search_result_price">${p.price}€</span>
            </button>
        `).join('');

        searchResults.querySelectorAll('.search_result').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                closeAllPanels();
                const target = document.querySelector(`.product_card[data-product-id="${id}"]`);
                if (target) {
                    document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        target.classList.add('highlight');
                        setTimeout(() => target.classList.remove('highlight'), 1600);
                    }, 400);
                }
            });
        });
    });

                                // ---------- АКАУНТ ----------
    function getUser() {
        try { return JSON.parse(localStorage.getItem('mobel_user')); }
        catch (e) { return null; }
    }

    function renderAccount() {
        const user = getUser();

        if (user) {
            accountContent.innerHTML = `
                <div class="account_logged">
                    <div class="account_avatar">${user.name.charAt(0).toUpperCase()}</div>
                    <h3>Привіт, ${user.name}!</h3>
                    <p>${user.email}</p>
                    <button class="btn_about" id="logoutBtn">Вийти</button>
                </div>
            `;
            document.getElementById('logoutBtn').addEventListener('click', () => {
                localStorage.removeItem('mobel_user');
                renderAccount();
            });
            return;
        }

        accountContent.innerHTML = `
            <div class="account_tabs">
                <button type="button" class="account_tab active" data-tab="login">Вхід</button>
                <button type="button" class="account_tab" data-tab="register">Реєстрація</button>
            </div>
            <form class="account_form" id="loginForm">
                <input type="email" placeholder="Ваш email" required>
                <input type="password" placeholder="Пароль" required>
                <button type="submit" class="footer_btn">Увійти</button>
            </form>
            <form class="account_form" id="registerForm" style="display:none;">
                <input type="text" placeholder="Ваше ім'я" required>
                <input type="email" placeholder="Ваш email" required>
                <input type="password" placeholder="Пароль" required>
                <button type="submit" class="footer_btn">Зареєструватися</button>
            </form>
        `;

        const tabs = accountContent.querySelectorAll('.account_tab');
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const isLogin = tab.dataset.tab === 'login';
                loginForm.style.display = isLogin ? 'flex' : 'none';
                registerForm.style.display = isLogin ? 'none' : 'flex';
            });
        });

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const name = email.split('@')[0];
            localStorage.setItem('mobel_user', JSON.stringify({ name, email }));
            renderAccount();
        });

        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = registerForm.querySelectorAll('input');
            const name = inputs[0].value;
            const email = inputs[1].value;
            localStorage.setItem('mobel_user', JSON.stringify({ name, email }));
            renderAccount();
        });
    }

                                // ---------- ІНІЦІАЛІЗАЦІЯ ----------
    syncFavToggles();
    updateBadges();
})();
