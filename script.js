/* ------------------------------
   TEMA OSCURO / CLARO
------------------------------ */
const body = document.body;
const themeToggle = document.getElementById('themeToggle');

function setTheme(theme) {
    body.classList.remove('theme-dark', 'theme-light');
    body.classList.add(theme);
    localStorage.setItem('nexus-theme', theme);
    themeToggle.textContent = theme === 'theme-dark' ? '☾' : '☀';
}

const savedTheme = localStorage.getItem('nexus-theme') || 'theme-dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('theme-dark') ? 'theme-light' : 'theme-dark';
    setTheme(newTheme);
});

/* ------------------------------
   PANTALLA DE CARGA
------------------------------ */
const loadingPhrases = [
    "Inicializando módulos...",
    "Cargando sistema anti-raid...",
    "Optimizando seguridad...",
    "Sincronizando comandos...",
    "Conectando con Discord API...",
    "Nexus Bot está listo."
];

let phraseIndex = 0;
const loadingText = document.getElementById("loadingText");

setInterval(() => {
    loadingText.textContent = loadingPhrases[phraseIndex];
    phraseIndex = (phraseIndex + 1) % loadingPhrases.length;
}, 1200);

window.addEventListener("load", () => {
    gsap.to("#loadingScreen", {
        opacity: 0,
        duration: 1,
        delay: 2.5,
        onComplete: () => {
            document.getElementById("loadingScreen").classList.add("hidden");
        }
    });

    gsap.from(".hero-title", { y: 40, opacity: 0, duration: 1.2, ease: "power3.out", delay: 3 });
    gsap.from(".subtitle", { y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 3.2 });
});

/* ------------------------------
   ANIMACIONES GSAP SCROLL
------------------------------ */
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

/* ------------------------------
   CARDS 3D
------------------------------ */
document.querySelectorAll('.card-3d').forEach(card => {
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

/* ------------------------------
   FONDO MATRIX
------------------------------ */
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

/* ------------------------------
   CIRCUIT LINES ANIMATION
------------------------------ */

const circuitContainer = document.getElementById("circuit-lines");

function createCircuitLine() {
    const line = document.createElement("div");

    const isVertical = Math.random() > 0.5;

    if (isVertical) {
        line.classList.add("circuit-line", "circuit-vertical");
        line.style.left = Math.random() * window.innerWidth + "px";
        line.style.top = Math.random() * window.innerHeight + "px";
        line.style.animationDuration = (Math.random() * 3 + 3) + "s";
    } else {
        line.classList.add("circuit-line");
        line.style.width = Math.random() * 200 + 100 + "px";
        line.style.top = Math.random() * window.innerHeight + "px";
        line.style.left = Math.random() * window.innerWidth + "px";
        line.style.animationDuration = (Math.random() * 3 + 3) + "s";
    }

    circuitContainer.appendChild(line);

    setTimeout(() => line.remove(), 6000);
}

setInterval(createCircuitLine, 200);
