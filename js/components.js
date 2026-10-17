// ============================================================================
// Quantbot Technologies - Apple iOS 18 & visionOS Architecture Controller
// High-Performance Scrollytelling, Dynamic Island, Bento Tilt & Telemetry
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initLenisSmoothScroll();
  initNavigation();
  initDynamicIslandStageTracker();
  initVerticalProgressSpine();
  initStageScrollytelling();
  initPhaseInspector();
  init3DPerspectiveTilt();
  initWidgetCounters();
  initModals();
  initTabs();
  initAccordion();
  initContactForm();
  initCareers();
  initNewsFilter();
  initBlogFilter();
  initSmoothScroll();
  initLiquidGlassEngine();
});

// 1. Lenis Smooth Scroll Integration
function initLenisSmoothScroll() {
  if (typeof window.Lenis === 'function') {
    const lenis = new window.Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    window.lenisInstance = lenis;
  }
}

// 2. Navigation & Mobile Drawer
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

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

  document.querySelectorAll('.mobile-submenu-link, .mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

// 3. Dynamic Island Navigation Stage Tracker & Sliding Pill
function initDynamicIslandStageTracker() {
  const navLinks = document.querySelectorAll('.ios-stage-nav-link');
  const activePill = document.getElementById('ios-nav-pill');
  if (!navLinks.length || !activePill) return;

  function updatePillPosition(activeLink) {
    if (!activeLink) return;
    const parentRect = activeLink.parentElement.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    activePill.style.left = `${linkRect.left - parentRect.left}px`;
    activePill.style.width = `${linkRect.width}px`;
  }

  // Set initial pill position
  const initialActive = document.querySelector('.ios-stage-nav-link.is-active') || navLinks[0];
  setTimeout(() => updatePillPosition(initialActive), 100);

  window.addEventListener('resize', () => {
    const current = document.querySelector('.ios-stage-nav-link.is-active') || navLinks[0];
    updatePillPosition(current);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('is-active'));
      link.classList.add('is-active');
      updatePillPosition(link);
    });
  });

  window.syncDynamicIslandPill = function (stageId) {
    const targetLink = document.querySelector(`.ios-stage-nav-link[data-stage-nav="${stageId}"]`);
    if (targetLink && !targetLink.classList.contains('is-active')) {
      navLinks.forEach(l => l.classList.remove('is-active'));
      targetLink.classList.add('is-active');
      updatePillPosition(targetLink);
    }
  };
}

// 4. Sleek Vertical Progress Spine on Left Margin
function initVerticalProgressSpine() {
  const spineBeam = document.getElementById('ios-spine-beam');
  const spineNodes = document.querySelectorAll('.ios-spine-node');
  const stages = document.querySelectorAll('.p-stage');
  if (!spineBeam || !stages.length) return;

  function updateSpine() {
    const firstStage = stages[0];
    const lastStage = stages[stages.length - 1];
    const startY = firstStage.offsetTop;
    const endY = lastStage.offsetTop + lastStage.offsetHeight - window.innerHeight;
    const totalDist = endY - startY;

    if (totalDist > 0) {
      const currentScroll = window.scrollY - startY;
      const progress = Math.max(0, Math.min(1, currentScroll / totalDist));
      spineBeam.style.height = `${(progress * 100).toFixed(1)}%`;
    }
  }

  window.addEventListener('scroll', updateSpine, { passive: true });
  updateSpine();

  spineNodes.forEach(node => {
    node.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = node.dataset.stageTarget;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        if (window.lenisInstance) {
          window.lenisInstance.scrollTo(targetEl, { offset: -30 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  window.syncSpineNode = function (stageId) {
    spineNodes.forEach(node => {
      if (node.dataset.stageTarget === stageId) {
        node.classList.add('is-active');
      } else {
        node.classList.remove('is-active');
      }
    });
  };
}

// 5. Scrollytelling Stage Pinning & Focus Snapping
function initStageScrollytelling() {
  const stages = document.querySelectorAll('.p-stage');
  if (!stages.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stages.forEach(s => {
          if (s === entry.target) {
            s.classList.add('is-active-stage');
            s.classList.remove('is-inactive');
            const stageId = s.id;
            if (window.syncDynamicIslandPill) window.syncDynamicIslandPill(stageId);
            if (window.syncSpineNode) window.syncSpineNode(stageId);
          } else {
            s.classList.remove('is-active-stage');
            s.classList.add('is-inactive');
          }
        });
      }
    });
  }, {
    threshold: 0.35,
    rootMargin: '-10% 0px -10% 0px'
  });

  stages.forEach(stage => observer.observe(stage));
}

// 6. Stage 03 6-Phase Interactive Stepper & Code Inspector
function initPhaseInspector() {
  const phasePills = document.querySelectorAll('.phase-node-pill');
  const phaseBadge = document.getElementById('phase-badge');
  const phaseTitle = document.getElementById('phase-title');
  const phaseDesc = document.getElementById('phase-desc');
  const phaseStack = document.getElementById('phase-stack');
  const phaseGate = document.getElementById('phase-gate');
  const terminalFilename = document.getElementById('terminal-filename');
  const codePreview = document.getElementById('phase-code-preview');

  if (!phasePills.length || !phaseTitle) return;

  const phasesData = [
    {
      badge: "GATE // SPECIALIST RESEARCH REVIEW",
      title: "Phase 01: Idea Generation",
      desc: "Start with a basic strategy idea in global futures or cash equities, collaborating directly with our specialized data research teams to formulate mathematically tractable hypotheses.",
      stack: "Python · Jupyter",
      gate: "Peer Review Passed",
      filename: "quantbot_alpha_v2.py",
      code: `import quantbot.engine as qb
from quantbot.analytics import compute_alpha

# Stage 01 // Strategy Hypothesis Ingestion
universe = qb.Universe.global_liquid_equities()
signals = compute_alpha(universe, lookback_ticks=25000)
qb.verify_orthogonality(signals, threshold=0.88)
print("[OK] Signal ready for Out-of-Sample verification")`
    },
    {
      badge: "GATE // IS / OOS STRICT PARTITIONING",
      title: "Phase 02: Data Analysis",
      desc: "Gain access to petabyte-scale tick datasets, partition strictly into in-sample and out-of-sample datasets, and thoroughly inspect data hygiene, corporate actions, and market outliers.",
      stack: "Apache Arrow · Polars · C++",
      gate: "Data Hygiene 100%",
      filename: "data_hygiene_partition.py",
      code: `# Stage 02 // Strict IS / OOS Data Hygiene
dataset = qb.load_l2_book("GLOBEX.ES", start="2020-01-01")
train_is, test_oos = qb.partition_clean(dataset, split_ratio=0.70)
assert qb.detect_lookahead_bias(train_is) == 0.0
print(f"[OK] IS Partition: {len(train_is)} rows verified")`
    },
    {
      badge: "GATE // COMPUTE OPTIMIZATION & UNIT TESTS",
      title: "Phase 03: Code Development",
      desc: "Test the hypothesis on in-sample data using our distributed compute cluster (Python, C++20, R), benchmarking empirical Sharpe ratio and signal decay curves.",
      stack: "C++20 · Cython · SIMD",
      gate: "Latency Bench < 25μs",
      filename: "alpha_kernel.cpp",
      code: `// Stage 03 // Ultra-Low Latency C++20 SIMD Alpha Kernel
auto evaluate_orderbook(const MarketBook& book) noexcept -> Signal {
    const auto micro_price = calculate_microprice_avellaneda(book);
    const auto imbalance = compute_vpin_flow(book, 50);
    return Signal{ .weight = imbalance * 0.42, .confidence = 0.96 };
}`
    },
    {
      badge: "GATE // PRE-TRADE LIMITS & FACTOR NEUTRALITY",
      title: "Phase 04: Trading Logic & Risk",
      desc: "Implement automated factor neutralization, position sizing limits, stop-loss governance, and portfolio margin constraints inside our proprietary risk engine.",
      stack: "RiskOS · Real-Time VaR",
      gate: "Factor Drift = 0.00%",
      filename: "risk_guardrails.py",
      code: `# Stage 04 // Dynamic Factor Neutralization
risk_matrix = qb.RiskEngine.load_barra_model()
portfolio = qb.Portfolio.from_signals(signals)
portfolio.neutralize_sectors(max_exposure_usd=0.0)
portfolio.enforce_pre_trade_limits(max_adv_pct=1.5)
print("[OK] Risk governance passed all circuit checks")`
    },
    {
      badge: "GATE // ZERO LOOKAHEAD FORWARD BENCHMARK",
      title: "Phase 05: Paper Testing & Simulation",
      desc: "Deploy the strategy in paper trading mode against real-time live market feeds, monitoring daily execution slippage and comparing against simulated backtests.",
      stack: "PaperBroker · FIX 4.4",
      gate: "Tracking Error < 0.08",
      filename: "paper_execution_audit.py",
      code: `# Stage 05 // Live Paper Execution Audit
session = qb.PaperSession.connect("NY4_PROD_SHADOW")
session.stream_fills(order_router="SOR_FAST")
variance = session.compare_with_backtest(window_days=30)
assert variance.sharpe_delta < 0.05
print(f"[OK] Live shadow execution tracking error: {variance.tracking_error:.4f}")`
    },
    {
      badge: "GATE // CAPITAL ALLOCATION & LIVE ORDER ROUTING",
      title: "Phase 06: Live Trading",
      desc: "Once all empirical thresholds, risk governance tests, and execution benchmarks are satisfied, the strategy is promoted to live production capital allocation.",
      stack: "Direct Co-Location · FPGA",
      gate: "Live Capital Deployed",
      filename: "live_production_alloc.py",
      code: `# Stage 06 // Production Capital Activation
engine = qb.LiveTradingEngine.authorize(tier="INSTITUTIONAL")
engine.allocate_capital(strategy_id="QB_STAT_ARB_09", max_leverage=3.0)
engine.start_market_making(exchanges=["CME", "EUREX", "HKEX", "NASDAQ"])
print("[LIVE] 24/5 systematic execution active across global hubs")`
    }
  ];

  phasePills.forEach((pill, idx) => {
    pill.addEventListener('click', () => {
      phasePills.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');

      const data = phasesData[idx];
      if (data) {
        if (phaseBadge) phaseBadge.textContent = data.badge;
        if (phaseTitle) phaseTitle.textContent = data.title;
        if (phaseDesc) phaseDesc.textContent = data.desc;
        if (phaseStack) phaseStack.textContent = data.stack;
        if (phaseGate) phaseGate.textContent = data.gate;
        if (terminalFilename) terminalFilename.textContent = data.filename;
        if (codePreview) codePreview.innerHTML = `<code>${escapeHtml(data.code)}</code>`;
      }
    });
  });

  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}

// 7. Cursor-Aware 3D Perspective Tilt on Glass Bento Cards
function init3DPerspectiveTilt() {
  const cards = document.querySelectorAll('.bento-card, .p-monolith-glass, .office-bento-card');

  cards.forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;

      // Max tilt +-5 degrees for subtle, sophisticated feel
      const rotX = ((y - midY) / midY) * -5;
      const rotY = ((x - midX) / midX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;

      // Cursor spotlight coordinates for ::before glow
      const pctX = ((x / rect.width) * 100).toFixed(1);
      const pctY = ((y / rect.height) * 100).toFixed(1);
      card.style.setProperty('--mouse-x', `${pctX}%`);
      card.style.setProperty('--mouse-y', `${pctY}%`);
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

// 8. Animated Counters for Widget Metrics
function initWidgetCounters() {
  const counters = document.querySelectorAll('[data-counter-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.counterTarget);
        const prefix = el.dataset.counterPrefix || '';
        const suffix = el.dataset.counterSuffix || '';
        const decimals = parseInt(el.dataset.counterDecimals || '0', 10);
        let start = 0;
        const duration = 1600;
        const startTime = performance.now();

        function animate(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(1, elapsed / duration);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = (start + (target - start) * easeOut).toFixed(decimals);
          el.textContent = `${prefix}${currentVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        }

        requestAnimationFrame(animate);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// 9. Smooth Scroll for Internal Anchors
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        if (window.lenisInstance) {
          window.lenisInstance.scrollTo(targetEl, { offset: -30 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// 10. Modals System (Team bios, Careers, etc.)
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

  window.openModal = function (htmlContent) {
    if (modalBody) modalBody.innerHTML = htmlContent;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function () {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };
}

// 11. Tabs Component
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

// 12. Accordion Component
function initAccordion() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });
}

// 13. Contact Form
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Transmitting Encrypted Request...';
    }

    setTimeout(() => {
      if (btn) btn.textContent = 'Request Received · Confirmation Dispatched';
      form.reset();
      setTimeout(() => {
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Submit Inquiry';
        }
      }, 3500);
    }, 1200);
  });
}

// 14. Careers Filtering
function initCareers() {
  const deptFilters = document.querySelectorAll('[data-dept-filter]');
  const jobCards = document.querySelectorAll('.job-card');
  if (!deptFilters.length) return;

  deptFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      deptFilters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');
      const dept = filter.dataset.deptFilter;

      jobCards.forEach(card => {
        if (dept === 'all' || card.dataset.dept === dept) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 15. News & Blog Filtering
function initNewsFilter() {}
function initBlogFilter() {}

// 16. Apple iOS Liquid Glass Material System
function initLiquidGlassEngine() {
  if (!window.LiquidGlass) return;
  initLiquidRipples();
  initInteractiveLiquidLens();
  initGlassDock();
}

function initLiquidRipples() {
  const targets = document.querySelectorAll('.btn, .phase-node-pill, .ios-stage-nav-link');
  targets.forEach((el) => {
    try {
      const ripple = window.LiquidGlass.mountSvgRipple({
        target: el,
        host: document.body,
        strength: 24,
        chroma: 0.4,
        duration: 700,
        blur: 0.35,
        spec: 0.85,
      });

      el.addEventListener('pointerdown', (e) => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const nx = (e.clientX - rect.left) / rect.width;
          const ny = (e.clientY - rect.top) / rect.height;
          ripple.press(Math.max(0, Math.min(1, nx)), Math.max(0, Math.min(1, ny)));
        }
      });
    } catch (_) {}
  });
}

function initInteractiveLiquidLens() {
  let lensRing = document.querySelector('.ios-liquid-lens');
  if (!lensRing) {
    lensRing = document.createElement('div');
    lensRing.className = 'ios-liquid-lens';
    document.body.appendChild(lensRing);
  }

  const lensTargets = document.querySelectorAll('.bento-card, .p-monolith-glass, .office-bento-card');
  lensTargets.forEach((target) => {
    try {
      const lens = window.LiquidGlass.mountGlassLens({
        target: target,
        host: document.body,
        lensW: 176,
        lensH: 176,
        radius: 88,
        depth: 22,
        dome: 16,
        profile: 'circle',
        strength: 26,
        chroma: 0.4,
        glow: 0.65,
        edge: 0.9,
        active: false,
      });

      let isHovered = false;

      target.addEventListener('pointerenter', (e) => {
        isHovered = true;
        lensRing.classList.add('is-visible');
        lens.setActive(true);
        lens.setDisplScale(1);
        updatePos(e);
      });

      function updatePos(e) {
        lensRing.style.left = `${e.clientX}px`;
        lensRing.style.top = `${e.clientY}px`;
        const rect = target.getBoundingClientRect();
        const lx = e.clientX - rect.left - 88;
        const ly = e.clientY - rect.top - 88;
        lens.setPos(lx, ly);
      }

      target.addEventListener('pointermove', (e) => {
        if (!isHovered) return;
        updatePos(e);
      });

      target.addEventListener('pointerleave', () => {
        isHovered = false;
        lensRing.classList.remove('is-visible');
        lens.setDisplScale(0);
        setTimeout(() => {
          if (!isHovered) lens.setActive(false);
        }, 180);
      });
    } catch (_) {}
  });
}

function initGlassDock() {
  if (document.querySelector('.ios-glass-dock')) return;

  const dock = document.createElement('div');
  dock.className = 'ios-glass-dock';
  dock.setAttribute('role', 'button');
  dock.setAttribute('tabindex', '0');
  dock.setAttribute('title', 'Apple iOS 18 Glass Engine Active');
  dock.innerHTML = `
    <div class="ios-glass-dock-icon"><i class="fa fa-sparkles"></i></div>
    <div class="ios-glass-dock-text">QuantBot Architecture</div>
    <div class="ios-glass-dock-badge">iOS 18</div>
  `;

  document.body.appendChild(dock);

  dock.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dock.style.transform = 'translateY(-1px) scale(0.96)';
    setTimeout(() => {
      dock.style.transform = '';
    }, 180);
  });
}
