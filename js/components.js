// ============================================================================
// QUANTBOT TECHNOLOGIES — APPLE PRO / iOS 18 UNIFIED PHYSICS ENGINE
// Dynamic Island Nav, 3D Hero Parallax, Expanding Portal, Horizon Scrollytelling,
// and Bento Strategy Visualizer
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initDynamicIsland();
  initHero3DParallax();
  initExpandingPortal();
  initHorizonScrollytelling();
  initBentoStrategyExplorer();
  initAllocationSelector();
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
  const sections = document.querySelectorAll('section[id]');

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

  // Smooth anchor navigation
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href === '') return;
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
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollMid >= top && scrollMid < top + height) {
        const id = sec.id;
        links.forEach((l) => {
          if (l.dataset.nav === id) {
            if (!l.classList.contains('is-active')) {
              links.forEach((link) => link.classList.remove('is-active'));
              l.classList.add('is-active');
              updateGlider(l);
            }
          }
        });
      }
    });
  }
}

// ============================================================================
// 2. HERO 3D TILTED COMMAND DASHBOARD & PARALLAX MICRO-WIDGETS
// ============================================================================
function initHero3DParallax() {
  const stage = document.getElementById('hero-parallax-stage');
  const card = document.getElementById('hero-command-card');
  const wSharpe = document.getElementById('widget-sharpe');
  const wLatency = document.getElementById('widget-latency');
  const wGuard = document.getElementById('widget-guardrail');

  if (!stage || !card) return;

  let targetMX = 0;
  let targetMY = 0;
  let curMX = 0;
  let curMY = 0;

  window.addEventListener('mousemove', (e) => {
    targetMX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function renderHeroParallax() {
    curMX = lerp(curMX, targetMX, 0.08);
    curMY = lerp(curMY, targetMY, 0.08);

    // Subtle 3D tilt on main dashboard (max +-4 deg)
    const rotX = (curMY * -3.8).toFixed(2);
    const rotY = (curMX * 3.8).toFixed(2);
    card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    // 3 Different Z-Depth speeds for micro-widgets
    if (wSharpe) {
      wSharpe.style.transform = `translate3d(${(curMX * -14).toFixed(1)}px, ${(curMY * -12).toFixed(1)}px, 0)`;
    }
    if (wLatency) {
      wLatency.style.transform = `translate3d(${(curMX * 18).toFixed(1)}px, ${(curMY * 14).toFixed(1)}px, 0)`;
    }
    if (wGuard) {
      wGuard.style.transform = `translate3d(${(curMX * 28).toFixed(1)}px, ${(curMY * 22).toFixed(1)}px, 0)`;
    }

    requestAnimationFrame(renderHeroParallax);
  }

  requestAnimationFrame(renderHeroParallax);
}

// ============================================================================
// 3. SECTION 2: EXPANDING GLASS PORTAL ("INSIDE THE QUANT ENGINE")
// ============================================================================
function initExpandingPortal() {
  const trigger = document.getElementById('architecture');
  const portalBox = document.getElementById('expanding-portal-box');
  const innerWorld = document.getElementById('portal-inner-content');

  if (!trigger || !portalBox) return;

  let targetT = 0;
  let currentT = 0;

  function updatePortal() {
    const rect = trigger.getBoundingClientRect();
    const scrollDistance = trigger.offsetHeight - window.innerHeight;

    if (scrollDistance > 0) {
      const scrollProgress = -rect.top / scrollDistance;
      targetT = clamp(scrollProgress, 0, 1);
    }

    currentT = lerp(currentT, targetT, 0.09);

    // Interpolate width: 72vw -> 100vw
    const w = lerp(72, 100, currentT);
    // Interpolate height: 60vh -> 100vh
    const h = lerp(60, 100, currentT);
    // Interpolate border radius: 40px -> 0px
    const r = lerp(40, 0, currentT);
    // Counter-scale inner content: 1.2 -> 1.0
    const s = lerp(1.2, 1.0, currentT);

    portalBox.style.width = `${w.toFixed(1)}vw`;
    portalBox.style.height = `${h.toFixed(1)}vh`;
    portalBox.style.borderRadius = `${r.toFixed(1)}px`;

    if (innerWorld) {
      innerWorld.style.transform = `scale(${s.toFixed(3)})`;
    }

    requestAnimationFrame(updatePortal);
  }

  requestAnimationFrame(updatePortal);
}

// ============================================================================
// 4. SECTION 3: HORIZON-LOCKED SCROLLYTELLING (3 PILLARS OF ALPHA)
// ============================================================================
function initHorizonScrollytelling() {
  const section = document.getElementById('pillars');
  const vessel = document.getElementById('morph-vessel');
  const beam = document.getElementById('pillar-progress-beam');
  const stepPill = document.getElementById('narrative-step-pill');
  const titleEl = document.getElementById('narrative-title');
  const descEl = document.getElementById('narrative-desc');
  const statusTag = document.getElementById('vessel-status-tag');
  const codeRef = document.getElementById('vessel-code-ref');
  const horizonLaser = document.getElementById('pillars-horizon-line');
  const horizonGlow = document.getElementById('pillars-horizon-glow');
  const navBtns = document.querySelectorAll('.pillar-nav-btn');

  if (!section || !vessel) return;

  const pillarsData = [
    {
      step: 'PILLAR 01 // 03',
      title: 'Multimodal Market Intelligence.',
      desc: 'AI-driven structural pattern extraction isolates genuine liquidity imbalances across global order books, filtering out over 99% of retail indicator noise.',
      badge: 'AI VISION // PATTERN RECOGNITION',
      code: 'MODEL_HASH: #0A84FF_ALPHA',
      accent: '#0A84FF',
      width: 520,
      height: 400
    },
    {
      step: 'PILLAR 02 // 03',
      title: 'Battle-Tested Quantitative Validation.',
      desc: 'Hundreds of thousands of compute hours across distinct macroeconomic volatility regimes ensure persistent statistical edge with zero curve-fitting.',
      badge: 'MONTE CARLO // ROBUSTNESS AUDIT',
      code: 'BENCH_HASH: #30D158_VERIFIED',
      accent: '#30D158',
      width: 550,
      height: 420
    },
    {
      step: 'PILLAR 03 // 03',
      title: 'Zero-Emotion Capital Protection.',
      desc: 'Automated over-trading locks, strict average daily volume sizing, and hard circuit breakers execute deterministically with zero human hesitation.',
      badge: 'RISK PROTOCOL // HARD-LOCKED',
      code: 'CIRCUIT_HASH: #5E5CE6_GUARD',
      accent: '#5E5CE6',
      width: 530,
      height: 440
    }
  ];

  let activePillarIdx = 0;
  let targetProgress = 0;
  let currentProgress = 0;

  function onScroll() {
    const rect = section.getBoundingClientRect();
    const scrollDistance = section.offsetHeight - window.innerHeight;
    if (scrollDistance > 0) {
      const rawProgress = -rect.top / scrollDistance;
      targetProgress = clamp(rawProgress, 0, 1);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  function renderPillars() {
    currentProgress = lerp(currentProgress, targetProgress, 0.08);

    // Compute active pillar index (0, 1, or 2)
    let idx = 0;
    if (currentProgress >= 0.66) {
      idx = 2;
    } else if (currentProgress >= 0.33) {
      idx = 1;
    }

    if (idx !== activePillarIdx) {
      activePillarIdx = idx;
      switchPillar(idx);
    }

    // Update glowing progress beam line
    if (beam) {
      beam.style.height = `${(currentProgress * 100).toFixed(1)}%`;
    }

    requestAnimationFrame(renderPillars);
  }

  function switchPillar(idx) {
    const p = pillarsData[idx];
    if (!p) return;

    // 1. Text transition
    if (stepPill) {
      stepPill.textContent = p.step;
      stepPill.style.color = p.accent;
      stepPill.style.borderColor = `${p.accent}55`;
      stepPill.style.background = `${p.accent}20`;
    }
    if (titleEl) titleEl.textContent = p.title;
    if (descEl) descEl.textContent = p.desc;
    if (statusTag) {
      statusTag.textContent = p.badge;
      statusTag.style.color = p.accent;
    }
    if (codeRef) codeRef.textContent = p.code;

    // 2. Horizon laser line & glow accent color
    if (horizonLaser) {
      horizonLaser.style.background = `linear-gradient(90deg, transparent 5%, ${p.accent} 50%, transparent 95%)`;
      horizonLaser.style.boxShadow = `0 0 14px ${p.accent}`;
    }
    if (horizonGlow) {
      horizonGlow.style.background = `radial-gradient(circle, ${p.accent} 0%, transparent 70%)`;
    }

    // 3. Liquid morph vessel geometry and lighting
    vessel.style.borderColor = `${p.accent}44`;
    vessel.style.boxShadow = `inset 0 1px 0 0 rgba(255, 255, 255, 0.35), 0 30px 80px rgba(0, 0, 0, 0.8), 0 0 40px ${p.accent}25`;

    // 4. Switch visible body
    document.querySelectorAll('.vessel-body').forEach((body, bIdx) => {
      if (bIdx === idx) {
        body.classList.add('vessel-state-active');
      } else {
        body.classList.remove('vessel-state-active');
      }
    });

    // 5. Update pillar nav rail button states
    navBtns.forEach((btn, bIdx) => {
      if (bIdx === idx) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });
  }

  // Pillar click to smooth scroll
  navBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetPillar = parseInt(btn.dataset.pillar, 10);
      const scrollDistance = section.offsetHeight - window.innerHeight;
      const targetOffset = section.offsetTop + (targetPillar / 2.5) * scrollDistance;
      window.scrollTo({
        top: targetOffset,
        behavior: 'smooth'
      });
    });
  });

  requestAnimationFrame(renderPillars);
}

// ============================================================================
// 5. SECTION 4: INTERACTIVE iOS BENTO STRATEGY EXPLORER
// ============================================================================
function initBentoStrategyExplorer() {
  const buttons = document.querySelectorAll('#strategy-switcher .segment-btn');
  const chartFill = document.getElementById('bento-chart-fill');
  const chartLine = document.getElementById('bento-chart-line');
  const retEl = document.getElementById('stat-return');
  const pfEl = document.getElementById('stat-pf');
  const mddEl = document.getElementById('stat-mdd');
  const winEl = document.getElementById('stat-win');

  const strategyRegimes = {
    all: {
      return: '+38.4%',
      pf: '2.42',
      mdd: '-4.2%',
      win: '68.5%',
      linePath: 'M 0 200 Q 150 170 300 120 T 600 30',
      fillPath: 'M 0 200 Q 150 170 300 120 T 600 30 L 600 240 L 0 240 Z'
    },
    vol: {
      return: '+54.1%',
      pf: '2.89',
      mdd: '-5.8%',
      win: '72.1%',
      linePath: 'M 0 220 Q 120 190 260 140 T 420 80 T 600 15',
      fillPath: 'M 0 220 Q 120 190 260 140 T 420 80 T 600 15 L 600 240 L 0 240 Z'
    },
    trend: {
      return: '+31.2%',
      pf: '2.15',
      mdd: '-3.1%',
      win: '63.4%',
      linePath: 'M 0 190 Q 200 160 380 110 T 600 45',
      fillPath: 'M 0 190 Q 200 160 380 110 T 600 45 L 600 240 L 0 240 Z'
    }
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const regime = btn.dataset.regime;
      const data = strategyRegimes[regime];
      if (!data) return;

      // Animate SVG path morph
      if (chartLine) chartLine.setAttribute('d', data.linePath);
      if (chartFill) chartFill.setAttribute('d', data.fillPath);

      // Animate numbers
      if (retEl) retEl.textContent = data.return;
      if (pfEl) pfEl.textContent = data.pf;
      if (mddEl) mddEl.textContent = data.mdd;
      if (winEl) winEl.textContent = data.win;
    });
  });
}

// ============================================================================
// 6. SECTION 5: INVESTOR ALLOCATION PORTAL SELECTOR
// ============================================================================
function initAllocationSelector() {
  const tabs = document.querySelectorAll('#investor-type-selector .alloc-tab');
  const tagEl = document.getElementById('alloc-gate-tag');
  const titleEl = document.getElementById('alloc-tier-title');
  const descEl = document.getElementById('alloc-tier-desc');
  const listEl = document.getElementById('alloc-checklist');

  const tiers = {
    inst: {
      tag: 'INSTITUTIONAL TIER // DIRECT LP ALLOCATION',
      title: 'Direct SMA & Fund Vehicle Access',
      desc: 'Qualified institutional clients gain access to separately managed accounts (SMA) and institutional fund vehicles featuring daily liquidity and complete portfolio transparency.',
      checklist: [
        'Minimum Allocation: $10M+ USD',
        'Daily Third-Party NAV Reconciliation',
        'Dedicated FIX/API Telemetry Reporting'
      ]
    },
    client: {
      tag: 'PRIVATE WEALTH // FAMILY OFFICE DESK',
      title: 'Tailored Absolute-Return Mandates',
      desc: 'Customized multi-strategy mandates designed to deliver uncorrelated capital growth while preserving wealth through macro market dislocations.',
      checklist: [
        'Minimum Allocation: $2M+ USD',
        'Monthly Portfolio Strategy Briefings',
        'Strict Drawdown Protection SLA'
      ]
    },
    partner: {
      tag: 'STRATEGY PARTNERSHIP // QUANT COLLABORATIVE',
      title: 'Co-Located Infrastructure & Seed Capital',
      desc: 'We provide top-tier quantitative researchers and trading teams with high-speed execution bridges, sub-tick data archives, and strategic seeding.',
      checklist: [
        'Direct DMA Exchange Connectivity',
        'C++20 SIMD High-Throughput Cluster',
        'Performance-Linked Fee Structures'
      ]
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      const type = tab.dataset.type;
      const data = tiers[type];
      if (!data) return;

      if (tagEl) tagEl.textContent = data.tag;
      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;
      if (listEl) {
        listEl.innerHTML = data.checklist
          .map((item) => `<div><i class="fa fa-check text-emerald"></i> ${item}</div>`)
          .join('');
      }
    });
  });
}

// ============================================================================
// 7. SPECULAR SPOTLIGHT ON CARDS
// ============================================================================
function initCardSpecularSheen() {
  const cards = document.querySelectorAll('.bento-card, .main-command-dashboard, .allocate-glass-card');
  cards.forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x.toFixed(1)}%`);
      card.style.setProperty('--mouse-y', `${y.toFixed(1)}%`);
    });
  });
}

// ============================================================================
// 8. CONTACT FORM SIMULATION
// ============================================================================
function initContactForm() {
  const form = document.getElementById('investor-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;

    btn.disabled = true;
    btn.innerHTML = '<span>Verifying Institutional Credentials...</span> <i class="fa fa-spinner fa-spin"></i>';

    setTimeout(() => {
      btn.innerHTML = '<span>Inquiry Registered · Secure Briefing Sent</span> <i class="fa fa-circle-check text-emerald"></i>';
      form.reset();
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<span>Request Track Record Verification</span> <i class="fa fa-shield-halved"></i>';
      }, 4000);
    }, 1200);
  });
}
