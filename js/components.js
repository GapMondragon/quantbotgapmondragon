// ============================================================================
// QUANTBOT TECHNOLOGIES — SPATIAL DAMPED PHYSICS ENGINE
// 100vw x 100vh Spatial Camera Viewport, Dynamic Liquid Glass Morphing,
// Expanding Portals, Horizon Lock, and Multi-Plane Parallax
// ============================================================================

const STAGES = [
  {
    id: 'hero',
    watermark: 'QUANTBOT // OS',
    badge: 'INSTITUTIONAL QUANT ENGINE',
    headline: 'Pioneering Autonomous Alpha.',
    subline: 'Precision algorithmic infrastructure built for institutional capital and zero-latency execution.',
    metrics: [['ENGINE', 'ACTIVE'], ['EXECUTION', '< 1.2ms'], ['DISCIPLINE', 'STRICT']],
    width: 720, height: 340, radius: 48, accent: '#0A84FF',
    nextStageId: 'stage-01',
    nextStageLabel: 'Enter Stage 01 →',
    deepSpecs: `
      <div class="spec-grid">
        <div class="spec-box">
          <div class="spec-box-title">System Topology</div>
          <div class="spec-box-desc">Autonomous multi-asset electronic trading framework designed for global cash equities and liquid futures. Direct co-location at NY4, LD4, and HK1.</div>
        </div>
        <div class="spec-box">
          <div class="spec-box-title">Institutional Governance</div>
          <div class="spec-box-desc">Real-time risk guardrails, pre-trade compliance checks, and automated factor neutrality enforcement across all active capital portfolios.</div>
        </div>
        <div class="spec-box">
          <div class="spec-box-title">Compute Infrastructure</div>
          <div class="spec-box-desc">Distributed HPC cluster running Python, C++20 SIMD, and Apache Arrow tick pipelines with sub-microsecond internal message buses.</div>
        </div>
        <div class="spec-box">
          <div class="spec-box-title">Dual Platforms</div>
          <div class="spec-box-desc">Integrated support for Proof of Concept (POC) quantitative research tracks and Quantbot Multi-Manager (QMM) institutional capital allocations.</div>
        </div>
      </div>
    `
  },
  {
    id: 'stage-01',
    watermark: 'STAGE // 01',
    badge: 'STAGE 01 · DATA & SIGNAL INGESTION',
    headline: 'Multi-Stream Market Telemetry.',
    subline: 'Real-time ingestion and structural filtering of high-frequency price action across global liquidity pools.',
    metrics: [['STREAM', 'KAFKA / RT'], ['TIMEFRAME', '1H / MULTI'], ['NOISE FILTER', '99.4%']],
    width: 900, height: 360, radius: 32, accent: '#00C7BE',
    nextStageId: 'stage-02',
    nextStageLabel: 'Enter Stage 02 →',
    deepSpecs: `
      <div class="spec-grid">
        <div class="spec-box">
          <div class="spec-box-title">High-Frequency Tick Feeds</div>
          <div class="spec-box-desc">Direct L1, L2, and full order-book depth ingestion processing over 1.2M market updates per second across CME, EUREX, HKEX, and NASDAQ.</div>
        </div>
        <div class="spec-box">
          <div class="spec-box-title">Outlier &amp; Noise Rejection</div>
          <div class="spec-box-desc">Statistical noise filtering algorithms isolate genuine liquidity shifts from predatory micro-flashes and exchange telemetry artifacts.</div>
        </div>
        <div class="spec-box">
          <div class="spec-box-title">Strict IS / OOS Partitioning</div>
          <div class="spec-box-desc">Petabyte-scale market archives partitioned into pristine in-sample training and out-of-sample forward verification to prevent lookahead bias.</div>
        </div>
        <div class="spec-box">
          <div class="spec-box-title">Telemetry Observability</div>
          <div class="spec-box-desc">Prometheus and Grafana metrics tracking queue depth, packet jitter, and feed latency at 10-nanosecond hardware clock resolution.</div>
        </div>
      </div>
    `
  },
  {
    id: 'stage-02',
    watermark: 'STAGE // 02',
    badge: 'STAGE 02 · PATTERN & QUANT CORE',
    headline: 'Multimodal Pattern Intelligence.',
    subline: 'AI-driven structural recognition paired with battle-tested Pine Script & Python quantitative validation.',
    metrics: [['RECOGNITION', 'VISION AI'], ['BACKTEST', 'VERIFIED'], ['OVERTRADE LOCK', 'ENABLED']],
    width: 780, height: 420, radius: 44, accent: '#30D158',
    nextStageId: 'stage-03',
    nextStageLabel: 'Enter Stage 03 →',
    deepSpecs: `
      <div class="spec-grid">
        <div class="spec-box">
          <div class="spec-box-title">Multimodal Chart AI</div>
          <div class="spec-box-desc">Neural pattern extractors classify structural breakouts, liquidity sweeps, and harmonic setups before standard retail indicators trigger.</div>
        </div>
        <div class="spec-box">
          <div class="spec-box-title">Quantitative Alpha Model</div>
          <div class="spec-box-desc">Orthogonal statistical edges mathematically verified across multiple macroeconomic cycles, producing steady empirical Sharpe ratios above 3.2.</div>
        </div>
        <div class="spec-box">
          <div class="spec-box-title">Overtrade &amp; Tilt Lockout</div>
          <div class="spec-box-desc">Hard-coded algorithmic cooldown circuits automatically freeze position increases after consecutive volatility spikes or spread widening.</div>
        </div>
        <div class="spec-box">
          <div class="spec-box-title">Factor Neutrality Matrix</div>
          <div class="spec-box-desc">Continuous real-time hedging across momentum, value, and size factors to ensure pure alpha extraction with zero market-beta exposure.</div>
        </div>
      </div>
    `
  },
  {
    id: 'stage-03',
    watermark: 'STAGE // 03',
    badge: 'STAGE 03 · AUTONOMOUS EXECUTION',
    headline: 'Zero-Emotion Capital Deployment.',
    subline: 'Hard-coded drawdown circuit breakers and deterministic order routing for institutional peace of mind.',
    metrics: [['RISK CAP', 'HARD-LOCKED'], ['SLIPPAGE', 'MINIMAL'], ['STATUS', 'PRODUCTION']],
    width: 660, height: 380, radius: 28, accent: '#5E5CE6',
    nextStageId: 'hero',
    nextStageLabel: 'Return to Overview ↺',
    deepSpecs: `
      <div class="spec-grid">
        <div class="spec-box">
          <div class="spec-box-title">Deterministic Order Routing</div>
          <div class="spec-box-desc">Direct fiber cross-connects route sub-millisecond orders through broker APIs and direct market access (DMA) gateways with adaptive TWAP/VWAP logic.</div>
        </div>
        <div class="spec-box">
          <div class="spec-box-title">Circuit Breakers</div>
          <div class="spec-box-desc">Automated intra-day drawdown halts trigger instantaneous portfolio flattening if pre-set institutional risk thresholds are approached.</div>
        </div>
        <div class="spec-box">
          <div class="spec-box-title">Execution Shadow Audit</div>
          <div class="spec-box-desc">Live fills are audited in real time against simulated paper benchmarks, tracking slippage decay down to fractions of a basis point.</div>
        </div>
        <div class="spec-box">
          <div class="spec-box-title">Institutional Reporting</div>
          <div class="spec-box-desc">Automated end-of-day NAV calculations, trade reconciliations, and compliance logs delivered directly to institutional LP portals.</div>
        </div>
      </div>
    `
  }
];

// Linear interpolation helpers
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

let targetProgress = 0; // 0.0 to 3.0
let currentProgress = 0;
let targetMX = 0, targetMY = 0, curMX = 0, curMY = 0;
let currentActiveIdx = -1;

window.addEventListener('scroll', () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  targetProgress = maxScroll > 0 ? (window.scrollY / maxScroll) * (STAGES.length - 1) : 0;
}, { passive: true });

window.addEventListener('mousemove', (e) => {
  targetMX = (e.clientX / window.innerWidth - 0.5) * 2;
  targetMY = (e.clientY / window.innerHeight - 0.5) * 2;
}, { passive: true });

function updateStageContent(idx) {
  if (idx === currentActiveIdx) return;
  currentActiveIdx = idx;

  const stage = STAGES[idx];
  if (!stage) return;

  // 1. Accent color update
  document.documentElement.style.setProperty('--stage-accent', stage.accent);
  document.documentElement.style.setProperty('--portal-color', `${stage.accent}33`);

  // 2. Texts in Liquid Glass Vessel
  const badge = document.getElementById('ui-badge');
  const headline = document.getElementById('ui-headline');
  const subline = document.getElementById('ui-subline');
  const watermark = document.getElementById('stage-watermark');
  const ctaBtn = document.getElementById('primary-cta-btn');

  if (badge) badge.textContent = stage.badge;
  if (headline) headline.textContent = stage.headline;
  if (subline) subline.textContent = stage.subline;
  if (watermark) watermark.textContent = stage.watermark;

  if (ctaBtn) {
    ctaBtn.textContent = stage.nextStageLabel;
    ctaBtn.setAttribute('href', `#${stage.nextStageId}`);
  }

  // 3. Metrics Pills
  const metricsContainer = document.getElementById('ui-metrics');
  if (metricsContainer) {
    metricsContainer.innerHTML = stage.metrics
      .map(([label, val]) => `
        <div class="ios-pill">
          <span class="label">${label}</span>
          <span class="val">${val}</span>
        </div>
      `)
      .join('');
  }

  // 4. Update Dynamic Island Nav Active State & Glider Position
  const navLinks = document.querySelectorAll('.segmented-control a');
  const glider = document.getElementById('nav-glider');

  navLinks.forEach((link, lIdx) => {
    if (lIdx === idx) {
      link.classList.add('active');
      if (glider && link.parentElement) {
        const parentRect = link.parentElement.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        glider.style.left = `${linkRect.left - parentRect.left}px`;
        glider.style.width = `${linkRect.width}px`;
      }
    } else {
      link.classList.remove('active');
    }
  });

  // 5. Drawer Content
  const drawerBadge = document.getElementById('drawer-stage-badge');
  const drawerContent = document.getElementById('drawer-deep-content');
  if (drawerBadge) drawerBadge.textContent = `${stage.badge} // SPECIFICATIONS`;
  if (drawerContent) drawerContent.innerHTML = stage.deepSpecs;
}

function tick() {
  // Silky iOS damping
  currentProgress = lerp(currentProgress, targetProgress, 0.07);
  curMX = lerp(curMX, targetMX, 0.08);
  curMY = lerp(curMY, targetMY, 0.08);

  const baseIdx = clamp(Math.floor(currentProgress), 0, STAGES.length - 2);
  const nextIdx = baseIdx + 1;
  const localT = clamp(currentProgress - baseIdx, 0, 1);

  // Smooth step curve for glass morphing
  const smoothT = localT * localT * (3 - 2 * localT);
  const sA = STAGES[baseIdx];
  const sB = STAGES[nextIdx];

  // 1. Morph Liquid Glass Vessel dimensions smoothly
  const w = lerp(sA.width, sB.width, smoothT);
  const h = lerp(sA.height, sB.height, smoothT);
  const r = lerp(sA.radius, sB.radius, smoothT);

  const vessel = document.getElementById('liquid-glass-vessel');
  if (vessel) {
    vessel.style.width = `min(90vw, ${w.toFixed(1)}px)`;
    vessel.style.minHeight = `${h.toFixed(1)}px`;
    vessel.style.borderRadius = `${r.toFixed(1)}px`;
    vessel.style.transform = `translate(-50%, -50%) perspective(1200px) rotateX(${(curMY * -3.5).toFixed(2)}deg) rotateY(${(curMX * 3.5).toFixed(2)}deg)`;
  }

  // 2. Expanding Portal math (expands between localT 0.25 and 0.85)
  const portalT = clamp((localT - 0.25) / 0.6, 0, 1);
  const insetV = lerp(42, 0, portalT);
  const insetH = lerp(44, 0, portalT);
  const portalRad = lerp(44, 0, portalT);
  const portalFrame = document.getElementById('expanding-portal-frame');
  const innerWorld = document.getElementById('portal-inner-world');

  if (portalFrame) {
    portalFrame.style.clipPath = `inset(${insetV.toFixed(1)}% ${insetH.toFixed(1)}% ${insetV.toFixed(1)}% ${insetH.toFixed(1)}% round ${portalRad.toFixed(1)}px)`;
    portalFrame.style.opacity = portalT > 0.01 && portalT < 0.99 ? '1' : '0';
  }
  if (innerWorld) {
    innerWorld.style.transform = `scale(${lerp(1.3, 1.0, portalT).toFixed(3)})`;
  }

  // 3. Multi-plane Parallax
  const watermark = document.getElementById('parallax-watermark-layer');
  if (watermark) {
    watermark.style.transform = `translate3d(${(curMX * -35).toFixed(1)}px, ${(curMY * -25 + (localT - 0.5) * -60).toFixed(1)}px, 0)`;
  }

  const grid = document.getElementById('perspective-grid');
  if (grid) {
    grid.style.backgroundPositionY = `${(currentProgress * 180).toFixed(1)}px`;
  }

  // 4. Progress Rail & HUD coordinates
  const progressFill = document.getElementById('progress-fill');
  if (progressFill) {
    progressFill.style.width = `${((currentProgress / (STAGES.length - 1)) * 100).toFixed(1)}%`;
  }

  const hudCoords = document.getElementById('hud-coordinates');
  if (hudCoords) {
    hudCoords.textContent = `Z-DEPTH: ${currentProgress.toFixed(2)} // HORIZON LOCKED`;
  }

  // 5. Swap active stage text cleanly at midpoint
  const activeIdx = Math.round(currentProgress);
  updateStageContent(activeIdx);

  requestAnimationFrame(tick);
}

// Interactive Smooth Navigation
function setupNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetHash = link.getAttribute('href');
      const targetId = targetHash.replace('#', '');
      const stageIdx = STAGES.findIndex((s) => s.id === targetId);

      if (stageIdx !== -1) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const targetScrollY = (stageIdx / (STAGES.length - 1)) * maxScroll;
        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth'
        });
      }
    });
  });

  // URL Hash on initial load
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    const idx = STAGES.findIndex((s) => s.id === hash);
    if (idx !== -1) {
      setTimeout(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({
          top: (idx / (STAGES.length - 1)) * maxScroll,
          behavior: 'smooth'
        });
      }, 150);
    }
  }
}

// iOS Glass Spec Drawer Setup
function setupDrawer() {
  const drawer = document.getElementById('ios-spec-drawer');
  const openBtn = document.getElementById('open-drawer-btn');
  const closeBtn = document.getElementById('close-drawer-btn');
  const backdrop = document.getElementById('drawer-backdrop');

  if (!drawer) return;

  function openDrawer() {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
  }

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupDrawer();
  updateStageContent(0);
  requestAnimationFrame(tick);
});
