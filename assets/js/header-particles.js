class HeaderParticles {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 20;
    this.init();
  }

  init() {
    this.canvas.id = 'headerParticleCanvas';
    this.canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.4;';
    
    const header = document.querySelector('.header');
    if (header) {
      header.style.position = 'relative';
      header.insertBefore(this.canvas, header.firstChild);
    }
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.createParticle());
    }
    
    this.animate();
  }

  resize() {
    const header = document.querySelector('.header');
    if (header) {
      this.canvas.width = header.offsetWidth;
      this.canvas.height = header.offsetHeight;
    }
  }

  createParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.2,
      color: ['#6366f1', '#8b5cf6', '#a855f7'][Math.floor(Math.random() * 3)]
    };
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach((p, i) => {
      p.x += p.speedX;
      p.y += p.speedY;
      
      if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.speedY *= -1;
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
      this.ctx.fill();
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + '15';
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new HeaderParticles());
} else {
  new HeaderParticles();
}
