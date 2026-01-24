// THEME TOGGLE
const body = document.body;
const themeToggle = document.getElementById('themeToggle');

function setTheme(theme) {
    body.classList.remove('theme-dark', 'theme-light');
    body.classList.add(theme);
    localStorage.setItem('nexus-theme', theme);
    themeToggle.textContent = theme === 'theme-dark' ? '☾' : '☀';
}

// Cargar tema guardado
const savedTheme = localStorage.getItem('nexus-theme') || 'theme-dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('theme-dark') ? 'theme-light' : 'theme-dark';
    setTheme(newTheme);
});

// GSAP ANIMACIONES
window.addEventListener('load', () => {
    gsap.from('.navbar', { y: -50, opacity: 0, duration: 0.8, ease: 'power3.out' });
    gsap.from('.hero-title', { y: 40, opacity: 0, duration: 1, ease: 'power3.out' });
    gsap.from('.subtitle', { y: 30, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out' });
    gsap.from('.buttons .btn', { y: 20, opacity: 0, duration: 0.6, delay: 0.4, stagger: 0.1 });

    gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
});

// 3D CARDS
const cards3D = document.querySelectorAll('.card-3d');

cards3D.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
});

// FONDO CÓDIGO DIGITAL (tipo Matrix)
const canvas = document.getElementById('codeCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const letters = '01NEXUSBOTAI<>/{}[]';
const fontSize = 16;
let columns = canvas.width / fontSize;
let drops = Array.from({ length: columns }).map(() => Math.floor(Math.random() * canvas.height / fontSize));

function drawMatrix() {
    const themeDark = body.classList.contains('theme-dark');
    ctx.fillStyle = themeDark ? 'rgba(0, 0, 0, 0.15)' : 'rgba(245, 245, 245, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = themeDark ? '#8a4bff' : '#5b2bbf';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.95) {
            drops[i] = 0;
        }
        drops[i]++;
    }

    requestAnimationFrame(drawMatrix);
}
drawMatrix();
