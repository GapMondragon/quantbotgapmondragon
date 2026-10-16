// Quantbot Interactive Components & Behavior
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initModals();
  initTabs();
  initAccordion();
  initContactForm();
  initCareers();
  initNewsFilter();
  initBlogFilter();
  initMasterSynthesis();
});

// Navigation Handling
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  // Sticky header class
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  function openMobileMenu() {
    mobileToggle?.classList.add('active');
    mobileDrawer?.classList.add('active');
    mobileOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileToggle?.classList.remove('active');
    mobileDrawer?.classList.remove('active');
    mobileOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Highlight active link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .dropdown-link, .mobile-nav-link, .mobile-submenu-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Modal System
function initModals() {
  const modalOverlay = document.querySelector('#global-modal');
  if (!modalOverlay) return;

  const modalBody = modalOverlay.querySelector('.modal-body');
  const closeBtn = modalOverlay.querySelector('.modal-close');

  closeBtn?.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  window.openModal = function(htmlContent) {
    if (modalBody) modalBody.innerHTML = htmlContent;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Team Read More Delegation
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.team-read-more');
    if (!btn) return;

    const memberName = btn.dataset.member;
    const member = window.QuantbotData?.teamMembers?.find(m => m.name === memberName);
    if (!member) return;

    const modalHTML = `
      <div style="display:flex; align-items:center; gap:20px; margin-bottom:24px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:20px;">
        <img src="${member.image}" alt="${member.name}" style="width:90px; height:90px; border-radius:50%; object-fit:cover; border:2px solid var(--accent-mint); background:#031d44;">
        <div>
          <h2 style="font-size:1.6rem; color:#fff; text-transform:uppercase; margin-bottom:4px;">${member.name}</h2>
          <span style="color:var(--accent-mint); font-weight:600; font-size:1rem;">${member.role}</span>
        </div>
      </div>
      <div style="color:var(--text-secondary); line-height:1.75; font-size:1.025rem;">
        <p>${member.bio}</p>
      </div>
    `;
    window.openModal(modalHTML);
  });
}

// Tabs Component (QMM)
function initTabs() {
  const tabsContainer = document.querySelector('.tabs-layout');
  if (!tabsContainer) return;

  const tabBtns = tabsContainer.querySelectorAll('.tab-btn');
  const tabPanes = tabsContainer.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = tabsContainer.querySelector(`#tab-${targetId}`);
      if (activePane) activePane.classList.add('active');
    });
  });
}

// Accordion (FAQ / Q&A)
function initAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Optional: close other items
      // faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
}

// Careers Job Board Filter & Application Modal
function initCareers() {
  const careersList = document.querySelector('#job-openings-list');
  if (!careersList) return;

  const deptChips = document.querySelectorAll('[data-dept-filter]');
  const searchInput = document.querySelector('#careers-search');

  function renderJobs() {
    const selectedDept = document.querySelector('[data-dept-filter].active')?.dataset.deptFilter || 'all';
    const query = (searchInput?.value || '').toLowerCase().trim();

    const jobs = window.QuantbotData?.jobOpenings || [];
    const filtered = jobs.filter(job => {
      const matchesDept = selectedDept === 'all' || job.department.toLowerCase().includes(selectedDept.toLowerCase());
      const matchesSearch = !query || job.title.toLowerCase().includes(query) || job.description.toLowerCase().includes(query);
      return matchesDept && matchesSearch;
    });

    if (filtered.length === 0) {
      careersList.innerHTML = `<div style="text-align:center; padding:48px; color:var(--text-muted); background:var(--bg-card); border-radius:var(--radius-md); border:1px solid var(--border-card);">No open roles matching your search criteria. Please contact <strong>${window.QuantbotData.brand.careersEmail}</strong> for exploratory discussions.</div>`;
      return;
    }

    careersList.innerHTML = filtered.map(job => `
      <div class="card" style="margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px; margin-bottom:12px;">
          <div>
            <h3 style="font-size:1.35rem; color:#fff; margin-bottom:6px;">${job.title}</h3>
            <div style="display:flex; gap:12px; font-size:0.875rem; color:var(--accent-mint); font-weight:600; flex-wrap:wrap;">
              <span><i class="fa fa-briefcase"></i> ${job.department}</span>
              <span><i class="fa fa-map-marker-alt"></i> ${job.locations.join(', ')}</span>
              <span><i class="fa fa-clock"></i> ${job.type}</span>
            </div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="openJobModal('${job.id}')">Apply Now</button>
        </div>
        <p style="color:var(--text-secondary); margin-bottom:16px;">${job.description}</p>
        <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:12px;">
          <strong style="color:var(--text-primary); font-size:0.9rem;">Key Requirements:</strong>
          <ul style="margin:8px 0 0 20px; color:var(--text-secondary); font-size:0.9rem;">
            ${job.requirements.map(req => `<li style="margin-bottom:4px;">${req}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }

  deptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      deptChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderJobs();
    });
  });

  searchInput?.addEventListener('input', renderJobs);
  renderJobs();

  window.openJobModal = function(jobId) {
    const job = window.QuantbotData?.jobOpenings?.find(j => j.id === jobId);
    if (!job) return;

    const modalHTML = `
      <div style="margin-bottom:24px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:16px;">
        <span style="color:var(--accent-mint); text-transform:uppercase; font-size:0.8rem; letter-spacing:2px; font-weight:700;">Application Form</span>
        <h2 style="font-size:1.5rem; color:#fff; margin-top:4px;">${job.title}</h2>
        <p style="color:var(--text-muted); font-size:0.9rem;">${job.locations.join(', ')} · ${job.department}</p>
      </div>
      <form id="job-apply-form" onsubmit="handleJobSubmit(event, '${job.title}')">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input type="text" class="form-control" required placeholder="Jane Doe">
          </div>
          <div class="form-group">
            <label class="form-label">Email Address *</label>
            <input type="email" class="form-control" required placeholder="jane@example.com">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input type="tel" class="form-control" placeholder="+1 (555) 000-0000">
          </div>
          <div class="form-group">
            <label class="form-label">Preferred Location</label>
            <select class="form-control">
              ${job.locations.map(loc => `<option value="${loc}">${loc}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">LinkedIn / GitHub Profile URL</label>
          <input type="url" class="form-control" placeholder="https://linkedin.com/in/username">
        </div>
        <div class="form-group">
          <label class="form-label">Brief Background / Cover Note</label>
          <textarea class="form-control" rows="4" placeholder="Highlight your relevant research, algorithmic systems, or quantitative background..."></textarea>
        </div>
        <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:20px;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary btn-sm">Submit Application</button>
        </div>
      </form>
    `;
    window.openModal(modalHTML);
  };

  window.handleJobSubmit = function(e, roleTitle) {
    e.preventDefault();
    const form = document.querySelector('#job-apply-form');
    if (form) {
      form.innerHTML = `
        <div style="text-align:center; padding:36px 12px;">
          <div style="width:64px; height:64px; border-radius:50%; background:rgba(96,162,68,0.2); border:2px solid var(--accent-mint); color:var(--accent-mint); font-size:2rem; display:flex; align-items:center; justify-content:center; margin:0 auto 16px;">✓</div>
          <h3 style="color:#fff; font-size:1.4rem; margin-bottom:8px;">Application Received</h3>
          <p style="color:var(--text-secondary); line-height:1.6; max-width:440px; margin:0 auto 24px;">Thank you for your interest in the <strong>${roleTitle}</strong> position. Our recruiting team will review your qualifications and contact you promptly.</p>
          <button class="btn btn-primary btn-sm" onclick="closeModal()">Close</button>
        </div>
      `;
    }
  };
}

// News Filter
function initNewsFilter() {
  const newsGrid = document.querySelector('#news-articles-grid');
  if (!newsGrid) return;

  const searchInput = document.querySelector('#news-search');
  const articles = window.QuantbotData?.newsArticles || [];

  function renderNews() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const filtered = articles.filter(item => {
      return !query || item.title.toLowerCase().includes(query) || item.source.toLowerCase().includes(query) || item.summary.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      newsGrid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:48px; color:var(--text-muted); background:var(--bg-card); border-radius:var(--radius-md); border:1px solid var(--border-card);">No news articles found matching your query.</div>`;
      return;
    }

    newsGrid.innerHTML = filtered.map(item => `
      <div class="article-card">
        <div class="article-body">
          <div class="article-meta">
            <span><i class="fa fa-newspaper"></i> ${item.source}</span>
            <span>·</span>
            <span>${item.date}</span>
          </div>
          <h3 class="article-title"><a href="${item.url}" target="_blank" rel="noopener">${item.title}</a></h3>
          <p class="article-excerpt">${item.summary}</p>
          <div style="margin-top:auto;">
            <a href="${item.url}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" style="width:100%;">Read Full Story <i class="fa fa-external-link-alt" style="font-size:0.75rem;"></i></a>
          </div>
        </div>
      </div>
    `).join('');
  }

  searchInput?.addEventListener('input', renderNews);
  renderNews();
}

// Blog Filter & Reader
function initBlogFilter() {
  const blogGrid = document.querySelector('#blog-posts-grid');
  if (!blogGrid) return;

  const searchInput = document.querySelector('#blog-search');
  const catChips = document.querySelectorAll('[data-blog-cat]');
  const posts = window.QuantbotData?.blogPosts || [];

  function renderBlog() {
    const selectedCat = document.querySelector('[data-blog-cat].active')?.dataset.blogCat || 'all';
    const query = (searchInput?.value || '').toLowerCase().trim();

    const filtered = posts.filter(post => {
      const matchesCat = selectedCat === 'all' || post.category.toLowerCase().includes(selectedCat.toLowerCase());
      const matchesSearch = !query || post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      blogGrid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:48px; color:var(--text-muted); background:var(--bg-card); border-radius:var(--radius-md); border:1px solid var(--border-card);">No blog posts found matching your criteria.</div>`;
      return;
    }

    blogGrid.innerHTML = filtered.map(post => `
      <div class="article-card">
        <img src="${post.image}" alt="${post.title}" class="article-img">
        <div class="article-body">
          <div class="article-meta">
            <span>${post.category}</span>
            <span>·</span>
            <span>${post.date}</span>
          </div>
          <h3 class="article-title"><a href="javascript:void(0)" onclick="openPostModal('${post.id}')">${post.title}</a></h3>
          <p class="article-excerpt">${post.excerpt}</p>
          <div style="margin-top:auto;">
            <button class="btn btn-secondary btn-sm" onclick="openPostModal('${post.id}')" style="width:100%;">Read Article</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  catChips.forEach(chip => {
    chip.addEventListener('click', () => {
      catChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderBlog();
    });
  });

  searchInput?.addEventListener('input', renderBlog);
  renderBlog();

  window.openPostModal = function(postId) {
    const post = window.QuantbotData?.blogPosts?.find(p => p.id === postId);
    if (!post) return;

    const modalHTML = `
      <div style="margin-bottom:20px;">
        <span style="color:var(--accent-mint); font-weight:700; text-transform:uppercase; font-size:0.85rem; letter-spacing:2px;">${post.category} · ${post.date}</span>
        <h2 style="font-size:1.8rem; color:#fff; margin:10px 0 16px;">${post.title}</h2>
        <img src="${post.image}" alt="${post.title}" style="width:100%; max-height:360px; object-fit:cover; border-radius:var(--radius-md); margin-bottom:24px; border:1px solid var(--border-card);">
      </div>
      <div style="color:var(--text-secondary); line-height:1.8; font-size:1.05rem;">
        ${post.content}
      </div>
    `;
    window.openModal(modalHTML);
  };
}

// Contact Form Handling with instant validation & feedback
function initContactForm() {
  const form = document.querySelector('#main-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = form.querySelector('[name="first-name"]')?.value || '';
    const lastName = form.querySelector('[name="last-name"]')?.value || '';
    const email = form.querySelector('[name="email"]')?.value || '';
    const inquiry = form.querySelector('[name="inquiry-about"]')?.value || '';

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa fa-spinner fa-spin"></i> Sending...`;
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }

      const confirmationHTML = `
        <div style="text-align:center; padding:36px 16px;">
          <div style="width:70px; height:70px; border-radius:50%; background:rgba(96,162,68,0.2); border:2px solid var(--accent-mint); color:var(--accent-mint); font-size:2.2rem; display:flex; align-items:center; justify-content:center; margin:0 auto 20px;">✓</div>
          <h2 style="color:#fff; font-size:1.6rem; margin-bottom:10px;">Message Delivered</h2>
          <p style="color:var(--text-secondary); line-height:1.6; max-width:440px; margin:0 auto 24px;">
            Thank you, <strong>${firstName} ${lastName}</strong>. Your inquiry regarding <strong>${inquiry}</strong> has been forwarded to our team at <strong>info@quantbot.com</strong>. We will review your message and get in touch with you shortly.
          </p>
          <button class="btn btn-primary" onclick="closeModal()">Close</button>
        </div>
      `;
      window.openModal(confirmationHTML);
      form.reset();
    }, 800);
  });
}

// ============================================================================
// MASTER SYNTHESIS ENGINE: ALL /INSPO ANIMATIONS, TRANSFORMATIONS & CONTROLS
// ============================================================================

function initMasterSynthesis() {
  const Sound = initAcousticSoundEngine();
  const RollEngine = initAestheticRollEngine(Sound);
  initTelemetryBar(RollEngine, Sound);
  initSwissGridHelper(Sound);
  initScrollChoreography();
  initSplitTextHover();
  initDecryptedText();
  initSpotlightAndMagnet(Sound);
  initCustomCursor();
  initCommandPalette(RollEngine, Sound);
  initQuantLabSimulator(Sound);
  initGlobalHubMatrix(Sound);
  initPresentationDeckEngine(Sound);
}

// 1. Acoustic Interface Sound Design (bulbs.simondupety.com inspired)
function initAcousticSoundEngine() {
  let enabled = localStorage.getItem('qb_sound_enabled') !== 'false';
  let ctx = null;

  function ensureCtx() {
    if (!ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      ctx = new AudioCtx();
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  function playTick(freq = 1350, duration = 0.018, vol = 0.025) {
    if (!enabled) return;
    try {
      const audio = ensureCtx();
      if (!audio) return;
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audio.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.65, audio.currentTime + duration);
      gain.gain.setValueAtTime(vol, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);
      osc.connect(gain);
      gain.connect(audio.destination);
      osc.start();
      osc.stop(audio.currentTime + duration);
    } catch (_) {}
  }

  function playChime() {
    if (!enabled) return;
    [880, 1174.66, 1760].forEach((f, idx) => {
      setTimeout(() => playTick(f, 0.08, 0.03), idx * 45);
    });
  }

  return {
    isEnabled: () => enabled,
    toggle: () => {
      enabled = !enabled;
      localStorage.setItem('qb_sound_enabled', String(enabled));
      if (enabled) playChime();
      return enabled;
    },
    playTick,
    playChime,
  };
}

// 2. Multi-Theme, Surface & Shader "Random Roll" Engine
function initAestheticRollEngine(Sound) {
  const THEMES = [
    { id: 'sovereign-navy', label: 'Sovereign Navy', desc: 'Obsidian Navy • Emerald Mint • Champagne Gold' },
    { id: 'atelier-gold', label: 'Atelier Gold', desc: 'Velvet Obsidian • Champagne Gold • Haute Serif' },
    { id: 'swiss-editorial', label: 'Swiss Editorial', desc: 'Archival Broadsheet • Press Ink • 1px Rules' },
    { id: 'vision-spatial', label: 'Vision Spatial', desc: 'Refractive Glass • Volumetric Cyan • Specular Rim' },
    { id: 'titanium-quant', label: 'Titanium Quant', desc: 'Brushed Titanium • Signal Amber • Telemetry HUD' },
  ];

  const SURFACES = [
    { id: 'spatial-glass', label: 'Spatial Glass Plinths' },
    { id: 'swiss-grid', label: 'Architectural Swiss Hairlines' },
    { id: 'luxury-filigree', label: 'Haute-Couture Filigree Frame' },
  ];

  const SHADERS = [
    { id: 'constellation', label: 'Order-Book Constellation' },
    { id: 'topology', label: '3D Volatility Topology' },
    { id: 'quadtree', label: '2xA Recursive Quadtree' },
    { id: 'aurora', label: 'ShaderGradient Aurora' },
  ];

  let currentTheme = localStorage.getItem('qb_theme') || 'sovereign-navy';
  let currentSurface = localStorage.getItem('qb_surface') || 'spatial-glass';

  function applyState(themeId, surfaceId, shaderId, showNotification = false) {
    currentTheme = THEMES.some(t => t.id === themeId) ? themeId : 'sovereign-navy';
    currentSurface = SURFACES.some(s => s.id === surfaceId) ? surfaceId : 'spatial-glass';

    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('data-surface', currentSurface);
    localStorage.setItem('qb_theme', currentTheme);
    localStorage.setItem('qb_surface', currentSurface);

    if (shaderId && window.QuantCanvas) {
      window.QuantCanvas.setMode(shaderId);
    }

    updateToolbarLabels();

    if (showNotification) {
      const tObj = THEMES.find(t => t.id === currentTheme);
      const sObj = SURFACES.find(s => s.id === currentSurface);
      const cMode = window.QuantCanvas ? window.QuantCanvas.getMode() : 'constellation';
      const shObj = SHADERS.find(sh => sh.id === cMode) || SHADERS[0];
      showRollToast(tObj, shObj, sObj);
    }
  }

  let toastTimer = null;
  function showRollToast(themeObj, shaderObj, surfaceObj) {
    let toast = document.getElementById('qb-roll-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'qb-roll-toast';
      toast.className = 'qb-roll-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:6px; color:var(--accent-gold); font-weight:700;">
        <span>🎲 AESTHETIC SYNTHESIS ROLLED</span>
        <span style="font-size:0.65rem; opacity:0.75;">[R]</span>
      </div>
      <div style="line-height:1.55; color:var(--text-secondary);">
        <div><strong style="color:var(--accent-mint);">Palette:</strong> ${themeObj.label}</div>
        <div><strong style="color:var(--accent-mint);">Shader:</strong> ${shaderObj.label}</div>
        <div><strong style="color:var(--accent-mint);">Surface:</strong> ${surfaceObj.label}</div>
      </div>
    `;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 4200);
  }

  function updateToolbarLabels() {
    const themeBtn = document.getElementById('qb-btn-theme');
    const shaderBtn = document.getElementById('qb-btn-shader');
    const tObj = THEMES.find(t => t.id === currentTheme) || THEMES[0];
    const cMode = window.QuantCanvas ? window.QuantCanvas.getMode() : 'constellation';
    if (themeBtn) themeBtn.innerHTML = `<i class="fa fa-palette"></i> ${tObj.label}`;
    if (shaderBtn) shaderBtn.innerHTML = `<i class="fa fa-cube"></i> ${cMode.toUpperCase()}`;
  }

  applyState(currentTheme, currentSurface, null, false);

  const api = {
    getThemes: () => THEMES,
    getCurrentTheme: () => currentTheme,
    setTheme: (id) => {
      Sound.playTick(1100, 0.03);
      applyState(id, currentSurface, null, true);
    },
    cycleTheme: () => {
      const idx = (THEMES.findIndex(t => t.id === currentTheme) + 1) % THEMES.length;
      api.setTheme(THEMES[idx].id);
    },
    cycleShader: () => {
      Sound.playTick(1280, 0.03);
      const next = window.QuantCanvas ? window.QuantCanvas.cycleMode() : 'constellation';
      applyState(currentTheme, currentSurface, next, true);
    },
    roll: () => {
      Sound.playChime();
      const otherThemes = THEMES.filter(t => t.id !== currentTheme);
      const rTheme = otherThemes[Math.floor(Math.random() * otherThemes.length)];
      const rSurface = SURFACES[Math.floor(Math.random() * SURFACES.length)];
      const rShader = SHADERS[Math.floor(Math.random() * SHADERS.length)];
      applyState(rTheme.id, rSurface.id, rShader.id, true);
    },
    updateToolbarLabels,
  };

  window.QuantRoll = api;
  return api;
}

// 3. Unified Institutional Header Telemetry & Controls Binder (Zero Duplicate Top Bars)
function initTelemetryBar(RollEngine, Sound) {
  const headerInner = document.querySelector('.site-header .header-inner');
  if (headerInner && !headerInner.querySelector('.qb-header-telemetry')) {
    const brandLogo = headerInner.querySelector('.brand-logo');
    if (brandLogo) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex; align-items:center; gap:20px;';
      brandLogo.parentNode.insertBefore(wrap, brandLogo);
      wrap.appendChild(brandLogo);

      const telem = document.createElement('div');
      telem.className = 'qb-header-telemetry';
      telem.setAttribute('aria-label', 'Global Trading Hub Status');
      telem.innerHTML = `
        <span class="qb-pulse-dot"></span>
        <span>NYC <strong data-tz="America/New_York">--:--</strong></span>
        <span class="sep">·</span>
        <span>LDN <strong data-tz="Europe/London">--:--</strong></span>
        <span class="sep">·</span>
        <span>HKG <strong data-tz="Asia/Hong_Kong">--:--</strong></span>
      `;
      wrap.appendChild(telem);
    }
  }

  const headerActions = document.querySelector('.site-header .header-actions');
  if (headerActions && !document.getElementById('qb-btn-roll')) {
    const rollBtn = document.createElement('button');
    rollBtn.type = 'button';
    rollBtn.className = 'qb-header-pill-btn';
    rollBtn.id = 'qb-btn-roll';
    rollBtn.title = 'Roll Aesthetic Theme, Shader & Surface (Shortcut: R)';
    rollBtn.innerHTML = '<i class="fa fa-dice"></i> <span>Roll Style</span> <kbd>R</kbd>';

    const cmdBtn = document.createElement('button');
    cmdBtn.type = 'button';
    cmdBtn.className = 'qb-header-pill-btn';
    cmdBtn.id = 'qb-btn-cmd';
    cmdBtn.title = 'Command Palette (Shortcut: ⌘K)';
    cmdBtn.innerHTML = '<i class="fa fa-terminal"></i> <kbd>⌘K</kbd>';

    headerActions.prepend(cmdBtn);
    headerActions.prepend(rollBtn);
  }

  RollEngine.updateToolbarLabels();

  // Bind controls
  document.getElementById('qb-btn-roll')?.addEventListener('click', () => RollEngine.roll());
  document.getElementById('qb-btn-theme')?.addEventListener('click', () => RollEngine.cycleTheme());
  document.getElementById('qb-btn-shader')?.addEventListener('click', () => RollEngine.cycleShader());
  document.getElementById('qb-btn-cmd')?.addEventListener('click', () => {
    window.toggleCommandPalette?.(true);
  });

  // Live Multi-Timezone Clocks inside Header
  function updateClocks() {
    const now = new Date();
    document.querySelectorAll('[data-tz]').forEach((node) => {
      const tz = node.getAttribute('data-tz');
      try {
        node.textContent = new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(now);
      } catch (_) {
        node.textContent = now.toTimeString().slice(0, 5);
      }
    });
  }

  updateClocks();
  setInterval(updateClocks, 1000);
}

// 4. 12-Column Swiss Architectural Grid Helper Overlay (bulbs.simondupety.com)
function initSwissGridHelper(Sound) {
  const overlay = document.createElement('div');
  overlay.className = 'qb-swiss-grid-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  const colsHTML = Array.from({ length: 12 })
    .map((_, i) => {
      const num = String(i + 1).padStart(2, '0');
      return `<div class="qb-swiss-col" data-col="COL.${num}" style="transition-delay:${i * 22}ms"></div>`;
    })
    .join('');

  overlay.innerHTML = `<div class="qb-swiss-grid-inner">${colsHTML}</div>`;
  document.body.appendChild(overlay);

  function toggleGrid() {
    Sound.playTick(980, 0.025);
    const active = document.body.classList.toggle('show-swiss-grid');
    document.getElementById('qb-btn-grid')?.classList.toggle('active', active);
  }

  document.getElementById('qb-btn-grid')?.addEventListener('click', toggleGrid);

  window.addEventListener('keydown', (e) => {
    const tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target?.isContentEditable) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    if (e.key.toLowerCase() === 'g') {
      e.preventDefault();
      toggleGrid();
    } else if (e.key.toLowerCase() === 'r') {
      e.preventDefault();
      window.QuantRoll?.roll();
    } else if (e.key.toLowerCase() === 'm') {
      e.preventDefault();
      document.getElementById('qb-btn-sound')?.click();
    }
  });
}

// 5. Scroll Progress Bar & Dense 25%-Opacity Live Scroll Section Minimap (bulbs & ollivere)
function initScrollChoreography() {
  const prog = document.createElement('div');
  prog.className = 'qb-scroll-progress';
  document.body.appendChild(prog);

  const sections = Array.from(document.querySelectorAll('main > section'));
  let minimapItems = [];

  if (sections.length >= 2) {
    const minimap = document.createElement('nav');
    minimap.className = 'qb-minimap-index';
    minimap.setAttribute('aria-label', 'Section Minimap Index');

    const linksHTML = sections
      .map((sec, idx) => {
        if (!sec.id) sec.id = `qb-sec-${idx + 1}`;
        const tag = sec.querySelector('.section-tag, .hero-badge')?.textContent?.trim();
        const heading = sec.querySelector('h1, h2')?.textContent?.trim();
        let label = tag || heading || `Section ${idx + 1}`;
        if (label.length > 20) label = label.slice(0, 18) + '…';
        const num = String(idx + 1).padStart(2, '0');
        return `<a href="#${sec.id}" class="qb-minimap-item" data-sec-id="${sec.id}"><span>${num}</span> <span>${label}</span></a>`;
      })
      .join('');

    minimap.innerHTML = `
      <div class="qb-minimap-header">
        <span>INDEX // MAP</span>
        <span id="qb-scroll-pct">0%</span>
      </div>
      ${linksHTML}
    `;
    document.body.appendChild(minimap);
    minimapItems = Array.from(minimap.querySelectorAll('.qb-minimap-item'));
  }

  const pctEl = document.getElementById('qb-scroll-pct');

  function onScroll() {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = docH > 0 ? Math.min(1, Math.max(0, window.scrollY / docH)) : 0;
    prog.style.transform = `scaleX(${ratio.toFixed(4)})`;
    if (pctEl) pctEl.textContent = `${Math.round(ratio * 100)}%`;

    if (minimapItems.length) {
      const triggerY = window.innerHeight * 0.38;
      let activeId = sections[0]?.id;
      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= triggerY) {
          activeId = sec.id;
        }
      });
      minimapItems.forEach((item) => {
        item.classList.toggle('is-active', item.getAttribute('data-sec-id') === activeId);
      });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// 6. Dual-Layer Character-Split Wave Hover (danilodemarco.com inspired)
function initSplitTextHover() {
  const targets = document.querySelectorAll('.dropdown-link, .footer-links a');
  targets.forEach((el) => {
    if (el.children.length > 0 || el.dataset.splitDone) return;
    const text = el.textContent.trim();
    if (!text || text.length > 28) return;
    el.dataset.splitDone = 'true';

    const buildChars = (str) =>
      Array.from(str)
        .map((ch, idx) => `<span class="qb-char" style="--char-index:${idx}">${ch === ' ' ? '&nbsp;' : ch}</span>`)
        .join('');

    el.innerHTML = `
      <span class="qb-split-wrap">
        <span class="qb-split-layer layer-orig">${buildChars(text)}</span>
        <span class="qb-split-layer layer-clone" aria-hidden="true">${buildChars(text)}</span>
      </span>
    `;
  });
}

// 7. Cryptographic / Algorithmic Glyph Typer (2xa.studio & React Bits DecryptedText)
function initDecryptedText() {
  const GLYPHS = '01ΔΣΩΨΛΦΠΞ#/_+=';
  const targets = document.querySelectorAll('.section-tag, [data-decrypt]');

  function scrambleElement(el) {
    if (el.dataset.scrambling === 'true') return;
    const original = el.dataset.origText || el.textContent.trim();
    el.dataset.origText = original;
    el.dataset.scrambling = 'true';

    let iteration = 0;
    const total = original.length;
    const interval = setInterval(() => {
      el.textContent = original
        .split('')
        .map((char, idx) => {
          if (char === ' ') return ' ';
          if (idx < iteration) return original[idx];
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');

      iteration += Math.max(0.5, total / 14);
      if (iteration >= total) {
        clearInterval(interval);
        el.textContent = original;
        el.dataset.scrambling = 'false';
      }
    }, 28);
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scrambleElement(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    targets.forEach((t) => io.observe(t));
  }

  targets.forEach((t) => {
    t.addEventListener('mouseenter', () => scrambleElement(t));
  });
}

// 8. Cursor-Reactive Radial Spotlight + 3D Perspective Tilt + Magnetic Pull (React Bits)
function initSpotlightAndMagnet(Sound) {
  const cardSelector = '.card, .timeline-step, .team-card, .office-card, .blog-card, .news-card, .job-card, .bento-cell';

  document.addEventListener(
    'mousemove',
    (e) => {
      const card = e.target.closest(cardSelector);
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    },
    { passive: true }
  );

  // Subtle acoustic tick on card & button hover
  document.querySelectorAll(`${cardSelector}, .btn`).forEach((el) => {
    el.addEventListener('mouseenter', () => {
      Sound.playTick(1420, 0.014, 0.018);
    });
  });

  // Magnetic button pull
  const magnets = document.querySelectorAll('.btn, .email-pill');
  magnets.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate3d(${(dx * 0.18).toFixed(1)}px, ${(dy * 0.22).toFixed(1)}px, 0)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// 9. Custom Magnetic Spring Cursor & Context-Aware Pill Host (thibaut.cool & danilodemarco)
function initCustomCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const ring = document.createElement('div');
  ring.className = 'qb-cursor-ring';
  const pill = document.createElement('div');
  pill.className = 'qb-cursor-pill';
  document.body.appendChild(ring);
  document.body.appendChild(pill);

  let cx = -100, cy = -100, tx = -100, ty = -100;

  window.addEventListener(
    'mousemove',
    (e) => {
      tx = e.clientX;
      ty = e.clientY;

      const hoverTarget = e.target.closest(
        '[data-cursor-label], .team-card, .article-card, .blog-card, .job-card, .news-card, .timeline-step, a, button'
      );

      if (hoverTarget) {
        ring.classList.add('is-hovering');
        let label = hoverTarget.getAttribute('data-cursor-label') || '';
        if (!label) {
          if (hoverTarget.classList.contains('team-card')) label = 'VIEW BIO ↗';
          else if (hoverTarget.classList.contains('article-card') || hoverTarget.classList.contains('blog-card')) label = 'READ ARTICLE ↗';
          else if (hoverTarget.classList.contains('job-card')) label = 'APPLY NOW ↗';
          else if (hoverTarget.classList.contains('news-card')) label = 'PRESS RELEASE ↗';
          else if (hoverTarget.classList.contains('timeline-step')) label = 'PHASE SPEC';
        }
        if (label) {
          pill.textContent = label;
          pill.classList.add('is-visible');
        } else {
          pill.classList.remove('is-visible');
        }
      } else {
        ring.classList.remove('is-hovering');
        pill.classList.remove('is-visible');
      }
    },
    { passive: true }
  );

  function loopCursor() {
    cx += (tx - cx) * 0.18;
    cy += (ty - cy) * 0.18;
    const rw = ring.offsetWidth / 2 || 17;
    const rh = ring.offsetHeight / 2 || 17;
    ring.style.transform = `translate3d(${(cx - rw).toFixed(1)}px, ${(cy - rh).toFixed(1)}px, 0)`;
    pill.style.transform = `translate3d(${(cx + 22).toFixed(1)}px, ${(cy - 14).toFixed(1)}px, 0)`;
    requestAnimationFrame(loopCursor);
  }
  requestAnimationFrame(loopCursor);
}

// 10. Global Command Palette (⌘K / Ctrl+K)
function initCommandPalette(RollEngine, Sound) {
  const backdrop = document.createElement('div');
  backdrop.id = 'qb-cmd-palette';
  backdrop.className = 'qb-cmd-backdrop';
  backdrop.innerHTML = `
    <div class="qb-cmd-box" role="dialog" aria-label="Quantbot Command Palette">
      <div class="qb-cmd-input-wrap">
        <i class="fa fa-terminal text-mint"></i>
        <input type="text" class="qb-cmd-input" id="qb-cmd-search" placeholder="Search pages, executives, open roles, or type 'roll'..." autocomplete="off">
        <span class="mono-tag" style="font-size:0.65rem; color:var(--text-muted);">ESC</span>
      </div>
      <div class="qb-cmd-list" id="qb-cmd-results"></div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const COMMANDS = [
    { title: '🎲 Roll Random Aesthetic Synthesis', category: 'Interactive Lab', action: () => RollEngine.roll() },
    { title: 'Switch Theme: Sovereign Navy (Default)', category: 'Theme Palette', action: () => RollEngine.setTheme('sovereign-navy') },
    { title: 'Switch Theme: Atelier Gold (Luxury Didone)', category: 'Theme Palette', action: () => RollEngine.setTheme('atelier-gold') },
    { title: 'Switch Theme: Swiss Editorial (Archival Broadsheet)', category: 'Theme Palette', action: () => RollEngine.setTheme('swiss-editorial') },
    { title: 'Switch Theme: Vision Spatial (Optical Glass)', category: 'Theme Palette', action: () => RollEngine.setTheme('vision-spatial') },
    { title: 'Switch Theme: Titanium Quant (Hardware Bezels)', category: 'Theme Palette', action: () => RollEngine.setTheme('titanium-quant') },
    { title: 'Toggle 12-Column Swiss Architectural Grid [G]', category: 'Layout Helper', action: () => document.getElementById('qb-btn-grid')?.click() },
    { title: 'Home — Quantitative Investment Strategies', category: 'Navigation', url: 'index.html' },
    { title: 'About Us & Executive Leadership', category: 'Navigation', url: 'about-us.html' },
    { title: 'Proof of Concept (POC) Program', category: 'Navigation', url: 'proof-of-concept.html' },
    { title: 'QMM Multi-Manager Setup', category: 'Navigation', url: 'qmm-setup.html' },
    { title: 'Meet the Founders — Paul White & Michael Botlo', category: 'Navigation', url: 'meet-the-founders.html' },
    { title: 'Careers & Quantitative Job Openings', category: 'Navigation', url: 'careers.html' },
    { title: 'News & Global Media Archive', category: 'Navigation', url: 'news.html' },
    { title: 'Blog & Quantitative Insights', category: 'Navigation', url: 'blog.html' },
    { title: 'Contact Us & 6 Global Offices', category: 'Navigation', url: 'contact-us.html' },
  ];

  const input = document.getElementById('qb-cmd-search');
  const resultsEl = document.getElementById('qb-cmd-results');

  function renderResults(q = '') {
    const query = q.trim().toLowerCase();
    const filtered = COMMANDS.filter(
      (c) => !query || c.title.toLowerCase().includes(query) || c.category.toLowerCase().includes(query)
    );
    resultsEl.innerHTML = filtered
      .map(
        (c, idx) => `
      <div class="qb-cmd-item" data-cmd-idx="${idx}">
        <span>${c.title}</span>
        <span class="mono-tag" style="font-size:0.65rem; opacity:0.65;">${c.category}</span>
      </div>
    `
      )
      .join('');

    resultsEl.querySelectorAll('.qb-cmd-item').forEach((item, idx) => {
      item.addEventListener('click', () => {
        const cmd = filtered[idx];
        togglePalette(false);
        if (cmd.url) window.location.href = cmd.url;
        else if (cmd.action) cmd.action();
      });
    });
  }

  function togglePalette(force) {
    const open = typeof force === 'boolean' ? force : !backdrop.classList.contains('is-open');
    backdrop.classList.toggle('is-open', open);
    if (open) {
      Sound.playTick(1200, 0.025);
      input.value = '';
      renderResults('');
      setTimeout(() => input.focus(), 40);
    }
  }

  window.toggleCommandPalette = togglePalette;

  input?.addEventListener('input', (e) => renderResults(e.target.value));
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) togglePalette(false);
  });

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      togglePalette();
    } else if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
      togglePalette(false);
    }
  });
}

// 11. Interactive QuantLab Strategy & Alpha Backtest Simulator (Homepage Upgrade)
function initQuantLabSimulator(Sound) {
  const canvas = document.getElementById('quantlab-chart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const CONFIGS = {
    equities: { sharpe: '2.84', alpha: '+19.6%', dd: '-3.1%', latency: '84μs', slope: 1.35, vol: 0.22 },
    futures: { sharpe: '3.12', alpha: '+22.4%', dd: '-2.6%', latency: '42μs', slope: 1.52, vol: 0.18 },
    statarb: { sharpe: '3.48', alpha: '+24.9%', dd: '-1.9%', latency: '28μs', latencyLabel: '28μs', slope: 1.68, vol: 0.14 },
    mlalpha: { sharpe: '3.76', alpha: '+28.2%', dd: '-2.2%', latency: '65μs', slope: 1.85, vol: 0.16 },
  };

  const HORIZONS = {
    intraday: { mult: 1.08, points: 90 },
    short: { mult: 1.0, points: 90 },
    medium: { mult: 0.94, points: 90 },
  };

  let activeAsset = 'statarb';
  let activeHorizon = 'intraday';
  let animProgress = 0;
  let animFrame = null;
  let seriesQuant = [];
  let seriesBench = [];

  function generateSeries() {
    const cfg = CONFIGS[activeAsset] || CONFIGS.statarb;
    const hrz = HORIZONS[activeHorizon] || HORIZONS.intraday;
    const n = hrz.points;
    seriesQuant = [100];
    seriesBench = [100];

    let qVal = 100;
    let bVal = 100;
    for (let i = 1; i < n; i++) {
      const deterministicWave = Math.sin(i * 0.25) * cfg.vol + Math.cos(i * 0.13) * (cfg.vol * 0.7);
      qVal += (cfg.slope * hrz.mult) * 0.35 + deterministicWave + (Math.random() - 0.42) * 0.45;
      bVal += 0.14 + Math.sin(i * 0.19) * 0.45 + (Math.random() - 0.48) * 0.55;
      seriesQuant.push(qVal);
      seriesBench.push(bVal);
    }

    // Update DOM metric readouts
    const elSharpe = document.getElementById('ql-metric-sharpe');
    const elAlpha = document.getElementById('ql-metric-alpha');
    const elDd = document.getElementById('ql-metric-dd');
    const elLat = document.getElementById('ql-metric-latency');

    if (elSharpe) elSharpe.textContent = (parseFloat(cfg.sharpe) * hrz.mult).toFixed(2);
    if (elAlpha) elAlpha.textContent = cfg.alpha;
    if (elDd) elDd.textContent = cfg.dd;
    if (elLat) elLat.textContent = cfg.latency;

    animProgress = 0;
    cancelAnimationFrame(animFrame);
    animateChart();
  }

  function animateChart() {
    animProgress = Math.min(1, animProgress + 0.04);
    drawChart(animProgress);
    if (animProgress < 1) {
      animFrame = requestAnimationFrame(animateChart);
    }
  }

  function drawChart(progress) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = (rect.width - 32) * dpr;
    canvas.height = (rect.height - 32) * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = rect.width - 32;
    const h = rect.height - 32;
    ctx.clearRect(0, 0, w, h);

    // Subtle horizontal grid lines
    ctx.strokeStyle = 'rgba(148, 201, 126, 0.12)';
    ctx.lineWidth = 1;
    for (let r = 1; r <= 4; r++) {
      const y = (h / 5) * r;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const allVals = [...seriesQuant, ...seriesBench];
    const minV = Math.min(...allVals) - 2;
    const maxV = Math.max(...allVals) + 3;
    const count = Math.max(2, Math.floor(seriesQuant.length * progress));

    const toXY = (arr, i) => ({
      x: (i / (seriesQuant.length - 1)) * w,
      y: h - ((arr[i] - minV) / (maxV - minV)) * (h - 24) - 12,
    });

    // Draw Benchmark Curve (dashed muted)
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < count; i++) {
      const pt = toXY(seriesBench, i);
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Quantbot Alpha Curve + Gradient Fill
    ctx.beginPath();
    for (let i = 0; i < count; i++) {
      const pt = toXY(seriesQuant, i);
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.strokeStyle = '#94C97E';
    ctx.lineWidth = 2.6;
    ctx.stroke();

    const lastPt = toXY(seriesQuant, count - 1);
    ctx.lineTo(lastPt.x, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(148, 201, 126, 0.32)');
    grad.addColorStop(1, 'rgba(148, 201, 126, 0.0)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Glowing terminal dot on leading edge
    ctx.beginPath();
    ctx.arc(lastPt.x, lastPt.y, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#E6D5B8';
    ctx.fill();
  }

  document.querySelectorAll('[data-ql-asset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      Sound.playTick(1180, 0.025);
      document.querySelectorAll('[data-ql-asset]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeAsset = btn.getAttribute('data-ql-asset');
      generateSeries();
    });
  });

  document.querySelectorAll('[data-ql-horizon]').forEach((btn) => {
    btn.addEventListener('click', () => {
      Sound.playTick(1320, 0.025);
      document.querySelectorAll('[data-ql-horizon]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeHorizon = btn.getAttribute('data-ql-horizon');
      generateSeries();
    });
  });

  document.getElementById('ql-btn-resimulate')?.addEventListener('click', () => {
    Sound.playChime();
    generateSeries();
  });

  window.addEventListener('resize', () => drawChart(1));
  generateSeries();
}

// 12. Interactive Global Hub Bento Matrix Switcher
function initGlobalHubMatrix(Sound) {
  const hubBtns = document.querySelectorAll('[data-hub-select]');
  if (!hubBtns.length) return;

  const HUB_DATA = {
    ny: {
      city: 'New York Headquarters',
      coords: '40.7549° N, 73.9840° W',
      address: '505 Fifth Avenue, 6th Floor, New York, NY 10017',
      focus: 'Americas Cash Equities, Electronic Futures, Core Alpha Research & Executive Operations',
      img: 'assets/ny.png',
      latency: '0.18ms NY4 Equinix Co-Location',
    },
    london: {
      city: 'London European Hub',
      coords: '51.5142° N, 0.0858° W',
      address: '125 Old Broad Street, 26th Floor, London EC2N 1AR',
      focus: 'EMEA Pan-European Equities, FTSE/Eurex Derivatives & Multi-Manager QMM Pods',
      img: 'assets/london.png',
      latency: '0.24ms LD4 Slough Direct Fiber',
    },
    hk: {
      city: 'Hong Kong APAC Hub',
      coords: '22.2819° N, 114.1581° E',
      address: '4-4A Des Voeux Road Central, Hong Kong',
      focus: 'APAC Cash Equities (HKEX, TSE, ASX), Asian Index Futures & Cross-Market Arbitrage',
      img: 'assets/hk.png',
      latency: '0.31ms HK1 Ultra-Low Latency Ring',
    },
    miami: {
      city: 'Miami Quantitative Center',
      coords: '25.7617° N, 80.1918° W',
      address: '1111 Brickell Avenue, Miami, FL 33131',
      focus: 'Systematic Portfolio Management, High-Performance Compute Engineering & Quantitative Research',
      img: 'assets/miami.png',
      latency: 'Direct Dedicated Optical Backbone',
    },
  };

  hubBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      Sound.playTick(1050, 0.025);
      hubBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.getAttribute('data-hub-select');
      const data = HUB_DATA[key];
      if (!data) return;

      const imgEl = document.getElementById('qb-hub-img');
      const titleEl = document.getElementById('qb-hub-title');
      const coordsEl = document.getElementById('qb-hub-coords');
      const addrEl = document.getElementById('qb-hub-addr');
      const focusEl = document.getElementById('qb-hub-focus');
      const latEl = document.getElementById('qb-hub-latency');

      if (imgEl) imgEl.src = data.img;
      if (titleEl) titleEl.textContent = data.city;
      if (coordsEl) coordsEl.textContent = data.coords;
      if (addrEl) addrEl.textContent = data.address;
      if (focusEl) focusEl.textContent = data.focus;
      if (latEl) latEl.textContent = data.latency;
    });
  });
}

// 13. Fluid 7-Stage Presentation Deck Engine (Lenis + GSAP ScrollTrigger + Native Scrubbing)
function initPresentationDeckEngine(Sound) {
  // Initialize Lenis Smooth Scroll globally if available
  let lenis = null;
  if (typeof window.Lenis !== 'undefined') {
    try {
      lenis = new window.Lenis({
        duration: 1.12,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
        window.gsap.registerPlugin(window.ScrollTrigger);
        lenis.on('scroll', window.ScrollTrigger.update);
        window.gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        window.gsap.ticker.lagSmoothing(0);
      } else {
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    } catch (_) {
      lenis = null;
    }
  }

  const deckEl = document.getElementById('qb-presentation-deck');
  if (!deckEl) return;

  const stages = Array.from(deckEl.querySelectorAll('.p-stage'));
  if (stages.length < 2) return;

  // Split Stage 04 Founding Quote into individual illuminatable words
  const quoteEl = document.getElementById('stage4-kinetic-quote');
  let quoteWordEls = [];
  if (quoteEl && !quoteEl.dataset.wordsSplit) {
    quoteEl.dataset.wordsSplit = 'true';
    const rawWords = quoteEl.textContent.trim().split(/\s+/);
    quoteEl.innerHTML = rawWords
      .map((w, i) => `<span class="qb-quote-word" data-word-idx="${i}">${w}</span>`)
      .join(' ');
    quoteWordEls = Array.from(quoteEl.querySelectorAll('.qb-quote-word'));
  }

  const PILLAR_TITLES = [
    'Pillar 01: Global Footprint',
    'Pillar 02: Quantitative Methodologies',
    'Pillar 03: Streamlined Business Process',
    'Pillar 04: Research & Infrastructure',
  ];

  const PHASE_TITLES = [
    'PHASE 01 // 06 — IDEA GENERATION',
    'PHASE 02 // 06 — DATA ANALYSIS',
    'PHASE 03 // 06 — CODE DEVELOPMENT',
    'PHASE 04 // 06 — TRADING LOGIC & RISK',
    'PHASE 05 // 06 — PAPER TRADING & TESTING',
    'PHASE 06 // 06 — LIVE TRADING',
  ];

  const STAGE_META = stages.map((sec, idx) => ({
    index: idx,
    id: sec.id || `stage-0${idx + 1}`,
    num: sec.getAttribute('data-stage-num') || `0${idx + 1}`,
    label: sec.getAttribute('data-stage-label') || `Stage 0${idx + 1}`,
    el: sec,
  }));

  let currentStageIdx = 0;
  let currentPillarIdx = 0;
  let currentPhaseIdx = 0;
  let autoPlayTimer = null;

  // Create Single Sleek Bottom-Center Presentation Stage HUD
  const hud = document.createElement('nav');
  hud.className = 'p-deck-hud';
  hud.setAttribute('aria-label', 'Presentation Stage Director');
  hud.innerHTML = `
    <div class="p-hud-stages">
      ${STAGE_META.map(
        (st, idx) => `
        <button type="button" class="p-hud-pill ${idx === 0 ? 'is-active' : ''}" data-hud-stage="${idx}" title="Jump to Stage ${st.num}: ${st.label}">
          <span>${st.num}</span>
          <span class="p-hud-pill-label">${st.label}</span>
        </button>
      `
      ).join('')}
    </div>
    <span class="p-hud-divider"></span>
    <button type="button" class="p-hud-next-btn" id="p-hud-next" title="Scroll or Click to Present Next">
      <span id="p-hud-next-label">NEXT: PILLAR 01 — GLOBAL FOOTPRINT ↓</span>
    </button>
    <button type="button" class="p-hud-icon-btn" id="p-hud-autoplay" title="Auto-Present Keynote Deck (Shortcut: P)">
      <i class="fa fa-play"></i>
    </button>
  `;
  document.body.appendChild(hud);

  const hudPills = Array.from(hud.querySelectorAll('.p-hud-pill'));
  const nextLabelEl = document.getElementById('p-hud-next-label');
  const nextBtnEl = document.getElementById('p-hud-next');
  const autoPlayBtn = document.getElementById('p-hud-autoplay');

  function smoothScrollToY(targetY) {
    if (lenis) {
      lenis.scrollTo(targetY, { duration: 1.05 });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }

  function scrollToStage(stageIdx, subRatio = 0) {
    const clamped = Math.max(0, Math.min(STAGE_META.length - 1, stageIdx));
    const sec = STAGE_META[clamped].el;
    if (!sec) return;
    const headerOffset = 80;
    const top = sec.offsetTop - headerOffset;
    const scrollable = Math.max(0, sec.offsetHeight - window.innerHeight);
    smoothScrollToY(top + scrollable * subRatio);
  }

  // Stage 02 Pillar state updater
  const pillarTabs = Array.from(document.querySelectorAll('.p-pillar-tab'));
  const pillarCards = Array.from(document.querySelectorAll('.p-deck-card'));

  function setActivePillar(idx) {
    const clamped = Math.max(0, Math.min(pillarCards.length - 1, idx));
    if (clamped !== currentPillarIdx) {
      currentPillarIdx = clamped;
      Sound.playTick(1220 + clamped * 90, 0.02, 0.02);
    }
    pillarTabs.forEach((tab, i) => tab.classList.toggle('is-active', i === clamped));
    pillarCards.forEach((card, i) => {
      card.classList.toggle('is-past', i < clamped);
      card.classList.toggle('is-active', i === clamped);
      card.classList.toggle('is-next', i === clamped + 1);
    });
  }

  pillarTabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      setActivePillar(idx);
      const sec2 = document.getElementById('stage-02');
      if (sec2 && window.innerWidth > 1120) {
        const scrollable = Math.max(0, sec2.offsetHeight - window.innerHeight);
        const targetY = sec2.offsetTop - 70 + scrollable * ((idx + 0.2) / pillarCards.length);
        smoothScrollToY(targetY);
      }
    });
  });

  // Stage 03 Pipeline state updater
  const pipelineTrack = document.getElementById('p-pipeline-track');
  const phaseCards = Array.from(document.querySelectorAll('.p-phase-card'));
  const pipeCodeEl = document.getElementById('p-pipe-active-code');
  const pipeFillEl = document.getElementById('p-pipe-progress-fill');

  function updatePipelineStage(progress) {
    const p = Math.min(1, Math.max(0, progress));
    const idx = Math.min(phaseCards.length - 1, Math.max(0, Math.floor(p * phaseCards.length)));

    if (idx !== currentPhaseIdx) {
      currentPhaseIdx = idx;
      Sound.playTick(1160 + idx * 75, 0.02, 0.02);
    }

    phaseCards.forEach((card, i) => {
      card.classList.toggle('is-active', i === idx);
      card.classList.toggle('is-complete', i < idx);
    });

    if (pipeCodeEl && PHASE_TITLES[idx]) {
      pipeCodeEl.textContent = PHASE_TITLES[idx];
    }
    if (pipeFillEl) {
      pipeFillEl.style.width = `${Math.max(16.6, p * 100).toFixed(1)}%`;
    }

    if (pipelineTrack && pipelineTrack.parentElement && window.innerWidth > 1120) {
      const viewportW = pipelineTrack.parentElement.clientWidth;
      const trackW = pipelineTrack.scrollWidth;
      const maxShift = Math.max(0, trackW - viewportW + 96);
      const shiftX = p * maxShift;
      pipelineTrack.style.transform = `translate3d(${-shiftX.toFixed(1)}px, 0, 0)`;
    } else if (pipelineTrack) {
      pipelineTrack.style.transform = '';
    }
  }

  phaseCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      const sec3 = document.getElementById('stage-03');
      if (sec3 && window.innerWidth > 1120) {
        const scrollable = Math.max(0, sec3.offsetHeight - window.innerHeight);
        const targetY = sec3.offsetTop - 70 + scrollable * ((idx + 0.15) / phaseCards.length);
        smoothScrollToY(targetY);
      } else {
        updatePipelineStage((idx + 0.1) / phaseCards.length);
      }
    });
  });

  // Stage 04 Story Cards click interaction
  const storyCards = Array.from(document.querySelectorAll('.p-story-card'));
  storyCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      Sound.playTick(1280, 0.02, 0.02);
      storyCards.forEach((c, i) => c.classList.toggle('is-active', i === idx));
    });
  });

  function computeNextLabel() {
    if (currentStageIdx === 0) {
      return 'NEXT: STAGE 02 — WHAT MAKES US DIFFERENT ↓';
    }
    if (currentStageIdx === 1) {
      if (currentPillarIdx + 1 < PILLAR_TITLES.length) {
        return `SCROLL NEXT: ${PILLAR_TITLES[currentPillarIdx + 1].toUpperCase()} ↓`;
      }
      return 'NEXT: STAGE 03 — STRATEGY PIPELINE ↓';
    }
    if (currentStageIdx === 2) {
      if (currentPhaseIdx + 1 < PHASE_TITLES.length) {
        return `SCROLL NEXT: ${PHASE_TITLES[currentPhaseIdx + 1]} ↓`;
      }
      return 'NEXT: STAGE 04 — OUR STORY ↓';
    }
    if (currentStageIdx + 1 < STAGE_META.length) {
      const nextSt = STAGE_META[currentStageIdx + 1];
      return `NEXT: STAGE ${nextSt.num} — ${nextSt.label.toUpperCase()} ↓`;
    }
    return 'RETURN TO STAGE 01 — OPENING KEYNOTE ↺';
  }

  function advancePresentation() {
    if (currentStageIdx === 1 && currentPillarIdx + 1 < PILLAR_TITLES.length && window.innerWidth > 1120) {
      scrollToStage(1, (currentPillarIdx + 1.2) / PILLAR_TITLES.length);
    } else if (currentStageIdx === 2 && currentPhaseIdx + 1 < PHASE_TITLES.length && window.innerWidth > 1120) {
      scrollToStage(2, (currentPhaseIdx + 1.15) / PHASE_TITLES.length);
    } else if (currentStageIdx + 1 < STAGE_META.length) {
      scrollToStage(currentStageIdx + 1, 0);
    } else {
      scrollToStage(0, 0);
    }
  }

  // Main Scroll Evaluation Loop
  function onDeckScroll() {
    const vh = window.innerHeight;
    let detectedStage = 0;

    stages.forEach((sec, idx) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= vh * 0.45 && rect.bottom >= vh * 0.35) {
        detectedStage = idx;
      }

      // Stage 02: Pinned 4-Slide Pillar Stack
      if (sec.id === 'stage-02' && window.innerWidth > 1120) {
        const scrollable = Math.max(1, rect.height - vh * 0.9);
        const rawP = (vh * 0.18 - rect.top) / scrollable;
        const p = Math.min(1, Math.max(0, rawP));
        const pillarIdx = Math.min(3, Math.max(0, Math.floor(p * 4)));
        setActivePillar(pillarIdx);
      }

      // Stage 03: Pinned Horizontal 6-Phase Pipeline Conveyor
      if (sec.id === 'stage-03') {
        const scrollable = Math.max(1, rect.height - vh * 0.9);
        const rawP = (vh * 0.18 - rect.top) / scrollable;
        const p = Math.min(1, Math.max(0, rawP));
        updatePipelineStage(p);
      }

      // Stage 04: Word-by-word Founding Quote Illumination & Story Card Spotlight
      if (sec.id === 'stage-04') {
        const rawP = (vh * 0.78 - rect.top) / Math.max(1, rect.height * 0.85);
        const p = Math.min(1, Math.max(0, rawP));
        if (quoteWordEls.length) {
          const litCount = Math.ceil(p * quoteWordEls.length);
          quoteWordEls.forEach((wEl, i) => wEl.classList.toggle('is-word-lit', i <= litCount));
        }
        if (storyCards.length) {
          const sIdx = Math.min(storyCards.length - 1, Math.max(0, Math.floor(p * storyCards.length)));
          storyCards.forEach((c, i) => c.classList.toggle('is-active', i === sIdx));
        }
      }
    });

    if (detectedStage !== currentStageIdx) {
      const dir = detectedStage > currentStageIdx ? 1 : -1;
      currentStageIdx = detectedStage;
      Sound.playChime();
      window.QuantCanvas?.pulseWarp(dir);
    }

    hudPills.forEach((pill, idx) => {
      pill.classList.toggle('is-active', idx === currentStageIdx);
    });

    if (nextLabelEl) {
      nextLabelEl.textContent = computeNextLabel();
    }
  }

  window.addEventListener('scroll', onDeckScroll, { passive: true });
  window.addEventListener('resize', onDeckScroll);

  // Bind HUD Stage Buttons
  hudPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const idx = parseInt(pill.getAttribute('data-hud-stage'), 10);
      scrollToStage(idx, 0);
    });
  });

  nextBtnEl?.addEventListener('click', () => advancePresentation());

  function toggleAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
      autoPlayBtn?.classList.remove('is-active');
      if (autoPlayBtn) autoPlayBtn.innerHTML = '<i class="fa fa-play"></i>';
    } else {
      Sound.playChime();
      autoPlayBtn?.classList.add('is-active');
      if (autoPlayBtn) autoPlayBtn.innerHTML = '<i class="fa fa-pause"></i>';
      autoPlayTimer = setInterval(() => {
        advancePresentation();
      }, 3200);
    }
  }

  autoPlayBtn?.addEventListener('click', toggleAutoPlay);

  // Smoothly intercept internal #stage-XX anchor links
  document.querySelectorAll('a[href^="#stage-"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      const target = href ? document.querySelector(href) : null;
      if (target) {
        e.preventDefault();
        const stIdx = stages.indexOf(target);
        if (stIdx >= 0) scrollToStage(stIdx, 0);
      }
    });
  });

  // GSAP 3 + ScrollTrigger Stage Entrance & Parallax Choreography
  if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
    const gsap = window.gsap;

    // Stage 01 Opening Keynote Entrance Timeline
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .from('.p-stage-hero .p-eyebrow', { y: 20, opacity: 0, duration: 0.7 })
      .from('.p-hero-title .p-line', { y: 36, opacity: 0, duration: 0.85, stagger: 0.12 }, '-=0.45')
      .from('.p-hero-lead', { y: 24, opacity: 0, duration: 0.75 }, '-=0.55')
      .from('.p-hero-actions .btn', { y: 18, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.5')
      .from('.p-hero-plinth .p-plinth-item', { y: 24, opacity: 0, duration: 0.65, stagger: 0.08 }, '-=0.45');

    // Stage 04, 05, 06, 07 ScrollTrigger Reveal Animations
    ['#stage-04', '#stage-05', '#stage-06', '#stage-07'].forEach((sel) => {
      const sec = document.querySelector(sel);
      if (!sec) return;
      const elems = sec.querySelectorAll('.p-eyebrow, .p-stage-title, .p-stage-desc, .quantlab-shell, .bento-cell, .p-story-card');
      gsap.from(elems, {
        scrollTrigger: {
          trigger: sec,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
        y: 32,
        opacity: 0,
        duration: 0.75,
        stagger: 0.07,
        ease: 'power3.out',
      });
    });
  }

  // Keyboard shortcuts for Presentation Deck (PageDown, PageUp, ArrowRight, ArrowLeft, P)
  window.addEventListener('keydown', (e) => {
    const tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target?.isContentEditable) return;
    if (document.getElementById('qb-cmd-palette')?.classList.contains('is-open')) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    if (e.key.toLowerCase() === 'p') {
      e.preventDefault();
      toggleAutoPlay();
    } else if (e.key === 'PageDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      advancePresentation();
    } else if (e.key === 'PageUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollToStage(Math.max(0, currentStageIdx - 1), 0);
    }
  });

  // Initial state setup
  setActivePillar(0);
  updatePipelineStage(0);
  onDeckScroll();

  window.QuantDeck = {
    scrollToStage,
    advancePresentation,
    setActivePillar,
    updatePipelineStage,
    toggleAutoPlay,
  };
}
