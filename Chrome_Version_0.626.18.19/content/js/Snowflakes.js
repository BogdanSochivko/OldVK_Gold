const snowflakesCount = 100;
const snowflakes = [];

function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.textContent = '❄️';
  snowflake.style.left = `${Math.random() * window.innerWidth}px`;
  snowflake.style.animationDuration = `${2 + Math.random() * 3}s`;
  snowflake.style.fontSize = `${10 + Math.random() * 20}px`;
  snowflake.style.opacity = Math.random().toString();
  snowflake.style.top = `${-20}px`;
  snowflake.dataset.speed = 2 + Math.random() * 3;
  document.body.appendChild(snowflake);
  snowflakes.push(snowflake);
}

function updateSnowflakes() {
  snowflakes.forEach(snowflake => {
    const speed = parseFloat(snowflake.dataset.speed);
    let top = parseFloat(snowflake.style.top);
    top += speed;
    if (top > window.innerHeight) {
      top = -20;
      snowflake.style.left = `${Math.random() * window.innerWidth}px`;
    }
    snowflake.style.top = `${top}px`;
  });
  requestAnimationFrame(updateSnowflakes);
}

function startSnowfall() {
  for (let i = 0; i < snowflakesCount; i++) {
    createSnowflake();
  }
  requestAnimationFrame(updateSnowflakes);
}

window.addEventListener('resize', () => {
  snowflakes.forEach(snowflake => {
    snowflake.style.left = `${Math.random() * window.innerWidth}px`;
  });
});

document.addEventListener('DOMContentLoaded', startSnowfall);
