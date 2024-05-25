// Confetti animation script

const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiArr = [];

class Confetti {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = (Math.random() * 2 + 1);
    this.velocityX = (Math.random() - 0.5) * 10;
    this.velocityY = (Math.random() - 0.5) * 10;
    this.color = `hsla(${Math.random() * 360}, 100%, 50%, 0.8)`;
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;

    if (this.size > 0.1) this.size -= 0.05;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function createConfetti() {
  for (let i = 0; i < 100; i++) {
    confettiArr.push(new Confetti());
  }
}

function animateConfetti() {
  requestAnimationFrame(animateConfetti);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiArr.forEach((confetti, index) => {
    confetti.update();
    confetti.draw();

    if (confetti.y >= canvas.height || confetti.size <= 0.1) {
      confettiArr.splice(index, 1);
    }
  });

  if (confettiArr.length < 100) {
    createConfetti();
  }
}

createConfetti();
animateConfetti();
