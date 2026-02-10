// =========================================
// Language Switcher
// =========================================
let currentLang = localStorage.getItem('lang') || 'es';

const langToggle = document.getElementById('langToggle');
const langDropdown = document.getElementById('langDropdown');
const langOptions = document.querySelectorAll('.lang-option');
const langCurrent = document.querySelector('.lang-current');

function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) return;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        const key = el.getAttribute('data-i18n-html');
        if (t[key]) el.innerHTML = t[key];
    });
    // Update typewriter phrases
    if (t.typewriter) {
        phrases.length = 0;
        t.typewriter.forEach((p) => phrases.push(p));
        phraseIndex = 0;
        charIndex = 0;
        isDeleting = false;
    }
    document.documentElement.lang = lang === 'es' ? 'es' : lang === 'ca' ? 'ca' : 'en';
    // Re-render charts with new language
    if (typeof Plotly !== 'undefined') initDashboard();
}

langToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
});

langOptions.forEach((opt) => {
    opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = opt.getAttribute('data-lang');
        currentLang = lang;
        localStorage.setItem('lang', lang);
        langCurrent.textContent = lang.toUpperCase();
        langOptions.forEach((o) => o.classList.remove('active'));
        opt.classList.add('active');
        langDropdown.classList.remove('open');
        applyTranslations(lang);
    });
});

document.addEventListener('click', () => {
    langDropdown.classList.remove('open');
});

// Apply saved language on load
if (currentLang !== 'es') {
    langCurrent.textContent = currentLang.toUpperCase();
    langOptions.forEach((o) => {
        o.classList.remove('active');
        if (o.getAttribute('data-lang') === currentLang) o.classList.add('active');
    });
}

// =========================================
// Cursor Glow Effect
// =========================================
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.setProperty('--x', e.clientX + 'px');
    cursorGlow.style.setProperty('--y', e.clientY + 'px');
});

// =========================================
// Theme Toggle
// =========================================
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'light') {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// =========================================
// Navbar scroll effect
// =========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
        if (scrollIndicator) scrollIndicator.classList.add('hidden');
    } else {
        navbar.classList.remove('scrolled');
        if (scrollIndicator) scrollIndicator.classList.remove('hidden');
    }
    lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// =========================================
// Mobile Menu
// =========================================
const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// =========================================
// Typewriter Effect
// =========================================
const typewriterEl = document.getElementById('typewriter');
const phrases = [
    'Consultor IA & Data Science',
    'Ex-Jefe Dpto. BNE — Gobierno de Chile',
    'Máster IA & Machine Learning — Barcelona',
    'Automatización con Inteligencia Artificial',
    'Dashboards & Analítica Avanzada'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
    } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
    }

    setTimeout(typeWriter, typeSpeed);
}

typeWriter();

// Apply saved language after phrases are defined
applyTranslations(currentLang);

// =========================================
// Scroll Reveal
// =========================================
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

reveals.forEach((el) => revealObserver.observe(el));

// =========================================
// Skill Bar Animation
// =========================================
const skillItems = document.querySelectorAll('.skill-item');

const skillObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.setProperty('--level', level + '%');
                entry.target.classList.add('animated');
            }
        });
    },
    { threshold: 0.3 }
);

skillItems.forEach((item) => skillObserver.observe(item));

// =========================================
// Counter Animation
// =========================================
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
            }
        });
    },
    { threshold: 0.5 }
);

function animateCounter(el, target) {
    let current = 0;
    const increment = target / 40;
    const duration = 1500;
    const stepTime = duration / 40;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, stepTime);
}

statNumbers.forEach((num) => counterObserver.observe(num));

// =========================================
// Hero Particles
// =========================================
const particleContainer = document.getElementById('heroParticles');

function createParticles() {
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

// Add particle animation keyframes
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.15;
        }
        25% {
            transform: translate(${randomRange(-80, 80)}px, ${randomRange(-80, 80)}px) scale(1.2);
            opacity: 0.25;
        }
        50% {
            transform: translate(${randomRange(-60, 60)}px, ${randomRange(-60, 60)}px) scale(0.8);
            opacity: 0.1;
        }
        75% {
            transform: translate(${randomRange(-90, 90)}px, ${randomRange(-90, 90)}px) scale(1.1);
            opacity: 0.2;
        }
    }
`;
document.head.appendChild(particleStyle);

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

createParticles();

// =========================================
// Smooth scroll for anchor links
// =========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// =========================================
// Contact Form (sends via FormSubmit)
// =========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then((response) => {
        if (response.ok) {
            btn.innerHTML = '<i class="fas fa-check"></i> Mensaje Enviado';
            btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
            contactForm.reset();
        } else {
            btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error al enviar';
            btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        }
    })
    .catch(() => {
        btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error al enviar';
        btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    })
    .finally(() => {
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    });
});

// =========================================
// Tilt effect on project cards
// =========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// =========================================
// Interactive Dashboard (Plotly)
// =========================================
const chartTranslations = {
    es: {
        months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        vacantes: 'Vacantes', colocaciones: 'Colocaciones',
        chartTitle1: 'Vacantes y Colocaciones BNE', yAxis: 'Cantidad',
        chartTitle2: 'Distribución por Sector Económico',
        sectors: ['Comercio', 'Servicios', 'Industria', 'Construcción', 'Tecnología', 'Salud', 'Educación', 'Otros'],
    },
    ca: {
        months: ['Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des'],
        vacantes: 'Vacants', colocaciones: 'Col·locacions',
        chartTitle1: 'Vacants i Col·locacions BNE', yAxis: 'Quantitat',
        chartTitle2: 'Distribució per Sector Econòmic',
        sectors: ['Comerç', 'Serveis', 'Indústria', 'Construcció', 'Tecnologia', 'Salut', 'Educació', 'Altres'],
    },
    en: {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        vacantes: 'Job Openings', colocaciones: 'Placements',
        chartTitle1: 'Job Openings & Placements BNE', yAxis: 'Count',
        chartTitle2: 'Distribution by Economic Sector',
        sectors: ['Commerce', 'Services', 'Industry', 'Construction', 'Technology', 'Health', 'Education', 'Other'],
    },
};

function initDashboard() {
    if (typeof Plotly === 'undefined') {
        setTimeout(initDashboard, 500);
        return;
    }

    const lang = localStorage.getItem('lang') || 'es';
    const ct = chartTranslations[lang] || chartTranslations.es;

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const colors = {
        bg: isDark ? '#1a1a2e' : '#ffffff',
        text: isDark ? '#e4e4e7' : '#18181b',
        grid: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
        accent: '#6366f1',
        accent2: '#a855f7',
        accent3: '#22c55e',
        accent4: '#f59e0b',
    };

    const layout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { family: 'Inter, sans-serif', color: colors.text, size: 12 },
        margin: { t: 50, r: 20, b: 50, l: 50 },
        xaxis: { gridcolor: colors.grid, linecolor: colors.grid },
        yaxis: { gridcolor: colors.grid, linecolor: colors.grid },
    };

    // Chart 1: Employment trends
    const vacantes2024 = [42300, 45100, 48200, 51800, 49700, 46300, 44800, 47200, 50600, 53100, 55400, 52800];
    const vacantes2025 = [48700, 51200, 54800, 58300, 56100, 53400, 51900, 54700, 58200, 61500, 63800, 60200];
    const colocaciones = [28400, 30200, 32500, 34900, 33100, 31200, 30100, 31800, 34200, 35800, 37200, 35600];

    Plotly.newPlot('chartEmployment', [
        {
            x: ct.months, y: vacantes2024, name: ct.vacantes + ' 2024',
            type: 'scatter', mode: 'lines+markers',
            line: { color: colors.accent, width: 2.5 },
            marker: { size: 5 },
        },
        {
            x: ct.months, y: vacantes2025, name: ct.vacantes + ' 2025',
            type: 'scatter', mode: 'lines+markers',
            line: { color: colors.accent2, width: 2.5 },
            marker: { size: 5 },
        },
        {
            x: ct.months, y: colocaciones, name: ct.colocaciones,
            type: 'bar',
            marker: { color: colors.accent3, opacity: 0.4 },
        },
    ], {
        ...layout,
        title: { text: ct.chartTitle1, font: { size: 14, weight: 600 } },
        yaxis: { ...layout.yaxis, title: ct.yAxis },
        legend: { orientation: 'h', y: -0.2, x: 0.5, xanchor: 'center', font: { size: 11 } },
        barmode: 'overlay',
    }, { responsive: true, displayModeBar: false });

    // Chart 2: Sectors donut
    const values = [22, 19, 15, 12, 11, 8, 7, 6];
    const sectorColors = [colors.accent, colors.accent2, colors.accent3, colors.accent4, '#ec4899', '#06b6d4', '#8b5cf6', '#64748b'];

    Plotly.newPlot('chartSectors', [{
        labels: ct.sectors,
        values: values,
        type: 'pie',
        hole: 0.55,
        marker: { colors: sectorColors },
        textinfo: 'label+percent',
        textposition: 'outside',
        textfont: { size: 11 },
        hoverinfo: 'label+value+percent',
    }], {
        ...layout,
        title: { text: ct.chartTitle2, font: { size: 14, weight: 600 } },
        showlegend: false,
        margin: { t: 50, r: 50, b: 30, l: 50 },
    }, { responsive: true, displayModeBar: false });
}

initDashboard();

// Re-render charts on theme change
const origToggle = document.getElementById('themeToggle');
if (origToggle) {
    origToggle.addEventListener('click', () => {
        setTimeout(initDashboard, 100);
    });
}
