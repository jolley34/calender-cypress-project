window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector(".weather");
  const ctx = canvas.getContext("2d");
  const weatherSelector = document.getElementById("weatherSelector");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  let weatherType = 'snow'; 

  function createParticlesForSnow() {
    const particleCount = 300;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 0.2 + 1,
        direction: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.5,
      });
    }
  }

  function createParticlesForRain() {
    const particleCount = 1000;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1 + 0.5,
        speed: Math.random() * 5 + 1,
        direction: Math.PI / 2,
        opacity: Math.random() * 0.5 + 0.5,
      });
    }
  }

  function createParticles() {
    particles = [];
    if (weatherType === 'snow') {
      createParticlesForSnow();
    } else {
      createParticlesForRain();
    }
  }

  function updateParticleMovement() {
    particles.forEach((particle) => {
      particle.y += particle.speed;
      if (weatherType === 'snow') {
        if (particle.y > canvas.height) {
          particle.y = 0;
          particle.x = Math.random() * canvas.width;
        }
      } else { 
        particle.x += Math.sin(particle.direction);
        if (particle.y > canvas.height || particle.x > canvas.width || particle.x < 0) {
          particle.y = 0;
          particle.x = Math.random() * canvas.width;
        }
      }
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = weatherType === 'snow' ? "white" : "#89CFF0";

    particles.forEach((particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 4, Math.PI * 2);
      ctx.closePath();
      ctx.globalAlpha = particle.opacity;
      ctx.fill();
    });
  }

  function animateWeather() {
    drawParticles();
    updateParticleMovement();
    requestAnimationFrame(animateWeather);
  }

  createParticles();
  animateWeather();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
  });

  weatherSelector.addEventListener("change", (event) => {
    weatherType = event.target.value;
    createParticles();
  });
});
