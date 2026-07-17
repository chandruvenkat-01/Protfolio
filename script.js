/* ==============================================
           PORTFOLIO SCRIPTS
           ============================================== */

// --- LOADER ---
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('out');
        startReveal();
    }, 2400);
});

const PARTICLE_COLOR = "#00ff66"; // Adjusted to vibrant green

// --- CANVAS STARFIELD ---
(function () {

    const canvas = document.getElementById("bg");
    const ctx = canvas.getContext("2d");

    let w, h;
    let particles = [];

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;

        particles = [];

        for (let i = 0; i < 180; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                z: Math.random() * 1000,
                r: Math.random() * 1.5 + 0.5,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4
            });
        }
    }

    resize();
    window.addEventListener("resize", resize);

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", (e) => {
        mouseX = (e.clientX - w / 2) * 0.01;
        mouseY = (e.clientY - h / 2) * 0.01;
    });

    function animate() {

        ctx.clearRect(0, 0, w, h);

        particles.forEach((p) => {

            p.x += p.vx + mouseX * 0.03;
            p.y += p.vy + mouseY * 0.03;

            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;

            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;

            const opacity = 0.2 + (p.r / 4);

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

            ctx.fillStyle = PARTICLE_COLOR;
            ctx.globalAlpha = opacity;
            ctx.fill();

            ctx.globalAlpha = 1;
        });

        requestAnimationFrame(animate);
    }

    animate();

})();

// --- CUSTOM CURSOR ---
(function () {
    if (window.innerWidth <= 900) return;
    const dot = document.getElementById('cur-dot'), ring = document.getElementById('cur-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
    (function anim() { rx += (mx - rx) * .14; ry += (my - ry) * .14; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(anim); })();
    document.querySelectorAll('a,button,.proj-card,.kpi,.cert-card,.tl-card').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('big'));
        el.addEventListener('mouseleave', () => ring.classList.remove('big'));
    });
})();

// --- NAVBAR ---
const nav = document.getElementById('nav');
const ham = document.getElementById('ham');
const navLinks = document.getElementById('navLinks');
window.addEventListener('scroll', () => nav.classList.toggle('solid', scrollY > 50));
ham?.addEventListener('click', () => { ham.classList.toggle('open'); navLinks.classList.toggle('open'); });
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => { ham.classList.remove('open'); navLinks.classList.remove('open'); }));

// Active nav on scroll
const secs = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navAs.forEach(a => a.classList.toggle('act', a.getAttribute('href') === '#' + e.target.id));
        }
    });
}, { threshold: .4 }).observe(document.querySelectorAll('section[id]')[0]);
secs.forEach(s => new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) navAs.forEach(a => a.classList.toggle('act', a.getAttribute('href') === '#' + e.target.id)); }); }, { threshold: .35 }).observe(s));

// --- TYPING ANIMATION ---
(function () {
    const el = document.getElementById('typed');
    const roles = ['Data Analyst', 'Machine Learning Enthusiast', 'Power BI Developer', 'Python Developer'];
    let i = 0, c = 0, del = false;
    function tick() {
        const cur = roles[i];
        el.textContent = del ? cur.slice(0, c - 1) : cur.slice(0, c + 1);
        if (!del) c++; else c--;
        if (c === cur.length && !del) { del = true; setTimeout(tick, 1800); return; }
        if (c === 0 && del) { del = false; i = (i + 1) % roles.length; }
        setTimeout(tick, del ? 55 : 95);
    }
    tick();
})();

// --- SCROLL REVEAL ---
function startReveal() {
    new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('in');
                e.target.querySelectorAll('.bar-fg').forEach(b => b.style.width = b.dataset.w + '%');
            }
        });
    }, { threshold: .12 }).observe(document.body);
    document.querySelectorAll('.rev').forEach(el => {
        new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
        }, { threshold: .12 }).observe(el);
    });
}

document.querySelectorAll('.sk-tab').forEach(tab => {
    tab.addEventListener('click', function () {
        document.querySelectorAll('.sk-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.sk-panel').forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        const panel = document.getElementById('p-' + this.dataset.panel);
        if (panel) {
            panel.classList.add('active');
            setTimeout(() => { panel.querySelectorAll('.bar-fg').forEach(b => b.style.width = b.dataset.w + '%'); }, 50);
        }
    });
});

const skillsSection = document.getElementById('skills');

new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const activePanel = document.querySelector('.sk-panel.active');

            if (activePanel) {
                activePanel.querySelectorAll('.bar-fg').forEach(bar => {
                    bar.style.width = '0';

                    setTimeout(() => {
                        bar.style.width = bar.dataset.w + '%';
                    }, 100);
                });
            }
        }
    });
}, { threshold: 0.3 }).observe(skillsSection);

// --- COUNTER ANIMATION ---
function animCount(el, target, dur) {
    const start = performance.now();
    (function upd(now) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(ease * target);
        if (p < 1) requestAnimationFrame(upd); else el.textContent = target;
    })(performance.now());
}
new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.kpi-n').forEach(n => animCount(n, +n.dataset.t, 1400));
    });
}, { threshold: .4 }).observe(document.querySelector('#about') || document.body);

// --- 3D TILT ---
document.querySelectorAll('.proj-card,.cert-card,.tl-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - .5) * 14;
        const y = -((e.clientY - r.top) / r.height - .5) * 14;
        card.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${y}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
});

// --- CONTACT FORM ---
emailjs.init("D2Dy-a5OM8waXrl-A"); // Replace with your EmailJS user ID

function submitForm() {
    const fn = document.getElementById('fn');
    const fe = document.getElementById('fe');
    const fs = document.getElementById('fs');
    const fm = document.getElementById('fm');

    ['fn', 'fe', 'fs', 'fm'].forEach(id => {
        document.getElementById(id + '-err').textContent = '';
    });

    let ok = true;

    if (!fn.value.trim()) {
        document.getElementById('fn-err').textContent = 'Name required.';
        ok = false;
    }

    if (!fe.value.trim() || !/\S+@\S+\.\S+/.test(fe.value)) {
        document.getElementById('fe-err').textContent = 'Valid email required.';
        ok = false;
    }

    if (!fs.value.trim()) {
        document.getElementById('fs-err').textContent = 'Subject required.';
        ok = false;
    }

    if (!fm.value.trim()) {
        document.getElementById('fm-err').textContent = 'Message required.';
        ok = false;
    }

    if (!ok) return;

    const btn = document.getElementById('sendBtn');
    const txt = document.getElementById('sendTxt');

    btn.disabled = true;
    txt.textContent = 'Sending...';

    emailjs.send(
        "service_10gpc2j",
        "template_vr4tr2m",
        {
            name: fn.value,
            email: fe.value,
            subject: fs.value,
            message: fm.value,
            title: fs.value,
            time: new Date().toLocaleString()
        }
    )
        .then(() => {
            document.getElementById('successBox').style.display = 'flex';

            fn.value = '';
            fe.value = '';
            fs.value = '';
            fm.value = '';

            setTimeout(() => {
                document.getElementById('successBox').style.display = 'none';
            }, 6000);
        })
        .catch((error) => {
            console.error(error);
            alert('Failed to send message.');
        })
        .finally(() => {
            btn.disabled = false;
            txt.textContent = 'Send Message';
        });
}

window.submitForm = submitForm;

// --- SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
});
