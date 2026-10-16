// ============================================================================
// Quantbot Technologies — Layer 01: Multi-Mode Quantitative Canvas & Shader Engine
// Inspired by Vanta.js (NET / TOPOLOGY), Shadergradient, and 2xA Quadtree Systems
// ============================================================================

(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'quant-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Modes: 'constellation' | 'topology' | 'quadtree' | 'aurora'
  const MODES = ['constellation', 'topology', 'quadtree', 'aurora'];
  let currentMode = localStorage.getItem('qb_canvas_mode') || 'constellation';
  if (!MODES.includes(currentMode)) currentMode = 'constellation';

  // Color palettes synced with the 5 institutional themes
  const PALETTES = {
    'sovereign-navy': {
      primary: [148, 201, 126],   // #94C97E Mint
      secondary: [96, 162, 68],   // #60A244 Green
      tertiary: [230, 213, 184],  // #E6D5B8 Champagne Gold
      glow: 'rgba(148, 201, 126, 0.22)',
    },
    'atelier-gold': {
      primary: [230, 213, 184],   // #E6D5B8 Champagne Gold
      secondary: [197, 160, 89],  // #C5A059 Burnished Gold
      tertiary: [168, 153, 128],  // #A89980 Muted Bronze
      glow: 'rgba(230, 213, 184, 0.2)',
    },
    'swiss-editorial': {
      primary: [45, 106, 79],     // #2D6A4F Editorial Forest
      secondary: [24, 24, 22],    // #181816 Press Ink
      tertiary: [185, 28, 28],    // #B91C1C Swiss Rubric Red
      glow: 'rgba(45, 106, 79, 0.14)',
    },
    'vision-spatial': {
      primary: [56, 189, 248],    // #38BDF8 Spatial Cyan
      secondary: [129, 140, 248], // #818CF8 Periwinkle
      tertiary: [16, 185, 129],   // #10B981 Emerald
      glow: 'rgba(56, 189, 248, 0.22)',
    },
    'titanium-quant': {
      primary: [245, 158, 11],    // #F59E0B Incandescent Amber
      secondary: [16, 185, 129],  // #10B981 Telemetry Emerald
      tertiary: [161, 161, 170],  // #A1A1AA Machined Steel
      glow: 'rgba(245, 158, 11, 0.2)',
    },
  };

  function getActivePalette() {
    const theme = document.documentElement.getAttribute('data-theme') || 'sovereign-navy';
    return PALETTES[theme] || PALETTES['sovereign-navy'];
  }

  let mouse = {
    x: width / 2,
    y: height / 2,
    targetX: width / 2,
    targetY: height / 2,
    active: false,
    radius: 175,
  };

  let scrollOffset = window.scrollY || 0;
  window.addEventListener('scroll', () => {
    scrollOffset = window.scrollY || 0;
  }, { passive: true });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener('mouseout', () => {
    mouse.active = false;
  });

  // Particles & Data Packets for Constellation Mode
  let particles = [];
  let packets = [];
  let warpVelocity = 0;
  const particleCount = Math.min(58, Math.max(28, Math.floor(window.innerWidth / 26)));
  const maxDistance = 155;

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.48;
      this.vy = (Math.random() - 0.5) * 0.48;
      this.size = Math.random() * 2.1 + 0.9;
      this.baseAlpha = Math.random() * 0.45 + 0.2;
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.018 + 0.008;
      this.tier = Math.random() > 0.78 ? 2 : (Math.random() > 0.4 ? 1 : 0);
    }
    update() {
      this.x += this.vx;
      this.y += this.vy - warpVelocity * (0.65 + this.tier * 0.35);

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      this.pulse += this.pulseSpeed;

      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 1) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.35;
          this.y -= (dy / dist) * force * 1.35;
        }
      }
    }
    draw(pal) {
      const alpha = this.baseAlpha + Math.sin(this.pulse) * 0.14;
      const rgb = this.tier === 2 ? pal.tertiary : (this.tier === 1 ? pal.primary : pal.secondary);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${Math.max(0.08, alpha)})`;
      ctx.fill();

      if (this.tier === 2) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2.8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha * 0.25})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    packets = [];
  }

  // Mode 1: Constellation Order-Book Network
  function renderConstellation(pal, time) {
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(pal);

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const opacity = (1 - dist / maxDistance) * 0.26;
          const rgb = pal.primary;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
          ctx.lineWidth = 0.85;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();

          // Spawn occasional quantitative data packet traveling along edge
          if (Math.random() < 0.0004 && packets.length < 10) {
            packets.push({
              from: particles[i],
              to: particles[j],
              progress: 0,
              speed: 0.018 + Math.random() * 0.02,
            });
          }
        }
      }
    }

    // Update & render data packets
    for (let k = packets.length - 1; k >= 0; k--) {
      const pkt = packets[k];
      pkt.progress += pkt.speed;
      if (pkt.progress >= 1) {
        packets.splice(k, 1);
        continue;
      }
      const px = pkt.from.x + (pkt.to.x - pkt.from.x) * pkt.progress;
      const py = pkt.from.y + (pkt.to.y - pkt.from.y) * pkt.progress;
      const rgb = pal.tertiary;
      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.85)`;
      ctx.fill();
    }
  }

  // Mode 2: 3D Topological Wave Mesh (Vanta.TOPOLOGY / Quantitative Volatility Surface)
  function renderTopology(pal, time) {
    const rows = 18;
    const cols = 36;
    const cellW = width / (cols - 1);
    const rowSpacing = height / (rows + 2);
    const t = time * 0.0009;

    for (let r = 0; r < rows; r++) {
      ctx.beginPath();
      const baseY = (r + 1.5) * rowSpacing;
      const rgb = r % 3 === 0 ? pal.tertiary : pal.primary;
      const alpha = 0.08 + (r / rows) * 0.22;
      ctx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
      ctx.lineWidth = r % 4 === 0 ? 1.2 : 0.75;

      for (let c = 0; c < cols; c++) {
        const x = c * cellW;
        const dx = mouse.x - x;
        const dy = mouse.y - baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseWave = mouse.active ? Math.max(0, (240 - dist) / 240) * 28 * Math.sin(dist * 0.04 - t * 4) : 0;

        const wave1 = Math.sin(c * 0.22 + t + r * 0.35) * 18;
        const wave2 = Math.cos(c * 0.11 - t * 0.8 + r * 0.2) * 12;
        const y = baseY + wave1 + wave2 + mouseWave - (scrollOffset * 0.04) % rowSpacing;

        if (c === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  // Mode 3: Recursive Quadtree & Algorithmic Grid (Inspired by 2xa.studio)
  function renderQuadtree(pal, time) {
    const t = time * 0.001;
    const rgb = pal.primary;
    const rgbAlt = pal.tertiary;

    function drawNode(x, y, w, h, depth) {
      const cx = x + w / 2;
      const cy = y + h / 2;
      const dx = mouse.x - cx;
      const dy = mouse.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const wave = Math.sin(cx * 0.005 + cy * 0.005 + t) * 0.5 + 0.5;
      const shouldSplit = depth < 4 && (dist < 280 / (depth * 0.75 + 0.5) || (depth < 2 && wave > 0.35));

      if (shouldSplit) {
        const hw = w / 2;
        const hh = h / 2;
        drawNode(x, y, hw, hh, depth + 1);
        drawNode(x + hw, y, hw, hh, depth + 1);
        drawNode(x, y + hh, hw, hh, depth + 1);
        drawNode(x + hw, y + hh, hw, hh, depth + 1);
      } else {
        const alpha = 0.035 + depth * 0.035;
        ctx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.strokeRect(x, y, w, h);

        // Corner crosshair registration tick (+)
        if (depth >= 2) {
          ctx.fillStyle = `rgba(${rgbAlt[0]}, ${rgbAlt[1]}, ${rgbAlt[2]}, ${alpha * 1.6})`;
          ctx.fillRect(x - 1.5, y - 0.5, 3, 1);
          ctx.fillRect(x - 0.5, y - 1.5, 1, 3);
        }
      }
    }

    const cols = 4;
    const rows = 3;
    const cw = width / cols;
    const ch = height / rows;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        drawNode(i * cw, j * ch, cw, ch, 1);
      }
    }
  }

  // Mode 4: ShaderGradient Procedural Aurora Mist
  function renderAurora(pal, time) {
    const t = time * 0.0005;
    const orbs = [
      {
        x: width * (0.25 + 0.18 * Math.sin(t * 1.1)),
        y: height * (0.3 + 0.15 * Math.cos(t * 0.9)),
        r: Math.max(width, height) * 0.38,
        rgb: pal.primary,
      },
      {
        x: width * (0.75 + 0.16 * Math.cos(t * 0.8)),
        y: height * (0.65 + 0.15 * Math.sin(t * 1.2)),
        r: Math.max(width, height) * 0.42,
        rgb: pal.secondary,
      },
      {
        x: mouse.active ? mouse.x : width * (0.5 + 0.2 * Math.sin(t * 0.7)),
        y: mouse.active ? mouse.y : height * (0.45 + 0.2 * Math.cos(t * 0.6)),
        r: Math.max(width, height) * 0.3,
        rgb: pal.tertiary,
      },
    ];

    orbs.forEach((orb) => {
      const grad = ctx.createRadialGradient(orb.x, orb.y, 10, orb.x, orb.y, orb.r);
      grad.addColorStop(0, `rgba(${orb.rgb[0]}, ${orb.rgb[1]}, ${orb.rgb[2]}, 0.16)`);
      grad.addColorStop(0.5, `rgba(${orb.rgb[0]}, ${orb.rgb[1]}, ${orb.rgb[2]}, 0.06)`);
      grad.addColorStop(1, `rgba(${orb.rgb[0]}, ${orb.rgb[1]}, ${orb.rgb[2]}, 0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    });

    // Subtle constellation overlay on top of aurora
    renderConstellation(pal, time);
  }

  function animate(time = 0) {
    ctx.clearRect(0, 0, width, height);

    // Smooth lerp pointer coordinates & decay stage-transition warp velocity
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;
    warpVelocity *= 0.91;
    if (Math.abs(warpVelocity) < 0.02) warpVelocity = 0;
    scrollOffset += warpVelocity * 6;

    const pal = getActivePalette();

    // Ambient cursor halo
    if (mouse.active && currentMode !== 'aurora') {
      const halo = ctx.createRadialGradient(mouse.x, mouse.y, 5, mouse.x, mouse.y, 220);
      halo.addColorStop(0, pal.glow);
      halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, width, height);
    }

    if (currentMode === 'topology') {
      renderTopology(pal, time);
    } else if (currentMode === 'quadtree') {
      renderQuadtree(pal, time);
    } else if (currentMode === 'aurora') {
      renderAurora(pal, time);
    } else {
      renderConstellation(pal, time);
    }

    requestAnimationFrame(animate);
  }

  initParticles();
  requestAnimationFrame(animate);

  // Public API for the Aesthetic Roll & Theme Switcher
  window.QuantCanvas = {
    getMode: () => currentMode,
    getModes: () => [...MODES],
    setMode: (mode) => {
      if (MODES.includes(mode)) {
        currentMode = mode;
        localStorage.setItem('qb_canvas_mode', mode);
        window.dispatchEvent(new CustomEvent('qb:canvasmode', { detail: { mode } }));
      }
    },
    cycleMode: () => {
      const nextIdx = (MODES.indexOf(currentMode) + 1) % MODES.length;
      window.QuantCanvas.setMode(MODES[nextIdx]);
      return MODES[nextIdx];
    },
    pulseWarp: (direction = 1) => {
      warpVelocity = direction * 9.5;
    },
  };
})();
