// ===== PARTICLES =====
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.6;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.3;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.beginPath();

    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size * 5
    );

    gradient.addColorStop(0, `rgba(200,170,255,${this.opacity})`);
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 160; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});


// ===== MENU =====
const burger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  menu.classList.toggle("active");
});

// close when clicking outside
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !burger.contains(e.target)) {
    menu.classList.remove("active");
    burger.classList.remove("active");
  }
});

// ===== MAGNETIC CREATURES =====
const solrael = document.querySelector(".hero-character");
const discordCreature = document.querySelector(".discord-creature");

const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function setupMagnet(el, options = {}) {
  if (!el) return;

  const {
    distance = 220,
    strength = 0.18,
    maxOffset = 40,
    scaleHover = 1.06,
    rotationStrength = 0.06,
    floating = false,
    floatAmount = 12,
    floatSpeed = 0.0025,
  } = options;

  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let currentScale = 1;
  let targetScale = 1;
  let currentRotate = 0;
  let targetRotate = 0;

  function animate(time) {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = mouse.x - cx;
    const dy = mouse.y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < distance) {
      const pull = 1 - dist / distance;

      targetX = Math.max(-maxOffset, Math.min(maxOffset, dx * strength * pull));
      targetY = Math.max(-maxOffset, Math.min(maxOffset, dy * strength * pull));
      targetScale = scaleHover;
      targetRotate = Math.max(-8, Math.min(8, dx * rotationStrength * pull));
    } else {
      targetX = 0;
      targetY = 0;
      targetScale = 1;
      targetRotate = 0;
    }

    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    currentScale += (targetScale - currentScale) * 0.08;
    currentRotate += (targetRotate - currentRotate) * 0.08;

    let floatY = 0;
    if (floating) {
      floatY = Math.sin(time * floatSpeed) * floatAmount;
    }

    el.style.transform = `
      translate(${currentX}px, ${currentY + floatY}px)
      scale(${currentScale})
      rotate(${currentRotate}deg)
    `;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// Solrael: stronger, slower, more magical
setupMagnet(solrael, {
  distance: 320,
  strength: 0.16,
  maxOffset: 55,
  scaleHover: 1.05,
  rotationStrength: 0.035,
  floating: true,
  floatAmount: 10,
  floatSpeed: 0.002,
});

// ===== INFO PANEL =====
const infoToggle = document.getElementById("infoToggle");
const infoPanel = document.getElementById("infoPanel");
const infoClose = document.getElementById("infoClose");

if (infoToggle && infoPanel && infoClose) {
  infoToggle.addEventListener("click", () => {
    infoPanel.classList.add("active");
  });

  infoClose.addEventListener("click", () => {
    infoPanel.classList.remove("active");
  });

  document.addEventListener("click", (e) => {
    const clickedInsidePanel = infoPanel.contains(e.target);
    const clickedToggle = infoToggle.contains(e.target);

    if (!clickedInsidePanel && !clickedToggle) {
      infoPanel.classList.remove("active");
    }
  });
}

// Discord creature: smaller, cuter, snappier
setupMagnet(discordCreature, {
  distance: 220,
  strength: 0.2,
  maxOffset: 28,
  scaleHover: 1.08,
  rotationStrength: 0.05,
  floating: false,
});