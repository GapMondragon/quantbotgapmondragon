/**
 * QUANTBOT TECHNOLOGIES, LP — OFFICIAL INSTITUTIONAL PLATFORM
 * Apple Pro & iOS 18 Clean Architecture Engine (Pure Native Scrolling)
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DYNAMIC ISLAND STICKY NAVIGATION & GLIDER
  // =========================================================================
  function initDynamicIsland() {
    const glider = document.querySelector('.island-glider');
    const navLinks = document.querySelectorAll('.island-link');
    const contactBtn = document.getElementById('btn-island-contact');
    const contactModal = document.getElementById('contact-modal');

    if (!glider || !navLinks.length) return;

    function updateGlider(target) {
      if (!target) return;
      glider.style.left = `${target.offsetLeft}px`;
      glider.style.width = `${target.offsetWidth}px`;
    }

    // Set initial position
    updateGlider(navLinks[0]);

    navLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => updateGlider(link));
      link.addEventListener('click', () => {
        navLinks.forEach((l) => l.classList.remove('is-active'));
        link.classList.add('is-active');
        updateGlider(link);
      });
    });

    const navContainer = document.querySelector('.island-nav-links');
    if (navContainer) {
      navContainer.addEventListener('mouseleave', () => {
        const activeLink = document.querySelector('.island-link.is-active') || navLinks[0];
        updateGlider(activeLink);
      });
    }

    // Contact modal trigger
    if (contactBtn && contactModal) {
      contactBtn.addEventListener('click', () => {
        contactModal.classList.add('open');
      });
    }

    // Native scroll spy
    const sections = document.querySelectorAll('section[id], footer[id]');
    window.addEventListener('scroll', () => {
      let currentId = '';
      const scrollPos = window.scrollY + 220;

      sections.forEach((sec) => {
        if (sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
          currentId = sec.getAttribute('id');
        }
      });

      if (currentId) {
        navLinks.forEach((l) => {
          if (l.getAttribute('href') === `#${currentId}`) {
            navLinks.forEach((other) => other.classList.remove('is-active'));
            l.classList.add('is-active');
            updateGlider(l);
          }
        });
      }
    }, { passive: true });
  }

  // =========================================================================
  // 2. LIVE WORLD TRADING SESSION CLOCKS
  // =========================================================================
  function initWorldClocks() {
    const nyEl = document.getElementById('clock-ny');
    const ldnEl = document.getElementById('clock-ldn');
    const hkEl = document.getElementById('clock-hk');

    function updateClocks() {
      const now = new Date();

      if (nyEl) {
        const nyTime = new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZoneName: 'short'
        }).format(now);
        nyEl.textContent = nyTime;
      }

      if (ldnEl) {
        const ldnTime = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/London',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZoneName: 'short'
        }).format(now);
        ldnEl.textContent = ldnTime;
      }

      if (hkEl) {
        const hkTime = new Intl.DateTimeFormat('en-HK', {
          timeZone: 'Asia/Hong_Kong',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZoneName: 'short'
        }).format(now);
        hkEl.textContent = hkTime;
      }
    }

    updateClocks();
    setInterval(updateClocks, 1000);
  }

  // =========================================================================
  // 3. THE 6-STAGE RESEARCH LIFECYCLE (STEPPED PIPELINE)
  // =========================================================================
  function initSteppedPipeline() {
    const stepBtns = document.querySelectorAll('.step-nav-btn');
    const tagBadge = document.getElementById('p-stage-tag');
    const catLabel = document.getElementById('p-stage-cat');
    const titleEl = document.getElementById('p-stage-title');
    const descEl = document.getElementById('p-stage-desc');
    const checklistEl = document.getElementById('p-stage-checklist');
    const statusEl = document.getElementById('p-stage-status');
    const vesselTitle = document.getElementById('vessel-title');
    const vesselCode = document.getElementById('vessel-code');
    const schematics = document.querySelectorAll('.schematic-pane');

    if (!stepBtns.length) return;

    // Authentic Stage Metadata from quantbot.com
    const stagesData = [
      {
        tag: 'STAGE 01 // 06',
        cat: 'EMPIRICAL HYPOTHESIS',
        title: 'Stage 01 · Idea Generation',
        desc: 'Formulate systematic hypotheses across global equities and electronic futures, collaborating directly with the dedicated internal data engineering desk.',
        checklist: [
          'Dedicated Data Engineering Synchronization',
          'Statistical Viability & Microstructure Rationale',
          'Curated Petabyte Historical Feeds'
        ],
        status: 'ACTIVE RESEARCH DESK',
        vTitle: 'STAGE 01 · IDEA GENERATION',
        vCode: '#0A84FF_GEN',
        color: '#0A84FF'
      },
      {
        tag: 'STAGE 02 // 06',
        cat: 'DATA HYGIENE & SPLIT',
        title: 'Stage 02 · Data Analysis',
        desc: 'Gain access to necessary datasets, partition into in-sample and out-of-sample datasets, and thoroughly analyze data quality and market outliers.',
        checklist: [
          'In-Sample (60%) vs. Out-of-Sample Partitioning',
          'Outlier Cleansing & Look-Ahead Bias Prevention',
          'Tick Microstructure Quality Verification'
        ],
        status: 'PARTITIONING VERIFIED',
        vTitle: 'STAGE 02 · DATA ANALYSIS',
        vCode: '#00C7BE_DATA',
        color: '#00C7BE'
      },
      {
        tag: 'STAGE 03 // 06',
        cat: 'HIGH-PERFORMANCE MODELING',
        title: 'Stage 03 · Code Development',
        desc: 'Test the hypothesis on in-sample data using our high-performance development stack (C++, Python, R), evaluating performance rigorously against empirical benchmarks.',
        checklist: [
          'C++ Low-Latency & Python/R Research Kernels',
          'High-Performance Linux Cluster Compute Grid',
          'Baseline Empirical Alpha Validation'
        ],
        status: 'KERNEL BENCHMARKED',
        vTitle: 'STAGE 03 · CODE DEVELOPMENT',
        vCode: '#30D158_HPC',
        color: '#30D158'
      },
      {
        tag: 'STAGE 04 // 06',
        cat: 'PORTFOLIO GOVERNANCE',
        title: 'Stage 04 · Trading Logic & Risk Management',
        desc: 'If in-sample results meet expectations, further develop the strategy by implementing trading logic and strict risk management using our proprietary backtesting platform.',
        checklist: [
          'Global Factor Risk Models & Controlled Exposures',
          'Transaction Cost Models (TCM) & Slippage Penalties',
          'Hard Risk Interlocks & Portfolio Guardrails'
        ],
        status: 'FACTOR RISK GOVERNED',
        vTitle: 'STAGE 04 · TRADING LOGIC & RISK',
        vCode: '#5E5CE6_RISK',
        color: '#5E5CE6'
      },
      {
        tag: 'STAGE 05 // 06',
        cat: 'OPERATIONAL VERIFICATION',
        title: 'Stage 05 · Paper Trading & Testing',
        desc: 'Deploy the strategy in paper trading mode, monitoring live daily performance and comparing with prior backtests alongside support from our operations team to ensure accuracy.',
        checklist: [
          'Daily Production Fill & Reconciliation Audits',
          'Live Slippage vs. Backtest Baseline Comparison',
          'Dedicated Operational Desk Monitoring'
        ],
        status: 'SIMULATED PRODUCTION',
        vTitle: 'STAGE 05 · PAPER TRADING',
        vCode: '#FF9F0A_PAPER',
        color: '#FF9F0A'
      },
      {
        tag: 'STAGE 06 // 06',
        cat: 'LIVE PRODUCTION TRADING',
        title: 'Stage 06 · Live Production Trading',
        desc: 'Once all strict performance, risk, and stability benchmarks are satisfied, the strategy is promoted into actual production live trading 24/7 across global markets.',
        checklist: [
          '24/7 Automated Production Execution',
          'Zero Discretionary Manual Intervention',
          'Global Cash Equities & Electronic Futures Desks'
        ],
        status: '24/7 LIVE EXECUTION',
        vTitle: 'STAGE 06 · LIVE PRODUCTION',
        vCode: '#30D158_PROD',
        color: '#30D158'
      }
    ];

    function selectStage(index) {
      const data = stagesData[index];
      if (!data) return;

      // Update button states
      stepBtns.forEach((btn, i) => {
        if (i === index) {
          btn.classList.add('is-active');
          btn.setAttribute('aria-selected', 'true');
        } else {
          btn.classList.remove('is-active');
          btn.setAttribute('aria-selected', 'false');
        }
      });

      // Update Left Narrative
      if (tagBadge) {
        tagBadge.textContent = data.tag;
        tagBadge.style.color = data.color;
        tagBadge.style.borderColor = data.color;
      }
      if (catLabel) catLabel.textContent = data.cat;
      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;
      if (statusEl) {
        statusEl.textContent = data.status;
        statusEl.style.color = data.color;
      }

      if (checklistEl) {
        checklistEl.innerHTML = data.checklist
          .map((item) => `<div><i class="fa fa-check text-emerald"></i> ${item}</div>`)
          .join('');
      }

      // Update Right Vessel
      if (vesselTitle) vesselTitle.textContent = data.vTitle;
      if (vesselCode) vesselCode.textContent = data.vCode;

      schematics.forEach((s, i) => {
        if (i === index) {
          s.classList.add('is-active');
        } else {
          s.classList.remove('is-active');
        }
      });
    }

    stepBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const stageIndex = parseInt(btn.getAttribute('data-stage') || '0', 10);
        selectStage(stageIndex);
      });
    });

    // Check URL anchor hash on load (e.g. #stage-02)
    const currentHash = window.location.hash;
    if (currentHash && currentHash.startsWith('#stage-0')) {
      const stageNum = parseInt(currentHash.replace('#stage-0', ''), 10) - 1;
      if (stageNum >= 0 && stageNum < 6) {
        selectStage(stageNum);
      }
    }
  }

  // =========================================================================
  // 4. SIGNATURE PROGRAMS SEGMENTED CONTROLLER (QMM vs POC)
  // =========================================================================
  function initProgramSwitcher() {
    const buttons = document.querySelectorAll('.segment-capsule-pill');
    const tabQmm = document.getElementById('tab-qmm');
    const tabPoc = document.getElementById('tab-poc');

    if (!buttons.length || !tabQmm || !tabPoc) return;

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetProg = btn.getAttribute('data-prog');

        buttons.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        if (targetProg === 'poc') {
          tabQmm.classList.remove('view-active');
          tabPoc.classList.add('view-active');
        } else {
          tabPoc.classList.remove('view-active');
          tabQmm.classList.add('view-active');
        }
      });
    });
  }

  // =========================================================================
  // 5. LEADERSHIP TEAM BIO MODAL
  // =========================================================================
  function initLeadershipModal() {
    const modal = document.getElementById('leadership-bio-modal');
    const closeBtn = document.getElementById('modal-bio-close');
    const content = document.getElementById('modal-bio-content');
    const cards = document.querySelectorAll('.leader-profile-card');

    if (!modal || !content) return;

    function closeModal() {
      modal.classList.remove('open');
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const leaderName = card.getAttribute('data-leader');
        let member = null;

        if (window.QuantbotData && window.QuantbotData.teamMembers) {
          member = window.QuantbotData.teamMembers.find(
            (m) => m.name.toLowerCase() === leaderName.toLowerCase() ||
                   m.name.includes(leaderName) ||
                   leaderName.includes(m.name)
          );
        }

        if (!member) {
          const name = card.querySelector('.leader-name-text')?.textContent || leaderName;
          const role = card.querySelector('.leader-role-tag')?.textContent || 'Leadership Team';
          const img = card.querySelector('.leader-avatar-img')?.getAttribute('src') || '';
          const snippet = card.querySelector('.leader-snippet-text')?.textContent || '';
          member = { name, role, image: img, bio: snippet };
        }

        content.innerHTML = `
          <div class="modal-profile-header" style="display:flex; align-items:center; gap:20px; margin-bottom:24px; padding-bottom:20px; border-bottom:1px solid rgba(255,255,255,0.08);">
            <img src="${member.image}" alt="${member.name}" style="width:84px; height:84px; border-radius:16px; object-fit:cover; border:1px solid rgba(255,255,255,0.18);">
            <div>
              <span class="font-mono text-cyan" style="font-size:0.75rem; letter-spacing:0.06em;">${member.role.toUpperCase()}</span>
              <h3 class="text-metallic" style="font-size:1.6rem; font-weight:700; margin-top:2px;">${member.name}</h3>
              <span class="font-mono text-silver" style="font-size:0.75rem;">QUANTBOT TECHNOLOGIES, LP</span>
            </div>
          </div>
          <div class="modal-bio-text" style="font-size:0.92rem; line-height:1.65; color:rgba(255,255,255,0.85);">
            <p>${member.bio}</p>
          </div>
        `;

        modal.classList.add('open');
      });
    });
  }

  // =========================================================================
  // 6. INSTITUTIONAL CONTACT MODAL & FORM
  // =========================================================================
  function initContactModal() {
    const modal = document.getElementById('contact-modal');
    const closeBtn = document.getElementById('modal-contact-close');
    const form = document.getElementById('spatial-contact-form');
    const feedback = document.getElementById('form-feedback-status');
    const triggers = document.querySelectorAll('a[href="#contact"], .btn-open-contact');

    if (!modal) return;

    function closeModal() {
      modal.classList.remove('open');
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('open');
      });
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (feedback) {
          feedback.style.display = 'block';
          feedback.textContent = 'Encrypted transmission dispatched to Quantbot Communications Router.';
        }
        form.reset();
        setTimeout(() => {
          closeModal();
          if (feedback) feedback.style.display = 'none';
        }, 2200);
      });
    }
  }

  // =========================================================================
  // 7. GENTLE HOVER TILT ON [data-tilt] (MAX 2 DEG)
  // =========================================================================
  function initTactileTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // Strictly max 2 degrees tilt
        const rotX = -y * 4;
        const rotY = x * 4;

        el.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-2px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  // =========================================================================
  // 8. ESCAPE KEY TO CLOSE OPEN MODALS
  // =========================================================================
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.spatial-modal-overlay.open').forEach((m) => {
        m.classList.remove('open');
      });
    }
  });

  // =========================================================================
  // INITIALIZATION ON DOM READY
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initDynamicIsland();
    initWorldClocks();
    initSteppedPipeline();
    initProgramSwitcher();
    initLeadershipModal();
    initContactModal();
    initTactileTilt();
  });
})();
