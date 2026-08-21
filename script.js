const CV_BASE = 'assets/cv/';
const CVS = {
    es: {
        primary: { file: 'Sergio_Herrera_CV_JefeProyectoTI_ES_Barcelona.pdf', labelKey: 'cta.cv', track: 'es-barcelona' },
        secondary: { file: 'Sergio_Herrera_CV_JefeProyectoTI_ES_Santiago.pdf', labelKey: 'cta.cvSecondary', track: 'es-santiago' }
    },
    ca: {
        primary: { file: 'Sergio_Herrera_CV_JefeProyectoTI_CA_Barcelona.pdf', labelKey: 'cta.cv', track: 'ca' },
        secondary: { file: 'Sergio_Herrera_CV_JefeProyectoTI_ES_Barcelona.pdf', labelKey: 'cta.cvSecondary', track: 'es-barcelona' }
    },
    en: {
        primary: { file: 'Sergio_Herrera_CV_JefeProyectoTI_EN.pdf', labelKey: 'cta.cv', track: 'en' },
        secondary: { file: 'Sergio_Herrera_CV_JefeProyectoTI_ES_Barcelona.pdf', labelKey: 'cta.cvSecondary', track: 'es-barcelona' }
    }
};

const FRASES_ES = [
    'dirigiendo la licitación del portal de empleo de un país',
    'coordinando la actualización de la política nacional de IA',
    'convirtiendo presupuesto público en servicios que funcionan',
    'midiendo el impacto, no solo el avance del proyecto'
];

let translations = {};
let currentLang = 'es';
let phrases = FRASES_ES.slice();
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimer = null;
let reduceMotion = false;
let mercadoChart = null;

try {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
} catch (e) {
    reduceMotion = false;
}

function detectLang() {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('lang');
    if (fromUrl && ['es', 'ca', 'en'].includes(fromUrl)) return fromUrl;
    const stored = localStorage.getItem('lang');
    if (stored && ['es', 'ca', 'en'].includes(stored)) return stored;
    const nav = (navigator.language || 'es').toLowerCase();
    if (nav.startsWith('ca')) return 'ca';
    if (nav.startsWith('en')) return 'en';
    return 'es';
}

function t(key) {
    const pack = translations[currentLang] || translations.es || {};
    return pack[key] || (translations.es || {})[key] || key;
}

function applyTranslations() {
    const pack = translations[currentLang] || translations.es;
    if (!pack) return;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (pack[key]) el.textContent = pack[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        const key = el.getAttribute('data-i18n-html');
        if (pack[key]) el.innerHTML = pack[key];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
        const key = el.getAttribute('data-i18n-aria');
        if (pack[key]) el.setAttribute('aria-label', pack[key]);
    });
    if (Array.isArray(pack.typewriter) && pack.typewriter.length) {
        phrases = pack.typewriter.slice();
    }
    document.documentElement.lang = currentLang;
    actualizarCV(currentLang);
    const typeEl = document.getElementById('typewriter');
    if (reduceMotion && typeEl) typeEl.textContent = phrases[0];
}

function actualizarCV(lang) {
    const cfg = CVS[lang] || CVS.es;
    const pack = translations[lang] || translations.es || {};
    const apply = (el, item) => {
        if (!el) return;
        el.href = CV_BASE + item.file;
        el.setAttribute('download', '');
        el.dataset.cv = item.track;
        const label = pack[item.labelKey];
        const span = el.querySelector('span');
        if (span && label) span.textContent = label;
        else if (label && el.id === 'cv-secundario') el.textContent = label;
    };
    apply(document.getElementById('cv-primario'), cfg.primary);
    apply(document.getElementById('cv-secundario'), cfg.secondary);
    apply(document.getElementById('cv-mobile'), cfg.primary);
}

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    const current = document.querySelector('.lang-current');
    if (current) current.textContent = lang.toUpperCase();
    document.querySelectorAll('.lang-option').forEach((opt) => {
        const active = opt.getAttribute('data-lang') === lang;
        opt.classList.toggle('active', active);
        if (active) opt.setAttribute('aria-current', 'true');
        else opt.removeAttribute('aria-current');
    });
    applyTranslations();
}

function track(name, props) {
    try {
        if (window.plausible) window.plausible(name, { props: props || {} });
    } catch (e) { /* analytics optional */ }
}

document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-track]');
    if (!a) return;
    track(a.dataset.track, { version: a.dataset.cv || undefined });
});

const langToggle = document.getElementById('langToggle');
const langDropdown = document.getElementById('langDropdown');
const langOptions = document.querySelectorAll('.lang-option');

if (langToggle && langDropdown) {
    langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = langDropdown.classList.toggle('open');
        langToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    langOptions.forEach((opt) => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            setLang(opt.getAttribute('data-lang'));
            langDropdown.classList.remove('open');
            langToggle.setAttribute('aria-expanded', 'false');
        });
    });
    document.addEventListener('click', () => {
        langDropdown.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
    });
    langToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            langDropdown.classList.remove('open');
            langToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && !reduceMotion) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.setProperty('--x', e.clientX + 'px');
        cursorGlow.style.setProperty('--y', e.clientY + 'px');
    });
} else if (cursorGlow) {
    cursorGlow.style.display = 'none';
}

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
}
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        if (current === 'light') {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
            localStorage.setItem('theme', 'light');
        }
        if (mercadoChart) {
            setTimeout(() => pintarGrafico(mercadoChart._serie || []), 80);
        }
    });
}

const navbar = document.getElementById('navbar');
const mobileCta = document.getElementById('mobileCta');
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 50);
    if (mobileCta) {
        const hero = document.getElementById('inicio');
        const pastHero = hero ? y > hero.offsetHeight - 80 : y > 400;
        const isMobile = window.matchMedia('(max-width: 600px)').matches;
        if (isMobile && pastHero) {
            mobileCta.hidden = false;
            document.body.style.paddingBottom = mobileCta.offsetHeight + 'px';
        } else {
            mobileCta.hidden = true;
            document.body.style.paddingBottom = '';
        }
    }
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
        if (section.hidden) return;
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
        }
    });
}
window.addEventListener('scroll', updateActiveNav);

const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');
let lastFocus = null;

function closeMobile() {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
}

function openMobile() {
    lastFocus = document.activeElement;
    hamburger.classList.add('active');
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const first = mobileMenu.querySelector('a:not([hidden])');
    if (first) first.focus();
}

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) closeMobile();
        else openMobile();
    });
    mobileLinks.forEach((link) => link.addEventListener('click', closeMobile));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            e.preventDefault();
            closeMobile();
            hamburger.focus();
        }
        if (e.key === 'Tab' && mobileMenu.classList.contains('open')) {
            const focusable = [...mobileMenu.querySelectorAll('a:not([hidden])')];
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });
}

function typeWriter() {
    const el = document.getElementById('typewriter');
    if (!el || !phrases.length) return;
    if (reduceMotion) {
        el.textContent = phrases[0];
        const cursor = document.querySelector('.typewriter-cursor');
        if (cursor) cursor.style.display = 'none';
        return;
    }
    const currentPhrase = phrases[phraseIndex];
    let speed = 80;
    if (isDeleting) {
        el.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        speed = 40;
    } else {
        el.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        speed = 80;
    }
    if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400;
    }
    typeTimer = setTimeout(typeWriter, speed);
}

if (reduceMotion) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
} else {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
}

document.querySelectorAll('.counter').forEach((el) => {
    const target = Number(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion || !Number.isFinite(target)) {
        el.textContent = target + suffix;
        return;
    }
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            obs.unobserve(el);
            let n = 0;
            const step = Math.max(1, Math.round(target / 40));
            const id = setInterval(() => {
                n = Math.min(n + step, target);
                el.textContent = n + suffix;
                if (n === target) clearInterval(id);
            }, 30);
        });
    }, { threshold: 0.5 });
    obs.observe(el);
});

const particleContainer = document.getElementById('heroParticles');
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createParticles() {
    if (!particleContainer || reduceMotion) return;
    const count = window.innerWidth < 600 ? 20 : 40;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        particle.style.animation = `particleFloat ${duration}s ${delay}s ease-in-out infinite`;
        particleContainer.appendChild(particle);
    }
}
if (!reduceMotion) {
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.15; }
            25% { transform: translate(${randomRange(-80, 80)}px, ${randomRange(-80, 80)}px) scale(1.2); opacity: 0.25; }
            50% { transform: translate(${randomRange(-60, 60)}px, ${randomRange(-60, 60)}px) scale(0.8); opacity: 0.1; }
            75% { transform: translate(${randomRange(-90, 90)}px, ${randomRange(-90, 90)}px) scale(1.1); opacity: 0.2; }
        }
    `;
    document.head.appendChild(particleStyle);
    createParticles();
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target || target.hidden) return;
        e.preventDefault();
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
});

const contactForm = document.getElementById('contactForm');
function showError(id, on) {
    const el = document.getElementById(id);
    if (el) el.hidden = !on;
}
function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        const consent = document.getElementById('consentimiento');
        let ok = true;
        showError('error-name', !name.value.trim());
        if (!name.value.trim()) ok = false;
        showError('error-email', !validEmail(email.value));
        if (!validEmail(email.value)) ok = false;
        showError('error-subject', !subject.value.trim());
        if (!subject.value.trim()) ok = false;
        showError('error-message', !message.value.trim());
        if (!message.value.trim()) ok = false;
        showError('error-consent', !consent.checked);
        if (!consent.checked) ok = false;
        if (!ok) return;

        const btn = document.getElementById('submitBtn');
        const status = document.getElementById('formStatus');
        const original = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> ' + t('contact.sending');
        const formData = new FormData(contactForm);
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' }
        })
            .then((response) => {
                if (response.ok) {
                    status.textContent = t('contact.success');
                    status.className = 'form-status ok';
                    contactForm.reset();
                    track('envio_formulario');
                } else {
                    status.textContent = t('contact.error');
                    status.className = 'form-status err';
                }
            })
            .catch(() => {
                status.textContent = t('contact.error');
                status.className = 'form-status err';
            })
            .finally(() => {
                btn.innerHTML = original;
                btn.disabled = false;
            });
    });
}

function loadChartJs() {
    return new Promise((resolve, reject) => {
        if (window.Chart) return resolve(window.Chart);
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
        s.onload = () => resolve(window.Chart);
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

function pintarIndicadores(d) {
    const unemp = document.getElementById('kpi-unemp');
    const yoy = document.getElementById('kpi-yoy');
    const period = document.getElementById('kpi-period');
    if (unemp) unemp.textContent = String(d.tasa_desocupacion).replace('.', ',') + '%';
    if (yoy) {
        const v = d.variacion_12m;
        if (v == null) yoy.textContent = '—';
        else yoy.textContent = (v > 0 ? '+' : '') + String(v).replace('.', ',') + ' pp';
    }
    if (period) period.textContent = d.ultimo_periodo_etiqueta || d.ultimo_periodo;
    const src = document.getElementById('data-source');
    if (src) {
        const tpl = t('data.source')
            .replace('{periodo}', d.ultimo_periodo_etiqueta || d.ultimo_periodo)
            .replace('{fecha}', d.actualizado);
        const first = src.querySelector('span');
        if (first) first.textContent = tpl;
    }
}

function pintarTabla(serie) {
    const tbody = document.querySelector('#tabla-serie tbody');
    if (!tbody) return;
    tbody.innerHTML = serie.map((p) => `<tr><td>${p.periodo}</td><td>${p.valor}</td></tr>`).join('');
}

async function pintarGrafico(serie) {
    const canvas = document.getElementById('chartDesocupacion');
    if (!canvas || !serie.length) return;
    try {
        await loadChartJs();
    } catch (e) {
        return;
    }
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const color = isDark ? '#818cf8' : '#4f46e5';
    const grid = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
    const text = isDark ? '#e4e4e7' : '#18181b';
    if (mercadoChart && typeof mercadoChart.destroy === 'function') mercadoChart.destroy();
    mercadoChart = new window.Chart(canvas, {
        type: 'line',
        data: {
            labels: serie.map((p) => p.periodo),
            datasets: [{
                label: t('data.unemp'),
                data: serie.map((p) => p.valor),
                borderColor: color,
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                fill: true,
                tension: 0.25,
                pointRadius: 0,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { maxTicksLimit: 12, color: text }, grid: { color: grid } },
                y: { ticks: { color: text, callback: (v) => v + '%' }, grid: { color: grid } }
            }
        }
    });
    mercadoChart._serie = serie;
}

async function cargarMercadoLaboral() {
    const cont = document.querySelector('#mercado-laboral');
    if (!cont) return;
    try {
        const res = await fetch('assets/data/mercado-laboral.json', { cache: 'no-cache' });
        if (!res.ok) throw new Error(res.status);
        const d = await res.json();
        const dias = (Date.now() - new Date(d.actualizado)) / 86400000;
        const aviso = cont.querySelector('.aviso-datos');
        if (aviso && dias > 60) aviso.hidden = false;
        pintarIndicadores(d);
        pintarTabla(d.serie || []);
        await pintarGrafico(d.serie || []);
        track('ver_mercado_laboral');
    } catch (e) {
        const err = cont.querySelector('.error-datos');
        if (err) err.hidden = false;
    }
}

async function cargarNotas() {
    try {
        const res = await fetch('assets/data/notas.json', { cache: 'no-cache' });
        if (!res.ok) return;
        const notas = await res.json();
        const publicadas = notas.filter((n) => n.estado === 'publicado');
        const navNotes = document.querySelectorAll('.nav-notes');
        const section = document.getElementById('notas');
        if (!publicadas.length) {
            navNotes.forEach((el) => { el.hidden = true; });
            if (section) section.hidden = true;
            return;
        }
        navNotes.forEach((el) => { el.hidden = false; });
        if (section) {
            section.hidden = false;
            const list = document.getElementById('notas-list');
            if (list) {
                list.innerHTML = publicadas.map((n) => `
                    <article class="note-card">
                        <h3><a href="notas/${n.slug}.html">${n.titulo}</a></h3>
                        <p>${n.resumen || ''}</p>
                    </article>`).join('');
            }
        }
    } catch (e) { /* notes optional */ }
}

const mercado = document.getElementById('mercado-laboral');
if (mercado) {
    const once = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
            once.disconnect();
            cargarMercadoLaboral();
        }
    }, { threshold: 0.15 });
    once.observe(mercado);
}

fetch('assets/i18n.json')
    .then((r) => r.json())
    .then((data) => {
        translations = data;
        currentLang = detectLang();
        setLang(currentLang);
        typeWriter();
        cargarNotas();
    })
    .catch(() => {
        currentLang = detectLang();
        typeWriter();
        cargarNotas();
    });
