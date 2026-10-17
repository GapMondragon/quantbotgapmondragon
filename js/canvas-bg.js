// ============================================================================
// Quantbot Technologies — Ambient Quantitative Canvas Engine
// Modern iOS 18 & visionOS Obsidian Ambient Mesh + Subtle Quant Constellation
// ============================================================================

(function () {
  let canvas = document.getElementById('quant-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'quant-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);
  }

  const ctx = canvas.getContext('2d', { alpha: false });
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Muted Apple Institutional Ambient Gradient Nodes
  const ambientOrbs = [
    { x: 0.15, y: 0.25, r: 0.45, color: 'rgba(10, 132, 255, 0.07)', vx: 0.00015, vy: 0.00012, phase: 0 },
    { x: 0.85, y: 0.35, r: 0.50, color: 'rgba(48, 209, 88, 0.06)', vx: -0.00018, vy: 0.00014, phase: 2 },
    { x: 0.50, y: 0.80, r: 0.55, color: 'rgba(94, 92, 230, 0.07)', vx: 0.00012, vy: -0.00016, phase: 4 },
    { x: 0.30, y: 0.65, r: 0.40, color: 'rgba(10, 132, 255, 0.05)', vx: -0.00014, vy: -0.00011, phase: 1 }
  ];

  // Algorithmic Constellation Particles
  const particles = [];
  const particleCount = Math.min(42, Math.max(18, Math.floor(window.innerWidth / 40)));
  const maxDistance = 150;

  let mouse = {
    x: width / 2,
    y: height / 2,
    active: false,
    radius: 160,
  };

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.28;
      this.vy = (Math.random() - 0.5) * 0.28;
      this.size = Math.random() * 1.6 + 0.7;
      this.alpha = Math.random() * 0.25 + 0.12;
      this.pulse = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += 0.02;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 1) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 0.9;
          this.y -= (dy / dist) * force * 0.9;
        }
      }
    }
    draw() {
      const currentAlpha = this.alpha * (0.8 + 0.2 * Math.sin(this.pulse));
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(48, 209, 88, ${currentAlpha})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  let time = 0;

  function render() {
    time += 0.005;

    // 1. Deep Obsidian / Midnight Base Fill (#050507 -> #0A0B0E)
    const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
    baseGrad.addColorStop(0, '#050507');
    baseGrad.addColorStop(1, '#0A0B0E');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Slow-Moving Radial Mesh Gradients (Cobalt, Quant Emerald, Cyber Indigo)
    ambientOrbs.forEach((orb) => {
      const ox = (orb.x + Math.sin(time + orb.phase) * 0.06) * width;
      const oy = (orb.y + Math.cos(time + orb.phase * 0.8) * 0.06) * height;
      const radius = orb.r * Math.max(width, height);

      const radGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, radius);
      radGrad.addColorStop(0, orb.color);
      radGrad.addColorStop(0.5, orb.color.replace(/[\d\.]+\)$/, '0.02)'));
      radGrad.addColorStop(1, 'rgba(5, 5, 7, 0)');

      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);
    });

    // 3. Algorithmic Constellation Network
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const opacity = (1 - dist / maxDistance) * 0.14;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(48, 209, 88, ${opacity})`;
          ctx.lineWidth = 0.65;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener('mouseout', () => {
    mouse.active = false;
  });

  initParticles();
  requestAnimationFrame(render);
})();
