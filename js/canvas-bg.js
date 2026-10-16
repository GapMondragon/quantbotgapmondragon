// ============================================================================
// Quantbot Technologies — Layer 01: Vanta.js + Three.js 3D WebGL Canvas Engine
// Implements the Antigravity Pipeline Layer 01 (VANTA.NET / WAVES / FOG / HALO)
// with automatic Three.js + Vanta CDN hydration and clean .destroy() lifecycle
// ============================================================================

(function () {
  // 1. Create Fixed Full-Bleed Vanta.js WebGL Container (#vanta-bg)
  let vantaContainer = document.getElementById('vanta-bg');
  if (!vantaContainer) {
    vantaContainer = document.createElement('div');
    vantaContainer.id = 'vanta-bg';
    vantaContainer.setAttribute('aria-hidden', 'true');
    document.body.prepend(vantaContainer);
  }

  // 2. Create Supplemental Subtle Telemetry Canvas (#quant-canvas)
  let canvas = document.getElementById('quant-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'quant-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);
  }

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Modes: 'constellation' (VANTA.NET) | 'topology' (VANTA.WAVES) | 'quadtree' (VANTA.HALO) | 'aurora' (VANTA.FOG)
  const MODES = ['constellation', 'topology', 'quadtree', 'aurora'];
  let currentMode = localStorage.getItem('qb_canvas_mode') || 'constellation';
  if (!MODES.includes(currentMode)) currentMode = 'constellation';

  // Color Palettes synced with the 5 institutional themes
  const PALETTES = {
    'sovereign-navy': {
      vantaColor: 0x10b981,
      vantaColor2: 0xe6d5b8,
      vantaBg: 0x05080e,
      primary: [230, 213, 184],   // Champagne Gold
      secondary: [16, 185, 129],  // Telemetry Emerald
      tertiary: [148, 163, 184],  // Cool Slate
    },
    'atelier-gold': {
      vantaColor: 0xe6d5b8,
      vantaColor2: 0xd4af37,
      vantaBg: 0x070709,
      primary: [230, 213, 184],
      secondary: [212, 175, 55],
      tertiary: [168, 153, 128],
    },
    'vision-spatial': {
      vantaColor: 0x38bdf8,
      vantaColor2: 0x10b981,
      vantaBg: 0x040812,
      primary: [56, 189, 248],
      secondary: [16, 185, 129],
      tertiary: [224, 242, 254],
    },
    'titanium-quant': {
      vantaColor: 0xf59e0b,
      vantaColor2: 0x10b981,
      vantaBg: 0x090a0c,
      primary: [245, 158, 11],
      secondary: [16, 185, 129],
      tertiary: [161, 161, 170],
    },
    'swiss-editorial': {
      vantaColor: 0x7c5e3c,
      vantaColor2: 0x0f5132,
      vantaBg: 0xf5f2eb,
      primary: [124, 94, 60],
      secondary: [15, 81, 50],
      tertiary: [24, 24, 22],
    },
  };

  function getActivePalette() {
    const theme = document.documentElement.getAttribute('data-theme') || 'sovereign-navy';
    return PALETTES[theme] || PALETTES['sovereign-navy'];
  }

  // 3. Dynamic Loader & Lifecycle Manager for Three.js + Vanta.js Presets
  let vantaEffect = null;

  function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        if (existing.dataset.loaded === 'true') return resolve();
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', (e) => reject(e));
        return;
      }
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = () => {
        s.dataset.loaded = 'true';
        resolve();
      };
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });
  }

  async function ensureVantaLibraries() {
    if (typeof window.THREE === 'undefined') {
      await loadScriptOnce('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
    } else {
      const existingThree = document.querySelector('script[src*="three.min.js"]');
      if (existingThree) existingThree.dataset.loaded = 'true';
    }

    const presetMap = {
      constellation: { globalKey: 'NET', url: 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js' },
      topology: { globalKey: 'WAVES', url: 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.waves.min.js' },
      aurora: { globalKey: 'FOG', url: 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.fog.min.js' },
      quadtree: { globalKey: 'HALO', url: 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.halo.min.js' },
    };

    const target = presetMap[currentMode] || presetMap.constellation;
    if (!window.VANTA || !window.VANTA[target.globalKey]) {
      await loadScriptOnce(target.url);
    }
  }

  async function mountVantaScene() {
    try {
      await ensureVantaLibraries();
      if (vantaEffect && typeof vantaEffect.destroy === 'function') {
        vantaEffect.destroy();
        vantaEffect = null;
      }

      if (!window.VANTA || !window.THREE) return;
      const pal = getActivePalette();

      if (currentMode === 'constellation' && window.VANTA.NET) {
        vantaEffect = window.VANTA.NET({
          el: vantaContainer,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: pal.vantaColor,
          backgroundColor: pal.vantaBg,
          points: 11.0,
          maxDistance: 21.0,
          spacing: 17.0,
          showDots: true,
        });
      } else if (currentMode === 'topology' && window.VANTA.WAVES) {
        vantaEffect = window.VANTA.WAVES({
          el: vantaContainer,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: pal.vantaBg === 0xf5f2eb ? 0xd8d0c1 : 0x081220,
          shininess: 38.0,
          waveHeight: 16.0,
          waveSpeed: 0.65,
          zoom: 0.88,
        });
      } else if (currentMode === 'aurora' && window.VANTA.FOG) {
        vantaEffect = window.VANTA.FOG({
          el: vantaContainer,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          highlightColor: pal.vantaColor2,
          midtoneColor: pal.vantaColor,
          lowlightColor: pal.vantaBg,
          baseColor: pal.vantaBg,
          blurFactor: 0.62,
          speed: 1.1,
          zoom: 0.9,
        });
      } else if (currentMode === 'quadtree' && window.VANTA.HALO) {
        vantaEffect = window.VANTA.HALO({
          el: vantaContainer,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          baseColor: pal.vantaColor,
          backgroundColor: pal.vantaBg,
          amplitudeFactor: 1.4,
          size: 1.15,
        });
      } else if (window.VANTA.NET) {
        vantaEffect = window.VANTA.NET({
          el: vantaContainer,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          color: pal.vantaColor,
          backgroundColor: pal.vantaBg,
          points: 11.0,
          maxDistance: 21.0,
          spacing: 17.0,
        });
      }
    } catch (_) {
      // Fallback 2D canvas continues smoothly if offline or WebGL context unavailable
    }
  }

  // 4. Supplemental Subtle 2D Quantitative Data Packet Overlay
  let particles = [];
  let warpVelocity = 0;
  const particleCount = Math.min(36, Math.max(18, Math.floor(window.innerWidth / 42)));

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.28;
      this.vy = (Math.random() - 0.5) * 0.28;
      this.size = Math.random() * 1.6 + 0.6;
      this.alpha = Math.random() * 0.32 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy - warpVelocity * 0.7;
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }
    draw(pal) {
      const rgb = pal.primary;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${this.alpha})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animateOverlay() {
    ctx.clearRect(0, 0, width, height);
    warpVelocity *= 0.9;
    if (Math.abs(warpVelocity) < 0.01) warpVelocity = 0;

    const pal = getActivePalette();
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(pal);
    }
    requestAnimationFrame(animateOverlay);
  }

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
    if (vantaEffect && typeof vantaEffect.resize === 'function') {
      vantaEffect.resize();
    }
  });

  // Expose Public API for Random Roll & Theme Switcher
  window.QuantCanvas = {
    getModes: () => MODES.slice(),
    getMode: () => currentMode,
    setMode: (mode) => {
      if (MODES.includes(mode)) {
        currentMode = mode;
        localStorage.setItem('qb_canvas_mode', mode);
      }
      mountVantaScene();
      return currentMode;
    },
    cycleMode: () => {
      const next = MODES[(MODES.indexOf(currentMode) + 1) % MODES.length];
      window.QuantCanvas.setMode(next);
      return next;
    },
    pulseWarp: (direction = 1) => {
      warpVelocity = direction * 6.5;
    },
    refreshPalette: () => {
      mountVantaScene();
    },
  };

  initParticles();
  requestAnimationFrame(animateOverlay);
  mountVantaScene();
})();
