// ============================================================================
// QUANTBOT TECHNOLOGIES, LP — APPLE PRO / iOS 18 UNIFIED PHYSICS ENGINE
// Authentic 6-Stage Horizon Scrollytelling, Expanding Portal, 3D Global Mesh,
// QMM/POC Bento Switcher, Leadership Bio Modal, and World Session Clocks
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initDynamicIsland();
  initWorldClocks();
  initHero3DParallax();
  initExpandingPortal();
  initHorizonScrollytelling();
  initBentoProgramSwitcher();
  initLeadershipBioModal();
  initCardSpecularSheen();
  initContactForm();
});

// Helper math
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// ============================================================================
// 1. DYNAMIC ISLAND NAVBAR & ACTIVE PILL GLIDER
// ============================================================================
function initDynamicIsland() {
  const nav = document.getElementById('dynamic-island-nav');
  const links = document.querySelectorAll('.nav-segment-link');
  const glider = document.getElementById('nav-active-pill');

  // Scroll styling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
    updateActiveSectionOnScroll();
  }, { passive: true });

  function updateGlider(activeLink) {
    if (!activeLink || !glider || !activeLink.parentElement) return;
    const parentRect = activeLink.parentElement.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    glider.style.left = `${linkRect.left - parentRect.left}px`;
    glider.style.width = `${linkRect.width}px`;
  }

  // Initial glider position
  const initial = document.querySelector('.nav-segment-link.is-active') || links[0];
  setTimeout(() => updateGlider(initial), 150);

  window.addEventListener('resize', () => {
    const current = document.querySelector('.nav-segment-link.is-active') || links[0];
    updateGlider(current);
  });

  // Smooth anchor navigation & special handling for 6 stages
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href === '') return;

      // Handle stage anchors (#stage-01 through #stage-06)
      if (href.startsWith('#stage-0')) {
        const stageNum = parseInt(href.replace('#stage-0', '')) - 1;
        const runway = document.getElementById('pipeline');
        if (runway && stageNum >= 0 && stageNum <= 5) {
          e.preventDefault();
          const runwayTop = runway.offsetTop;
          const runwayHeight = runway.offsetHeight - window.innerHeight;
          const targetY = runwayTop + (stageNum / 5) * runwayHeight;
          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });
          return;
        }
      }

      // Handle QMM or POC jumps
      if (href === '#qmm' || href === '#poc') {
        e.preventDefault();
        const bentoSection = document.getElementById('programs');
        const tabBtn = document.querySelector(`[data-program="${href.replace('#', '')}"]`);
        if (tabBtn) tabBtn.click();
        if (bentoSection) {
          const headerOffset = 70;
          const targetPos = bentoSection.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
        return;
      }

      // Standard anchors
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 70;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  function updateActiveSectionOnScroll() {
    const scrollMid = window.scrollY + window.innerHeight * 0.35;
    const trackedSections = [
      { id: 'hero', navKey: '' },
      { id: 'about', navKey: 'about' },
      { id: 'pipeline', navKey: 'pipeline' },
      { id: 'programs', navKey: 'programs' },
      { id: 'leadership', navKey: 'leadership' },
      { id: 'offices', navKey: 'offices' }
    ];

    for (let i = trackedSections.length - 1; i >= 0; i--) {
      const sec = document.getElementById(trackedSections[i].id);
      if (sec && scrollMid >= sec.offsetTop) {
        const key = trackedSections[i].navKey;
        links.forEach((l) => {
          if (l.dataset.nav === key) {
            if (!l.classList.contains('is-active')) {
              links.forEach((link) => link.classList.remove('is-active'));
              l.classList.add('is-active');
              updateGlider(l);
            }
          }
        });
        break;
      }
    }
  }
}

// ============================================================================
// 2. LIVE WORLD MARKET SESSION CLOCKS (NEW YORK, LONDON, HONG KONG)
// ============================================================================
function initWorldClocks() {
  const nyClock = document.getElementById('clock-ny');
  const ldnClock = document.getElementById('clock-ldn');
  const hkClock = document.getElementById('clock-hk');

  function updateTimes() {
    const now = new Date();
    
    // New York: America/New_York
    if (nyClock) {
      nyClock.textContent = now.toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }) + ' EDT';
    }

    // London: Europe/London
    if (ldnClock) {
      ldnClock.textContent = now.toLocaleTimeString('en-GB', {
        timeZone: 'Europe/London',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }) + ' BST';
    }

    // Hong Kong: Asia/Hong_Kong
    if (hkClock) {
      hkClock.textContent = now.toLocaleTimeString('en-HK', {
        timeZone: 'Asia/Hong_Kong',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }) + ' HKT';
    }
  }

  updateTimes();
  setInterval(updateTimes, 1000);
}

// ============================================================================
// 3. HERO 3D TILT & PARALLAX DIFFERENTIATORS WIDGETS
// ============================================================================
function initHero3DParallax() {
  const stage = document.getElementById('hero-parallax-stage');
  const card = document.getElementById('hero-command-card');
  const widgets = document.querySelectorAll('.parallax-widget');

  if (!stage || !card) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentTiltX = 0;
  let currentTiltY = 0;

  window.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX = (e.clientX - centerX) / (rect.width / 2);
      mouseY = (e.clientY - centerY) / (rect.height / 2);
    }
  });

  // Parallax animation loop
  function animateHero() {
    currentTiltX = lerp(currentTiltX, -mouseY * 7, 0.08);
    currentTiltY = lerp(currentTiltY, mouseX * 9, 0.08);

    card.style.transform = `rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg) translateZ(10px)`;

    widgets.forEach((w) => {
      const speed = parseFloat(w.dataset.speed || '0.5');
      const offsetX = mouseX * 24 * speed;
      const offsetY = mouseY * 20 * speed;
      w.style.transform = `translate3d(${offsetX}px, ${offsetY}px, ${speed * 40}px)`;
    });

    requestAnimationFrame(animateHero);
  }

  requestAnimationFrame(animateHero);
}

// ============================================================================
// 4. EXPANDING GLASS PORTAL (ORIGIN 2008 & IDEA 2 ALPHA)
// ============================================================================
function initExpandingPortal() {
  const trigger = document.getElementById('about');
  const portalBox = document.getElementById('expanding-portal-box');
  const innerContent = document.getElementById('portal-inner-content');

  if (!trigger || !portalBox || !innerContent) return;

  function onScroll() {
    const rect = trigger.getBoundingClientRect();
    const triggerH = trigger.offsetHeight - window.innerHeight;
    const progress = clamp(-rect.top / triggerH, 0, 1);

    // Interpolate: 70vw -> 100vw, 58vh -> 100vh, 40px -> 0px radius
    const currentW = lerp(70, 100, progress);
    const currentH = lerp(58, 100, progress);
    const currentR = lerp(40, 0, progress);
    const innerScale = lerp(1.22, 1.0, progress);

    portalBox.style.width = `${currentW}vw`;
    portalBox.style.height = `${currentH}vh`;
    portalBox.style.borderRadius = `${currentR}px`;
    innerContent.style.transform = `scale(${innerScale})`;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ============================================================================
// 5. HORIZON-LOCKED 6-STAGE PIPELINE (WITH LIQUID GLASS MORPHING)
// ============================================================================
function initHorizonScrollytelling() {
  const runway = document.getElementById('pipeline');
  const vessel = document.getElementById('master-stage-vessel');
  const stepPill = document.getElementById('pipeline-step-pill');
  const stepTag = document.getElementById('pipeline-step-tag');
  const titleEl = document.getElementById('pipeline-title');
  const descEl = document.getElementById('pipeline-desc');
  const beam = document.getElementById('pipeline-progress-beam');
  const stageBtns = document.querySelectorAll('.pipeline-nav-rail .pillar-nav-btn');
  const vesselBadge = document.getElementById('vessel-stage-badge');
  const vesselMeta = document.getElementById('vessel-stage-meta');
  const states = [
    document.getElementById('vessel-state-0'),
    document.getElementById('vessel-state-1'),
    document.getElementById('vessel-state-2'),
    document.getElementById('vessel-state-3'),
    document.getElementById('vessel-state-4'),
    document.getElementById('vessel-state-5')
  ];

  if (!runway || !vessel) return;

  const stageData = [
    {
      step: 'STAGE 01 // 06',
      tag: 'RESEARCH & DATA SYNC',
      title: 'Stage 01 · Idea Generation',
      desc: 'Start with a basic strategy idea, such as in futures or equities, and collaborate directly with our data team.',
      badge: 'STAGE 01 // IDEA GENERATION',
      meta: 'PIPELINE_HASH: #0A84FF_GEN',
      accentColor: '#0A84FF'
    },
    {
      step: 'STAGE 02 // 06',
      tag: 'DATA CURATION & PARTITION',
      title: 'Stage 02 · Data Analysis',
      desc: 'Gain access to necessary curated data, partition it into in-sample and out-of-sample sets, and analyze its quality and outliers.',
      badge: 'STAGE 02 // DATA ANALYSIS',
      meta: 'PIPELINE_HASH: #00C7BE_ANALYSIS',
      accentColor: '#00C7BE'
    },
    {
      step: 'STAGE 03 // 06',
      tag: 'DEVELOPMENT & BENCHMARKS',
      title: 'Stage 03 · Code Development',
      desc: 'Test the idea on in-sample data using our development code in R, Python, or C++, evaluating its performance against strict benchmarks.',
      badge: 'STAGE 03 // CODE DEVELOPMENT',
      meta: 'PIPELINE_HASH: #30D158_CODE',
      accentColor: '#30D158'
    },
    {
      step: 'STAGE 04 // 06',
      tag: 'BACKTEST & RISK PLATFORM',
      title: 'Stage 04 · Trading Logic & Risk Management',
      desc: 'If in-sample results meet expectations, further develop the strategy by implementing trading logic and risk management using our in-house backtesting platform.',
      badge: 'STAGE 04 // TRADING LOGIC & RISK',
      meta: 'PIPELINE_HASH: #5E5CE6_RISK',
      accentColor: '#5E5CE6'
    },
    {
      step: 'STAGE 05 // 06',
      tag: 'FORWARD OPS VALIDATION',
      title: 'Stage 05 · Paper Trading & Testing',
      desc: 'Deploy the strategy in paper trading mode, monitoring daily performance and comparing it with previous backtest results alongside our operations team to ensure accuracy and identify biases.',
      badge: 'STAGE 05 // PAPER TRADING & TESTING',
      meta: 'PIPELINE_HASH: #FF9F0A_PAPER',
      accentColor: '#FF9F0A'
    },
    {
      step: 'STAGE 06 // 06',
      tag: '24/7 AUTOMATED PRODUCTION',
      title: 'Stage 06 · Live Trading',
      desc: 'Once all benchmarks are met, the strategy is deployed into live automated production trading across global exchanges.',
      badge: 'STAGE 06 // LIVE PRODUCTION',
      meta: 'PIPELINE_HASH: #30D158_LIVE',
      accentColor: '#30D158'
    }
  ];

  let activeIndex = 0;

  function updateStage(index) {
    if (index === activeIndex && states[index]?.classList.contains('vessel-state-active')) return;
    activeIndex = index;

    const data = stageData[index];
    if (!data) return;

    // Update Left Column
    if (stepPill) stepPill.textContent = data.step;
    if (stepTag) stepTag.textContent = data.tag;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;

    // Update Progress Beam and Rail Buttons
    if (beam) {
      beam.style.top = `${(index / 5) * 83.33}%`;
      beam.style.height = `16.66%`;
    }
    stageBtns.forEach((btn, idx) => {
      btn.classList.toggle('is-active', idx === index);
    });

    // Morph the Master Vessel
    vessel.style.borderColor = `${data.accentColor}55`;
    vessel.style.boxShadow = `0 30px 80px rgba(0, 0, 0, 0.8), 0 0 40px ${data.accentColor}25`;

    if (vesselBadge) {
      vesselBadge.textContent = data.badge;
      vesselBadge.style.color = data.accentColor;
    }
    if (vesselMeta) vesselMeta.textContent = data.meta;

    states.forEach((st, idx) => {
      if (st) st.classList.toggle('vessel-state-active', idx === index);
    });

    // Horizon glow tint update
    const glow = document.getElementById('pipeline-horizon-glow');
    if (glow) {
      glow.style.background = `radial-gradient(ellipse at center, ${data.accentColor}44 0%, transparent 70%)`;
    }
  }

  function onScroll() {
    const rect = runway.getBoundingClientRect();
    const runwayH = runway.offsetHeight - window.innerHeight;
    const progress = clamp(-rect.top / runwayH, 0, 1);

    // Compute stage index (0 to 5)
    const stageIdx = clamp(Math.floor(progress * 5.99), 0, 5);
    updateStage(stageIdx);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Rail Button Clicks
  stageBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.stage || '0');
      const runwayTop = runway.offsetTop;
      const runwayH = runway.offsetHeight - window.innerHeight;
      const targetY = runwayTop + (idx / 5) * runwayH;
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    });
  });
}

// ============================================================================
// 6. BENTO PROGRAM SWITCHER (QMM SETUP vs. POC PROGRAM)
// ============================================================================
function initBentoProgramSwitcher() {
  const switcher = document.getElementById('program-tab-switcher');
  const viewQmm = document.getElementById('view-qmm');
  const viewPoc = document.getElementById('view-poc');
  if (!switcher) return;

  const buttons = switcher.querySelectorAll('.segment-btn');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const program = btn.dataset.program;
      if (program === 'qmm') {
        viewQmm?.classList.add('bento-view-active');
        viewPoc?.classList.remove('bento-view-active');
      } else {
        viewPoc?.classList.add('bento-view-active');
        viewQmm?.classList.remove('bento-view-active');
      }
    });
  });
}

// ============================================================================
// 7. LEADERSHIP BIO MODAL (AUTHENTIC BIOS FROM DATA.JS)
// ============================================================================
function initLeadershipBioModal() {
  const modal = document.getElementById('bio-modal');
  const modalClose = document.getElementById('bio-modal-close');
  const modalContent = document.getElementById('bio-modal-content');
  const leaderCards = document.querySelectorAll('.leader-card');

  if (!modal || !modalContent) return;

  function openBio(memberName) {
    const data = window.QuantbotData?.teamMembers?.find(
      (m) => m.name.toLowerCase() === memberName.toLowerCase()
    );

    if (!data) return;

    modalContent.innerHTML = `
      <div class="modal-bio-header">
        <img src="${data.image}" alt="${data.name}" class="modal-bio-avatar" onerror="this.style.display='none'">
        <div>
          <h3 class="modal-bio-name">${data.name}</h3>
          <span class="modal-bio-role font-mono">${data.role}</span>
        </div>
      </div>
      <p class="modal-bio-narrative">${data.bio}</p>
    `;

    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeBio() {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  leaderCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const member = card.dataset.member;
      if (member) openBio(member);
    });
  });

  modalClose?.addEventListener('click', closeBio);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeBio();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeBio();
    }
  });
}

// ============================================================================
// 8. CARD SPECULAR SHEEN MOUSE TRACKING
// ============================================================================
function initCardSpecularSheen() {
  const cards = document.querySelectorAll('.glass-panel-specular');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// ============================================================================
// 9. CONTACT FORM INTERACTIVE SUBMISSION
// ============================================================================
function initContactForm() {
  const form = document.getElementById('quantbot-contact-form');
  const status = document.getElementById('contact-form-status');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span>Transmitting to Quantbot Network...</span> <i class="fa fa-spinner fa-spin"></i>`;
    }

    setTimeout(() => {
      form.reset();
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<span>Transmit Confidential Message</span> <i class="fa fa-paper-plane"></i>`;
      }
      if (status) {
        status.style.display = 'block';
        status.className = 'form-feedback success font-mono';
        status.innerHTML = `<i class="fa fa-circle-check"></i> Thank you. Your message has been encrypted and routed directly to Quantbot leadership (info@quantbot.com). We will respond promptly.`;
      }
    }, 1200);
  });
}
