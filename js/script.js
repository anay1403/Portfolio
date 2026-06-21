/* ════════════════════════════════════════════════
   ANAY SRIVASTAV — PORTFOLIO SCRIPT
   - Particle canvas background
   - Typewriter hero effect
   - Navbar scroll behaviour
   - Scroll-reveal animations
   - Mobile hamburger menu
   ════════════════════════════════════════════════ */

/* ── 1. PARTICLE BACKGROUND ── */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles;
  const COUNT = 80;
  const MAX_DIST = 130;
  const COLORS = ['#6C63FF', '#00F5FF', '#8b85ff'];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r  = Math.random() * 1.5 + 0.5;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(108, 99, 255, ${(1 - dist / MAX_DIST) * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(loop);
  }

  resize();
  particles = Array.from({ length: COUNT }, () => new Particle());
  window.addEventListener('resize', resize);
  loop();
})();


/* ── 2. TYPEWRITER EFFECT ── */
(function initTypewriter() {
  const el = document.getElementById('typewriter-line');
  if (!el) return;

  const lines = [
    'print("Hello, World!")',
    'import { ambition } from "life"',
    'model.fit(hardwork, epochs=∞)',
    'git push origin future',
    'def solve(problem): return creativity',
    'SELECT * FROM opportunities WHERE ready = true',
  ];

  let lineIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = lines[lineIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        lineIdx = (lineIdx + 1) % lines.length;
      }
    }
    setTimeout(type, deleting ? 35 : 65);
  }

  setTimeout(type, 1400);
})();


/* ── 3. NAVBAR SCROLL ── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // smooth scroll for nav anchors
  nav.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      // close mobile menu if open
      document.getElementById('nav-links')?.classList.remove('open');
    });
  });
})();


/* ── 4. HAMBURGER MENU ── */
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    links.classList.toggle('open');
    // animate spans
    const spans = btn.querySelectorAll('span');
    const isOpen = links.classList.contains('open');
    spans[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
    spans[1].style.opacity   = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
  });

  // close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '1';
      });
    });
  });
})();


/* ── 5. SCROLL REVEAL ── */
(function initReveal() {
  const targets = [
    '.section-eyebrow',
    '.section-title',
    '.about-bio',
    '.about-links',
    '.skill-card',
    '.project-card',
    '.cert-item',
    '.achievement-card',
    '.contact-card',
    '.contact-sub',
    '.btn-large',
  ];

  const allEls = document.querySelectorAll(targets.join(','));
  allEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger children of same parent
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80 * i % 400);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  allEls.forEach(el => observer.observe(el));
})();


/* ── 6. CURSOR GLOW ON MOUSE (subtle) ── */
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip mobile

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    top: 0; left: 0;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
})();