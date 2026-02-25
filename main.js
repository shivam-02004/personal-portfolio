// ============================================================
//  SHIVAM CHAUHAN PORTFOLIO — main.js
// ============================================================

'use strict';

/* ── CONFIG ── */
const API_BASE = 'php/api.php';
const CONTACT_URL = 'php/contact.php';

/* ── STATIC FALLBACK DATA (when PHP not available) ── */
const FALLBACK = {
  projects: [
    { id:1, title:'Online Fuel Delivery System', slug:'fuel-delivery', category:'Full-Stack Web App', description:'A comprehensive on-demand fuel delivery platform that allows customers to order fuel directly to their location. Features real-time order tracking, multiple fuel types (petrol, diesel, CNG), geo-location based delivery zone detection, driver assignment panel, admin dashboard with analytics, and secure payment gateway integration. Designed to eliminate the hassle of visiting petrol stations.', tech_stack:'PHP, MySQL, JavaScript, Google Maps API, Bootstrap, Razorpay', emoji:'⛽', featured:'1', live_url:'#', github_url:'#' },
    { id:2, title:'Wood World', slug:'wood-world', category:'E-Commerce Platform', description:'A premium e-commerce platform for handcrafted wooden furniture and home décor. Rich product catalog, advanced filtering by wood type and room, custom engraving request system, order management, wishlist, and a seller dashboard for artisans to list products. Integrates logistics API for real-time delivery tracking across India.', tech_stack:'PHP, MySQL, JavaScript, CSS3, Swiper.js, Stripe API', emoji:'🪵', featured:'1', live_url:'#', github_url:'#' },
    { id:3, title:'Simon Says Game', slug:'simon-says', category:'Frontend Game', description:'Interactive memory game with animated UI, sound effects, combo multiplier, and a local leaderboard. Increasing difficulty keeps players engaged through 20+ levels.', tech_stack:'HTML, CSS, JavaScript', emoji:'🎮', featured:'0', live_url:'#', github_url:'#' },
    { id:4, title:'Amazon Clone', slug:'amazon-clone', category:'Frontend Clone', description:'Pixel-perfect Amazon homepage replica with responsive layout, product cards, hero carousel, category grid, and functional cart UI built entirely with vanilla HTML and CSS.', tech_stack:'HTML, CSS', emoji:'🛒', featured:'0', live_url:'#', github_url:'#' },
    { id:5, title:'Spotify Clone', slug:'spotify-clone', category:'Frontend Clone', description:'Music player UI with sidebar playlist navigation, now-playing bar, progress scrubber, and responsive dark layout matching Spotify\'s signature aesthetic.', tech_stack:'HTML, CSS, JavaScript', emoji:'🎵', featured:'0', live_url:'#', github_url:'#' },
    { id:6, title:'To Do App', slug:'todo-app', category:'JavaScript App', description:'Task management app with add, complete, delete, and filter functionality, persistent localStorage, and smooth animations.', tech_stack:'HTML, CSS, JavaScript', emoji:'✅', featured:'0', live_url:'#', github_url:'#' }
  ],
  skills: [
    { id:1, name:'HTML5',    category:'Frontend',  level:92, emoji:'🌐' },
    { id:2, name:'CSS3',     category:'Frontend',  level:88, emoji:'🎨' },
    { id:3, name:'JavaScript',category:'Frontend', level:75, emoji:'⚡' },
    { id:4, name:'Bootstrap',category:'Frontend',  level:82, emoji:'📦' },
    { id:5, name:'React',    category:'Frontend',  level:62, emoji:'⚛️' },
    { id:6, name:'PHP',      category:'Backend',   level:70, emoji:'🐘' },
    { id:7, name:'MySQL',    category:'Backend',   level:68, emoji:'🗄️' },
    { id:8, name:'Node.js',  category:'Backend',   level:58, emoji:'🟢' },
    { id:9, name:'Java',     category:'Language',  level:65, emoji:'☕' },
    { id:10,name:'Python',   category:'Language',  level:48, emoji:'🐍' },
    { id:11,name:'C++',      category:'Language',  level:50, emoji:'⚙️' },
    { id:12,name:'Git',      category:'Tools',     level:72, emoji:'🔧' }
  ],
  experience: [
    { id:1, role:'Software Development Intern', company:'IBM Cloud', duration:'Oct 2023 · 1 Month', description:'Worked on cloud-based web application development, gaining hands-on experience with IBM Cloud services, REST APIs, and collaborative development practices using Git.', emoji:'☁️' },
    { id:2, role:'Data Analytics Intern', company:'IBM Cloud', duration:'Sept 2024 · 1 Month', description:'Analysed large datasets using Python and IBM Watson Studio, created visual dashboards, and delivered actionable insights to support data-driven decision making.', emoji:'📊' }
  ]
};

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initNavbar();
  initHamburger();
  initTypewriter();
  initParticles();
  initReveal();
  loadPortfolioData();
  initContactForm();
  initModal();
  initSkillTabs();
  trackPageView();
});

/* ── LOADER ── */
function initLoader() {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.body.style.overflow = '';
  }, 1900);
  document.body.style.overflow = 'hidden';
}

/* ── CUSTOM CURSOR ── */
function initCursor() {
  if (window.innerWidth < 600) return;
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    dot.style.left  = e.clientX + 'px';
    dot.style.top   = e.clientY + 'px';
    rx += (e.clientX - rx) * .12;
    ry += (e.clientY - ry) * .12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
  });
  setInterval(() => {}, 16);

  document.querySelectorAll('a,button,.project-card,.skill-card,.mini-card,.edu-item').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ── NAVBAR ── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);

    // Active section highlight
    const sections = ['home','about','skills','projects','experience','contact'];
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 200) current = id;
    });
    links.forEach(l => l.classList.toggle('active', l.dataset.section === current));
  });
}

/* ── HAMBURGER ── */
function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    btn.classList.remove('open');
    links.classList.remove('open');
  }));
}

/* ── TYPEWRITER ── */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  const words = ['responsive websites.', 'full-stack apps.', 'great user experiences.', 'clean, beautiful code.', 'things that matter.'];
  let wi = 0, ci = 0, deleting = false;

  function tick() {
    const word = words[wi];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    let delay = deleting ? 60 : 100;

    if (!deleting && ci > word.length) { delay = 1600; deleting = true; }
    else if (deleting && ci < 0) { deleting = false; ci = 0; wi = (wi + 1) % words.length; delay = 400; }

    setTimeout(tick, delay);
  }
  setTimeout(tick, 2200);
}

/* ── PARTICLES ── */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < 55; i++) {
    particles.push({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.5 + .4,
      vx: (Math.random() - .5) * .3,
      vy: (Math.random() - .5) * .3,
      a: Math.random()
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      p.a += .005;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(192,113,79,${.15 + .15 * Math.sin(p.a)})`;
      ctx.fill();
    });

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(192,113,79,${.08 * (1 - d/100)})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/* ── SCROLL REVEAL ── */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay) || 0;
        setTimeout(() => {
          e.target.classList.add('revealed');
          // Trigger skill bar animations
          e.target.querySelectorAll('.sk-fill').forEach(fill => fill.style.width = fill.dataset.level + '%');
        }, delay);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
}

/* ════════════════════════════════════════
   LOAD PORTFOLIO DATA FROM PHP API
════════════════════════════════════════ */
async function loadPortfolioData() {
  try {
    const res  = await fetch(API_BASE + '?action=all');
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();
    if (!data.success) throw new Error('API error');

    renderSkills(data.skills);
    renderProjects(data.projects);
    renderExperience(data.experience);
  } catch (err) {
    // Use fallback static data when PHP server not available
    console.info('Using static fallback data (PHP server not detected).');
    renderSkills(FALLBACK.skills);
    renderProjects(FALLBACK.projects);
    renderExperience(FALLBACK.experience);
  }
}

/* ── RENDER SKILLS ── */
function renderSkills(skills) {
  const grid = document.getElementById('skillsGrid');
  grid.innerHTML = '';
  skills.forEach((sk, i) => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.dataset.category = sk.category;
    card.style.animationDelay = (i * 60) + 'ms';
    card.innerHTML = `
      <span class="sk-icon">${sk.emoji}</span>
      <div class="sk-name">${sk.name}</div>
      <div class="sk-bar">
        <div class="sk-fill" style="width:${sk.level}%"
             data-level="${sk.level}" title="${sk.level}%"></div>
      </div>`;
    grid.appendChild(card);
  });

  // Trigger bar animations on reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.sk-fill').forEach(f => {
          f.style.transition = 'width 1s ease .2s';
          f.style.width = f.dataset.level + '%';
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  obs.observe(grid);
}

/* ── RENDER PROJECTS ── */
function renderProjects(projects) {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';

  projects.forEach((p, i) => {
    const techs = p.tech_stack.split(',').map(t => `<span class="pc-tech-tag">${t.trim()}</span>`).join('');
    const isFeatured = p.featured == 1;
    const card = document.createElement('div');
    card.className = 'project-card' + (isFeatured ? ' featured' : '');
    card.style.animationDelay = (i * 80) + 'ms';
    card.innerHTML = `
      <div class="pc-header">
        <span class="pc-emoji">${p.emoji}</span>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:.3rem">
          ${isFeatured ? '<span class="pc-badge featured-badge">⭐ Featured</span>' : ''}
          <span class="pc-badge">${p.category}</span>
        </div>
      </div>
      <div class="pc-title">${p.title}</div>
      <p class="pc-desc">${p.description.slice(0,160)}...</p>
      <div class="pc-tech">${techs}</div>
      <div class="pc-actions">
        <a href="${p.live_url}" class="pc-btn primary" target="_blank">Live Demo</a>
        <button class="pc-btn secondary" onclick="openModal(${JSON.stringify(p).replace(/"/g,'&quot;')})">Details</button>
      </div>`;
    grid.appendChild(card);
  });
}

/* ── RENDER EXPERIENCE ── */
function renderExperience(experience) {
  const tl = document.getElementById('expTimeline');
  tl.innerHTML = '';
  experience.forEach(exp => {
    const item = document.createElement('div');
    item.className = 'tl-item';
    item.innerHTML = `
      <div class="tl-dot"></div>
      <div class="tl-icon">${exp.emoji}</div>
      <div class="tl-role">${exp.role}</div>
      <div class="tl-company">${exp.company}</div>
      <div class="tl-date">${exp.duration}</div>
      <p class="tl-desc">${exp.description}</p>`;
    tl.appendChild(item);
  });
}

/* ── SKILL TABS ── */
function initSkillTabs() {
  document.querySelectorAll('.skill-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      document.querySelectorAll('.skill-card').forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ── MODAL ── */
function initModal() {
  const overlay = document.getElementById('projectModal');
  document.getElementById('modalClose').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function openModal(project) {
  const techs = project.tech_stack.split(',').map(t => `<span class="pc-tech-tag">${t.trim()}</span>`).join('');
  document.getElementById('modalContent').innerHTML = `
    <div style="font-size:3rem;margin-bottom:1rem;">${project.emoji}</div>
    <h2 style="font-family:var(--font-head);font-size:1.6rem;color:white;margin-bottom:.4rem">${project.title}</h2>
    <div style="font-family:var(--font-mono);font-size:.75rem;color:var(--terra2);margin-bottom:1.2rem">${project.category}</div>
    <p style="color:var(--text2);line-height:1.8;margin-bottom:1.3rem;font-size:.92rem">${project.description}</p>
    <div style="margin-bottom:1.5rem"><div style="font-family:var(--font-mono);font-size:.72rem;color:var(--text3);margin-bottom:.6rem;letter-spacing:.06em">TECH STACK</div><div class="pc-tech">${techs}</div></div>
    <div style="display:flex;gap:.8rem">
      <a href="${project.live_url}" class="btn-primary" target="_blank" style="flex:1;justify-content:center;text-decoration:none">Live Demo</a>
      <a href="${project.github_url}" class="btn-outline" target="_blank" style="flex:1;text-align:center;justify-content:center">GitHub →</a>
    </div>`;
  document.getElementById('projectModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('projectModal').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── CONTACT FORM ── */
function initContactForm() {
  const form     = document.getElementById('contactForm');
  const msgEl    = document.getElementById('message');
  const charEl   = document.getElementById('charCount');
  const feedback = document.getElementById('formFeedback');
  const submitBtn= document.getElementById('submitBtn');

  // Char counter
  msgEl.addEventListener('input', () => {
    charEl.textContent = msgEl.value.length + ' / 5000';
  });

  // Real-time validation
  ['name','email','subject','message'].forEach(field => {
    document.getElementById(field).addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const valid = ['name','email','subject','message'].map(validateField).every(Boolean);
    if (!valid) return;

    submitBtn.disabled = true;
    document.getElementById('submitText').textContent = 'Sending...';
    feedback.className = 'form-feedback'; feedback.textContent = '';

    const payload = {
      name:    form.name.value.trim(),
      email:   form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim()
    };

    try {
      const res  = await fetch(CONTACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        feedback.className = 'form-feedback success';
        feedback.textContent = '✓ ' + data.message;
        form.reset();
        charEl.textContent = '0 / 5000';
      } else {
        throw new Error(data.error || (data.errors && data.errors[0]) || 'Failed to send.');
      }
    } catch (err) {
      // Graceful fallback when PHP not available
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        feedback.className = 'form-feedback success';
        feedback.textContent = '✓ Demo mode — in production this sends via PHP to MySQL! Message noted.';
        form.reset(); charEl.textContent = '0 / 5000';
      } else {
        feedback.className = 'form-feedback error';
        feedback.textContent = '✗ ' + err.message;
      }
    } finally {
      submitBtn.disabled = false;
      document.getElementById('submitText').textContent = 'Send Message';
    }
  });
}

function validateField(field) {
  const el  = document.getElementById(field);
  const err = document.getElementById('err-' + field);
  const val = el.value.trim();
  let msg   = '';

  if (field === 'name'    && val.length < 2)  msg = 'Name must be at least 2 characters.';
  if (field === 'email'   && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) msg = 'Enter a valid email.';
  if (field === 'subject' && val.length < 3)  msg = 'Subject is too short.';
  if (field === 'message' && val.length < 10) msg = 'Message must be at least 10 characters.';

  el.classList.toggle('error', !!msg);
  if (err) err.textContent = msg;
  return !msg;
}

/* ── TRACK PAGE VIEW ── */
function trackPageView() {
  try { fetch('php/track.php?page=home'); } catch (_) {}
}
