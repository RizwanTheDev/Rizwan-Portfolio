class AntiGravityParticles {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 50;
    this.init();
  }

  init() {
    this.canvas.id = 'particleCanvas';
    this.canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;';
    document.body.insertBefore(this.canvas, document.body.firstChild);
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.createParticle());
    }
    
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: this.canvas.height + Math.random() * 100,
      size: Math.random() * 4 + 1,
      speedY: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      color: ['#6366f1', '#8b5cf6', '#06b6d4', '#a855f7'][Math.floor(Math.random() * 4)]
    };
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach((p, i) => {
      p.y -= p.speedY;
      p.x += p.speedX;
      
      if (p.y < -10) {
        this.particles[i] = this.createParticle();
      }
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
      this.ctx.fill();
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + '10';
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => new AntiGravityParticles());
