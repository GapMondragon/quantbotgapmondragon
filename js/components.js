/**
 * QUANTBOT TECHNOLOGIES, LP — OFFICIAL INSTITUTIONAL PLATFORM
 * Apple Pro & iOS 18 Spatial Architecture Engine
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DYNAMIC ISLAND NAVIGATION & GLIDER
  // =========================================================================
  function initDynamicIsland() {
    const nav = document.getElementById('dynamic-island-nav');
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

    // Set initial active state
    updateGlider(navLinks[0]);

    navLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => updateGlider(link));
      link.addEventListener('click', (e) => {
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

    // Contact button modal trigger
    if (contactBtn && contactModal) {
      contactBtn.addEventListener('click', () => {
        contactModal.classList.add('open');
      });
    }

    // Intersection observer for scroll spy
    const sections = document.querySelectorAll('section[id], footer[id]');
    window.addEventListener('scroll', () => {
      let currentId = '';
      const scrollPos = window.scrollY + 200;

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
  // 3. HERO 3D PERSPECTIVE TILT & FLOATING PARALLAX WIDGETS
  // =========================================================================
  function initHeroParallax() {
    const stage = document.getElementById('hero-3d-stage');
    const board = document.getElementById('hero-command-board');
    const widgets = document.querySelectorAll('.parallax-widget');

    if (!stage || !board) return;

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const stageCenterX = rect.left + rect.width / 2;
      const stageCenterY = rect.top + rect.height / 2;

      mouseX = (e.clientX - stageCenterX) / (rect.width / 2);
      mouseY = (e.clientY - stageCenterY) / (rect.height / 2);

      // Clamped rotation degrees
      targetRotX = Math.max(-5, Math.min(5, -mouseY * 4.5));
      targetRotY = Math.max(-6, Math.min(6, mouseX * 5.5));
    }, { passive: true });

    function renderParallax() {
      // Lerp smoothing (0.08 damping)
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      board.style.transform = `perspective(1200px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;

      widgets.forEach((widget) => {
        const speed = parseFloat(widget.getAttribute('data-speed') || '1');
        const offsetX = currentRotY * speed * 2.8;
        const offsetY = -currentRotX * speed * 2.8;
        widget.style.transform = `translate3d(${offsetX.toFixed(1)}px, ${offsetY.toFixed(1)}px, 0)`;
      });

      requestAnimationFrame(renderParallax);
    }

    renderParallax();
  }

  // =========================================================================
  // 4. SECTION 2: EXPANDING SPATIAL PORTAL ("INSIDE QUANT CORE")
  // =========================================================================
  function initExpandingPortal() {
    const section = document.getElementById('about');
    const squircle = document.getElementById('portal-squircle');
    const environment = document.getElementById('portal-environment');

    if (!section || !squircle || !environment) return;

    function onScroll() {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // Progress from 0 (top entering) to 1 (scrolled through)
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      // Interpolate width: 78vw -> 100vw
      const widthVal = 78 + progress * 22;
      // Interpolate height: 70vh -> 100vh
      const heightVal = 70 + progress * 30;
      // Interpolate border-radius: 32px -> 0px
      const radiusVal = Math.max(0, 32 * (1 - progress * 1.5));
      // Interpolate inner content scale: 1.15 -> 1.0
      const contentScale = 1.15 - progress * 0.15;

      squircle.style.width = `${widthVal.toFixed(1)}vw`;
      squircle.style.height = `${heightVal.toFixed(1)}vh`;
      squircle.style.borderRadius = `${radiusVal.toFixed(1)}px`;
      environment.style.transform = `scale(${contentScale.toFixed(3)})`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // =========================================================================
  // 5. SECTION 3: HORIZON-LOCKED 6-STAGE RESEARCH LIFECYCLE
  // =========================================================================
  function initHorizonLifecycle() {
    const processSec = document.getElementById('process');
    const tagCapsule = document.getElementById('lifecycle-tag-capsule');
    const headlineEl = document.getElementById('lifecycle-headline');
    const bodyEl = document.getElementById('lifecycle-body');
    const scrubberBeam = document.getElementById('scrubber-beam');
    const scrubberBtns = document.querySelectorAll('.scrubber-pill-btn');
    const schematics = document.querySelectorAll('.vessel-stage-schematic');
    const vesselBadge = document.getElementById('vessel-badge-label');
    const vesselHash = document.getElementById('vessel-hash-label');
    const plinthStatus = document.getElementById('v-plinth-status');

    if (!processSec || !scrubberBtns.length) return;

    // Authentic Stage Metadata from quantbot.com
    const stagesData = [
      {
        tag: 'STAGE 01 // 06',
        title: 'Stage 01 · Idea Generation',
        body: 'Formulate systematic hypotheses across global equities and electronic futures, collaborating directly with the dedicated internal data engineering desk.',
        badge: 'STAGE 01 · IDEA GENERATION',
        hash: 'LIFECYCLE // #0A84FF_GEN',
        status: 'Active Stage 01 · Hypotheses Forming',
        color: '#0A84FF'
      },
      {
        tag: 'STAGE 02 // 06',
        title: 'Stage 02 · Data Analysis',
        body: 'Gain access to necessary datasets, partition into in-sample and out-of-sample datasets, and thoroughly analyze data quality and market outliers.',
        badge: 'STAGE 02 · DATA ANALYSIS',
        hash: 'LIFECYCLE // #00C7BE_DATA',
        status: 'Active Stage 02 · Partitioning Clean',
        color: '#00C7BE'
      },
      {
        tag: 'STAGE 03 // 06',
        title: 'Stage 03 · Code Development',
        body: 'Test the hypothesis on in-sample data using our high-performance development stack (C++, Python, R), evaluating performance rigorously against empirical benchmarks.',
        badge: 'STAGE 03 · CODE DEVELOPMENT',
        hash: 'LIFECYCLE // #30D158_HPC',
        status: 'Active Stage 03 · Kernel Benchmarked',
        color: '#30D158'
      },
      {
        tag: 'STAGE 04 // 06',
        title: 'Stage 04 · Trading Logic & Risk Management',
        body: 'If in-sample results meet expectations, further develop the strategy by implementing trading logic and strict risk management using our proprietary backtesting platform.',
        badge: 'STAGE 04 · TRADING LOGIC & RISK',
        hash: 'LIFECYCLE // #5E5CE6_RISK',
        status: 'Active Stage 04 · Factor Risk Governed',
        color: '#5E5CE6'
      },
      {
        tag: 'STAGE 05 // 06',
        title: 'Stage 05 · Paper Trading & Testing',
        body: 'Deploy the strategy in paper trading mode, monitoring live daily performance and comparing with prior backtests alongside support from our operations team to ensure accuracy.',
        badge: 'STAGE 05 · PAPER TRADING & AUDIT',
        hash: 'LIFECYCLE // #FF9F0A_PAPER',
        status: 'Active Stage 05 · Reconciled & Audited',
        color: '#FF9F0A'
      },
      {
        tag: 'STAGE 06 // 06',
        title: 'Stage 06 · Live Production Trading',
        body: 'Once all strict performance, risk, and stability benchmarks are satisfied, the strategy is promoted into actual production live trading 24/7 across global markets.',
        badge: 'STAGE 06 · LIVE PRODUCTION TRADING',
        hash: 'LIFECYCLE // #30D158_PROD',
        status: 'Active Stage 06 · 24/7 Live Execution',
        color: '#30D158'
      }
    ];

    let currentStageIndex = 0;

    function setStage(index) {
      if (index === currentStageIndex && schematics[index]?.classList.contains('schematic-active')) {
        return;
      }
      currentStageIndex = index;
      const data = stagesData[index];

      // Update Narrative Texts
      if (tagCapsule) {
        tagCapsule.textContent = data.tag;
        tagCapsule.style.borderColor = data.color;
        tagCapsule.style.color = data.color;
      }
      if (headlineEl) headlineEl.textContent = data.title;
      if (bodyEl) bodyEl.textContent = data.body;

      // Update Scrubber Button States & Beam Position
      scrubberBtns.forEach((btn, i) => {
        if (i === index) {
          btn.classList.add('is-active');
        } else {
          btn.classList.remove('is-active');
        }
      });

      if (scrubberBeam) {
        scrubberBeam.style.top = `${index * 16.666}%`;
        scrubberBeam.style.backgroundColor = data.color;
        scrubberBeam.style.boxShadow = `0 0 12px ${data.color}`;
      }

      // Morphed Schematic in Master Vessel
      schematics.forEach((s, i) => {
        if (i === index) {
          s.classList.add('schematic-active');
        } else {
          s.classList.remove('schematic-active');
        }
      });

      // Update Vessel HUD
      if (vesselBadge) vesselBadge.textContent = data.badge;
      if (vesselHash) vesselHash.textContent = data.hash;
      if (plinthStatus) {
        plinthStatus.textContent = data.status;
        plinthStatus.style.color = data.color;
      }
    }

    // Click handler on scrubber buttons
    scrubberBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const stageNum = parseInt(btn.getAttribute('data-stage') || '0', 10);
        const anchorId = `stage-0${stageNum + 1}`;
        const anchorEl = document.getElementById(anchorId);
        if (anchorEl) {
          anchorEl.scrollIntoView({ behavior: 'smooth' });
        } else {
          setStage(stageNum);
        }
      });
    });

    // Scroll progress detection across the 600vh track
    function onScrollLifecycle() {
      const rect = processSec.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(0.999, scrolled / totalScrollable));
      const targetIndex = Math.min(5, Math.floor(progress * 6));

      setStage(targetIndex);
    }

    window.addEventListener('scroll', onScrollLifecycle, { passive: true });
    setStage(0);
  }

  // =========================================================================
  // 6. SECTION 4: SIGNATURE PROGRAMS SEGMENTED CONTROLLER (QMM vs POC)
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
  // 7. SECTION 5: LEADERSHIP TEAM BIO MODAL
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

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

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
          // Fallback extraction from card DOM
          const name = card.querySelector('.leader-name-text')?.textContent || leaderName;
          const role = card.querySelector('.leader-role-tag')?.textContent || 'Leadership Team';
          const img = card.querySelector('.leader-avatar-img')?.getAttribute('src') || '';
          const snippet = card.querySelector('.leader-snippet-text')?.textContent || '';
          member = { name, role, image: img, bio: snippet };
        }

        content.innerHTML = `
          <div class="modal-profile-header" style="display:flex; align-items:center; gap:20px; margin-bottom:24px; padding-bottom:20px; border-bottom:1px solid rgba(255,255,255,0.08);">
            <img src="${member.image}" alt="${member.name}" style="width:84px; height:84px; border-radius:18px; object-fit:cover; border:1px solid rgba(255,255,255,0.18);">
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
  // 8. SECTION 6: INSTITUTIONAL CONTACT MODAL & FORM
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
  // 9. 3D TACTILE HOVER TILT ON [data-tilt] ELEMENTS
  // =========================================================================
  function initTactileTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // Max 3.5 deg tilt
        const rotX = -y * 7;
        const rotY = x * 7;

        el.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-2px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  // =========================================================================
  // 10. GLOBAL ESCAPE KEY LISTENER FOR MODALS
  // =========================================================================
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.spatial-modal-overlay.open').forEach((m) => {
        m.classList.remove('open');
      });
    }
  });

  // =========================================================================
  // DOM READY INITIALIZER
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initDynamicIsland();
    initWorldClocks();
    initHeroParallax();
    initExpandingPortal();
    initHorizonLifecycle();
    initProgramSwitcher();
    initLeadershipModal();
    initContactModal();
    initTactileTilt();
  });
})();
