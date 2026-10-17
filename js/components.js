// ============================================================================
// QUANTBOT TECHNOLOGIES, LP — OFFICIAL INSTITUTIONAL SPATIAL ENGINE
// Unified requestAnimationFrame lerp loop (damping: 0.075), Horizon-Locked Camera,
// Liquid Glass Morphing, Expanding Portals, Multi-Plane Parallax, and Tactile Modals
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initSpatialPhysicsEngine();
  initSegmentedControllers();
  initTactileModals();
  initMouseOptics();
});

// Helper math
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// ============================================================================
// 1. UNIFIED PHYSICS ENGINE & CAMERA TIMELINE (lerp: 0.075)
// ============================================================================
function initSpatialPhysicsEngine() {
  const scrollTrack = document.getElementById('scroll-track');
  const floorGrid = document.getElementById('perspective-grid-floor');
  const watermarkText = document.getElementById('refraction-watermark-text');
  const horizonBloom = document.getElementById('horizon-ambient-bloom');
  const portalFrame = document.getElementById('spatial-portal-frame');
  const portalInner = document.getElementById('portal-inner-world');
  const hudProgressFill = document.getElementById('hud-progress-fill');
  const hudStatusLabel = document.getElementById('hud-status-label');
  const islandGlider = document.getElementById('island-glider-pill');
  const islandLinks = document.querySelectorAll('.island-link');

  // Scenes
  const scenes = {
    hero: document.getElementById('scene-hero'),
    differentiators: document.getElementById('scene-differentiators'),
    pipeline: document.getElementById('scene-pipeline'),
    programs: document.getElementById('scene-programs'),
    leadershipOffices: document.getElementById('scene-leadership-offices')
  };

  // Pipeline Master Vessel Elements
  const masterVessel = document.getElementById('master-liquid-glass-vessel');
  const stageEyebrowNum = document.getElementById('stage-eyebrow-num');
  const stageEyebrowPhase = document.getElementById('stage-eyebrow-phase');
  const stageTitleText = document.getElementById('stage-title-text');
  const stageDescText = document.getElementById('stage-desc-text');
  const scrubBeam = document.getElementById('scrub-indicator-beam');
  const scrubBtns = document.querySelectorAll('.scrub-btn');
  const vesselTag = document.getElementById('vessel-tag-text');
  const vesselHash = document.getElementById('vessel-hash-text');
  const plinthStatus = document.getElementById('plinth-status');
  const schematics = [
    document.getElementById('schematic-stage-1'),
    document.getElementById('schematic-stage-2'),
    document.getElementById('schematic-stage-3'),
    document.getElementById('schematic-stage-4'),
    document.getElementById('schematic-stage-5'),
    document.getElementById('schematic-stage-6')
  ];

  const authenticStages = [
    {
      num: '01',
      tag: 'HYPOTHESIS FORMULATION',
      phase: 'STAGE 01 // 06',
      title: 'Idea Generation',
      desc: 'Formulate systematic hypotheses across global equities and electronic futures, collaborating directly with the dedicated internal data engineering desk.',
      hash: 'LIFECYCLE // #0A84FF',
      accent: '#0A84FF'
    },
    {
      num: '02',
      tag: 'DATA CURATION & AUDIT',
      phase: 'STAGE 02 // 06',
      title: 'Data Analysis',
      desc: 'Acquire curated historical feeds, partition data into in-sample and out-of-sample test sets, and perform rigorous bias, microstructure, and outlier audits.',
      hash: 'LIFECYCLE // #00C7BE',
      accent: '#00C7BE'
    },
    {
      num: '03',
      tag: 'LINUX CLUSTER BENCHMARKS',
      phase: 'STAGE 03 // 06',
      title: 'Code Development',
      desc: 'Model and backtest trading alphas using R, Python, and C++ on high-performance Linux compute clusters against benchmark index baselines.',
      hash: 'LIFECYCLE // #30D158',
      accent: '#30D158'
    },
    {
      num: '04',
      tag: 'FACTOR RISK & TCM ENGINE',
      phase: 'STAGE 04 // 06',
      title: 'Trading Logic & Risk Management',
      desc: 'Integrate validated alpha signals into the proprietary backtesting engine, applying global factor risk models, transaction cost models (TCM), and portfolio constraints.',
      hash: 'LIFECYCLE // #5E5CE6',
      accent: '#5E5CE6'
    },
    {
      num: '05',
      tag: 'FORWARD OPS RECONCILIATION',
      phase: 'STAGE 05 // 06',
      title: 'Paper Trading & Testing',
      desc: 'Deploy validated strategies into simulated production, reconciling daily performance, execution fill quality, and slippage alongside the trade operations desk.',
      hash: 'LIFECYCLE // #FF9F0A',
      accent: '#FF9F0A'
    },
    {
      num: '06',
      tag: '24/7 AUTOMATED PRODUCTION',
      phase: 'STAGE 06 // 06',
      title: 'Live Production Trading',
      desc: 'Full deployment into automated production, executing across global exchange gateways with continuous algorithmic risk telemetry.',
      hash: 'LIFECYCLE // #30D158',
      accent: '#30D158'
    }
  ];

  let currentScrollY = window.scrollY || 0;
  let targetScrollY = window.scrollY || 0;
  let currentActiveScene = 'hero';
  let currentActiveStageIndex = 0;

  // Window scroll event simply captures targetScrollY without layout thrashing
  window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY;
  }, { passive: true });

  // Update Island Glider Position
  function updateGlider(activeLink) {
    if (!activeLink || !islandGlider || !activeLink.parentElement) return;
    const parentRect = activeLink.parentElement.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    islandGlider.style.left = `${linkRect.left - parentRect.left}px`;
    islandGlider.style.width = `${linkRect.width}px`;
  }

  // Master requestAnimationFrame Loop (damping 0.075)
  function renderPhysicsEngine() {
    currentScrollY = lerp(currentScrollY, targetScrollY, 0.075);

    const maxScroll = (scrollTrack?.offsetHeight || 6000) - window.innerHeight;
    const progress = clamp(currentScrollY / maxScroll, 0, 1);

    // 1. Plane 0 Floor Grid shift in Z-space
    if (floorGrid) {
      floorGrid.style.backgroundPositionY = `${(currentScrollY * 0.45) % 50}px`;
    }

    // 2. HUD Progress bar
    if (hudProgressFill) {
      hudProgressFill.style.width = `${(progress * 100).toFixed(1)}%`;
    }

    // 3. Scene Timeline Mapping:
    // Scene 0: 0.00 - 0.14 (Hero)
    // Scene 1: 0.14 - 0.28 (Differentiators)
    // Scene 2: 0.28 - 0.72 (6-Stage Pipeline)
    // Scene 3: 0.72 - 0.85 (QMM & POC Programs)
    // Scene 4: 0.85 - 1.00 (Leadership & Offices & Contact)

    let activeScene = 'hero';
    let watermarkString = 'QUANTBOT // 2008';
    let statusLabelString = 'HERITAGE // 2008';

    if (progress < 0.14) {
      activeScene = 'hero';
      watermarkString = 'QUANTBOT // 2008';
      statusLabelString = 'HERITAGE // 2008';
    } else if (progress < 0.28) {
      activeScene = 'differentiators';
      watermarkString = 'CORE // 4 PILLARS';
      statusLabelString = 'DIFFERENTIATORS';
    } else if (progress < 0.72) {
      activeScene = 'pipeline';
      
      // Calculate active stage (0 to 5)
      const pipelineProgress = (progress - 0.28) / (0.72 - 0.28);
      const stageIdx = clamp(Math.floor(pipelineProgress * 5.99), 0, 5);
      const stageObj = authenticStages[stageIdx];
      
      watermarkString = `STAGE // ${stageObj.num}`;
      statusLabelString = `PIPELINE // STAGE ${stageObj.num}`;

      // Expanding Spatial Portal Zoom & Counter-Scaling
      if (portalFrame && portalInner) {
        const portalZoom = clamp((progress - 0.28) / 0.10, 0, 1);
        const insetY = lerp(12, 0, portalZoom);
        const insetX = lerp(10, 0, portalZoom);
        const radius = lerp(40, 0, portalZoom);
        const scale = lerp(1.15, 1.0, portalZoom);

        portalFrame.style.clipPath = `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}px)`;
        portalInner.style.transform = `scale(${scale})`;
      }

      // Update In-Place Morphing Master Vessel
      if (stageIdx !== currentActiveStageIndex) {
        currentActiveStageIndex = stageIdx;
        
        if (stageEyebrowNum) stageEyebrowNum.textContent = stageObj.phase;
        if (stageEyebrowPhase) stageEyebrowPhase.textContent = 'RESEARCH LIFECYCLE';
        if (stageTitleText) stageTitleText.textContent = stageObj.title;
        if (stageDescText) stageDescText.textContent = stageObj.desc;

        if (scrubBeam) {
          scrubBeam.style.top = `${(stageIdx / 5) * 83.33}%`;
        }
        scrubBtns.forEach((btn, idx) => {
          btn.classList.toggle('is-active', idx === stageIdx);
        });

        if (vesselTag) {
          vesselTag.textContent = `STAGE ${stageObj.num} \u00B7 ${stageObj.tag}`;
          vesselTag.style.color = stageObj.accent;
        }
        if (vesselHash) vesselHash.textContent = stageObj.hash;
        if (plinthStatus) {
          plinthStatus.textContent = `Active Stage ${stageObj.num}`;
          plinthStatus.style.color = stageObj.accent;
        }

        if (masterVessel) {
          masterVessel.style.borderColor = `${stageObj.accent}55`;
          masterVessel.style.boxShadow = `0 30px 80px rgba(0, 0, 0, 0.85), 0 0 35px ${stageObj.accent}25`;
        }

        if (horizonBloom) {
          horizonBloom.style.background = `radial-gradient(ellipse at center, ${stageObj.accent}44 0%, transparent 70%)`;
        }

        schematics.forEach((sch, idx) => {
          if (sch) sch.classList.toggle('active-schematic', idx === stageIdx);
        });
      }

    } else if (progress < 0.85) {
      activeScene = 'programs';
      watermarkString = 'QMM // POC PROGRAMS';
      statusLabelString = 'PROGRAMS & ALLOCATION';
    } else {
      activeScene = 'leadershipOffices';
      watermarkString = 'LEADERSHIP // 6 DESKS';
      statusLabelString = 'GOVERNANCE & DESKS';
    }

    // Update active scene DOM class
    if (activeScene !== currentActiveScene) {
      currentActiveScene = activeScene;
      Object.keys(scenes).forEach((k) => {
        scenes[k]?.classList.toggle('scene-active', k === activeScene);
      });

      // Update Nav Link Glider
      islandLinks.forEach((link) => {
        if (link.dataset.scene === activeScene) {
          islandLinks.forEach((l) => l.classList.remove('is-active'));
          link.classList.add('is-active');
          updateGlider(link);
        }
      });
    }

    // Update watermark text & HUD status
    if (watermarkText && watermarkText.textContent !== watermarkString) {
      watermarkText.textContent = watermarkString;
    }
    if (hudStatusLabel && hudStatusLabel.textContent !== statusLabelString) {
      hudStatusLabel.textContent = statusLabelString;
    }

    // Refraction watermark parallax translation
    if (watermarkText) {
      watermarkText.style.transform = `translateY(${(-currentScrollY * 0.12) % 60}px) scale(${1 + progress * 0.05})`;
    }

    requestAnimationFrame(renderPhysicsEngine);
  }

  requestAnimationFrame(renderPhysicsEngine);

  // Initialize Glider
  setTimeout(() => {
    const active = document.querySelector('.island-link.is-active') || islandLinks[0];
    if (active) updateGlider(active);
  }, 200);

  // Scrub Rail Buttons
  scrubBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const stage = parseInt(btn.dataset.stage || '1');
      const targetAnchor = document.getElementById(`stage-0${stage}`);
      if (targetAnchor) {
        const targetTop = targetAnchor.offsetTop;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  // HUD Jump Buttons
  document.querySelectorAll('.hud-jump-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetVH = parseFloat(btn.dataset.target || '0');
      const targetY = (targetVH / 100) * window.innerHeight;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });

  // Smooth Anchor Jumps
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href === '') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const targetY = target.offsetTop;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    });
  });
}

// ============================================================================
// 2. TACTILE SEGMENTED CONTROLLERS (QMM & POC PROGRAM SWITCHER)
// ============================================================================
function initSegmentedControllers() {
  const segmentBtns = document.querySelectorAll('.segment-pill');
  const viewQmm = document.getElementById('prog-view-qmm');
  const viewPoc = document.getElementById('prog-view-poc');

  segmentBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      segmentBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const prog = btn.dataset.prog;
      if (prog === 'qmm') {
        viewQmm?.classList.add('view-active');
        viewPoc?.classList.remove('view-active');
      } else {
        viewPoc?.classList.add('view-active');
        viewQmm?.classList.remove('view-active');
      }
    });
  });
}

// ============================================================================
// 3. TACTILE MODALS (LEADERSHIP BIO & INSTITUTIONAL CONTACT DRAWER)
// ============================================================================
function initTactileModals() {
  // Bio Modal
  const bioModal = document.getElementById('leadership-bio-modal');
  const bioClose = document.getElementById('modal-bio-close');
  const bioContent = document.getElementById('modal-bio-content');
  const rosterCards = document.querySelectorAll('.roster-card');

  function openBio(leaderName) {
    const leader = window.QuantbotData?.teamMembers?.find(
      (m) => m.name.toLowerCase() === leaderName.toLowerCase()
    );

    if (!leader || !bioContent) return;

    bioContent.innerHTML = `
      <div class="modal-bio-top">
        <img src="${leader.image}" alt="${leader.name}" class="modal-bio-img" onerror="this.style.display='none'">
        <div>
          <h3 class="modal-bio-title">${leader.name}</h3>
          <span class="modal-bio-role font-mono">${leader.role}</span>
        </div>
      </div>
      <p class="modal-bio-text">${leader.bio}</p>
    `;

    bioModal?.classList.add('is-active');
    bioModal?.setAttribute('aria-hidden', 'false');
  }

  rosterCards.forEach((card) => {
    card.addEventListener('click', () => {
      const name = card.dataset.leader;
      if (name) openBio(name);
    });
  });

  bioClose?.addEventListener('click', () => {
    bioModal?.classList.remove('is-active');
    bioModal?.setAttribute('aria-hidden', 'true');
  });

  bioModal?.addEventListener('click', (e) => {
    if (e.target === bioModal) {
      bioModal.classList.remove('is-active');
      bioModal.setAttribute('aria-hidden', 'true');
    }
  });

  // Contact Modal
  const contactModal = document.getElementById('contact-modal');
  const contactClose = document.getElementById('modal-contact-close');
  const btnIslandContact = document.getElementById('btn-island-contact');
  const contactForm = document.getElementById('spatial-contact-form');
  const formStatus = document.getElementById('form-feedback-status');

  function openContactModal() {
    contactModal?.classList.add('is-active');
    contactModal?.setAttribute('aria-hidden', 'false');
  }

  function closeContactModal() {
    contactModal?.classList.remove('is-active');
    contactModal?.setAttribute('aria-hidden', 'true');
  }

  btnIslandContact?.addEventListener('click', openContactModal);
  contactClose?.addEventListener('click', closeContactModal);

  contactModal?.addEventListener('click', (e) => {
    if (e.target === contactModal) closeContactModal();
  });

  // Handle Form Submission
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span>Encrypting &amp; Routing...</span> <i class="fa fa-spinner fa-spin"></i>`;
    }

    setTimeout(() => {
      contactForm.reset();
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<span>Transmit Encrypted Message</span> <i class="fa fa-paper-plane"></i>`;
      }
      if (formStatus) {
        formStatus.style.display = 'block';
        formStatus.className = 'form-feedback-pill font-mono';
        formStatus.innerHTML = `<i class="fa fa-circle-check"></i> Encrypted message successfully transmitted to Quantbot Technologies executive routing (info@quantbot.com).`;
      }
    }, 1100);
  });

  // Global Escape Key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      bioModal?.classList.remove('is-active');
      bioModal?.setAttribute('aria-hidden', 'true');
      contactModal?.classList.remove('is-active');
      contactModal?.setAttribute('aria-hidden', 'true');
    }
  });
}

// ============================================================================
// 4. MOUSE OPTICS: 3D CARD TILT & SPECULAR SHEEN TRACKING (max 3.5deg)
// ============================================================================
function initMouseOptics() {
  const tiltElements = document.querySelectorAll('[data-tilt]');

  tiltElements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;

      // Max 3.5deg tilt
      const rotX = -normY * 3.5;
      const rotY = normX * 3.5;

      el.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(1.01)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
  });
}
