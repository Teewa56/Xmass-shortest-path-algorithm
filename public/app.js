const canvas = document.getElementById('pathCanvas');
const ctx = canvas.getContext('2d');
const generateBtn = document.getElementById('generateBtn');
const findPathBtn = document.getElementById('findPathBtn');
const resetBtn = document.getElementById('resetBtn');
const houseCountEl = document.getElementById('houseCount');
const totalDistanceEl = document.getElementById('totalDistance');

const pathFinder = new ShortestPathFinder();
let houses = [];
let animationId = null;

function generateHouses(count = 8) {
  houses = [];
  const padding = 50;
  const width = canvas.width - padding * 2;
  const height = canvas.height - padding * 2;

  houses.push({
    x: canvas.width / 2,
    y: padding,
    name: "Santa's Start",
    isSanta: true
  });

  for (let i = 0; i < count; i++) {
    houses.push({
      x: padding + Math.random() * width,
      y: padding + Math.random() * height,
      name: `House ${i + 1}`,
      isSanta: false
    });
  }

  pathFinder.setHouses(houses);
  houseCountEl.textContent = houses.length;
  totalDistanceEl.textContent = '-';
  drawMap();
}

function drawMap() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#e8dcc4';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    ctx.arc(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      2 + Math.random() * 3,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = '#c4b896';
    ctx.fill();
  }

  houses.forEach(house => {
    if (house.isSanta) {
      drawSanta(house.x, house.y);
    } else {
      drawHouse(house.x, house.y);
    }
  });
}

function drawHouse(x, y) {
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(x - 10, y - 5, 20, 15);
  
  ctx.beginPath();
  ctx.moveTo(x - 15, y - 5);
  ctx.lineTo(x, y - 20);
  ctx.lineTo(x + 15, y - 5);
  ctx.closePath();
  ctx.fillStyle = '#cc0000';
  ctx.fill();
  
  ctx.fillStyle = '#FFD700';
  ctx.fillRect(x - 3, y, 6, 10);
}

function drawSanta(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 15, 0, Math.PI * 2);
  ctx.fillStyle = '#ff0000';
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 3;
  ctx.stroke();
  
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('S', x, y);
}

function drawPath(path) {
  if (path.length < 2) return;

  ctx.beginPath();
  ctx.moveTo(path[0].x, path[0].y);
  
  for (let i = 1; i < path.length; i++) {
    ctx.lineTo(path[i].x, path[i].y);
  }
  
  ctx.strokeStyle = '#ff6b6b';
  ctx.lineWidth = 3;
  ctx.setLineDash([5, 5]);
  ctx.stroke();
  ctx.setLineDash([]);

  for (let i = 1; i < path.length - 1; i++) {
    ctx.beginPath();
    ctx.arc(path[i].x, path[i].y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd700';
    ctx.fill();
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.fillStyle = '#333';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(i.toString(), path[i].x, path[i].y + 20);
  }
}

function animatePath() {
  const path = pathFinder.getPath();
  if (path.length < 2) return;

  let step = 0;
  const animationSpeed = 100;

  function animate() {
    drawMap();
    
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    
    for (let i = 1; i <= step && i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }
    
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);

    for (let i = 1; i <= step && i < path.length - 1; i++) {
      ctx.beginPath();
      ctx.arc(path[i].x, path[i].y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffd700';
      ctx.fill();
      
      ctx.fillStyle = '#333';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(i.toString(), path[i].x, path[i].y + 20);
    }

    step++;
    if (step < path.length) {
      animationId = setTimeout(animate, animationSpeed);
    }
  }

  animate();
}

generateBtn.addEventListener('click', () => {
  if (animationId) {
    clearTimeout(animationId);
    animationId = null;
  }
  generateHouses(5 + Math.floor(Math.random() * 6));
});

findPathBtn.addEventListener('click', () => {
  if (animationId) {
    clearTimeout(animationId);
    animationId = null;
  }
  
  pathFinder.findShortestPath();
  totalDistanceEl.textContent = pathFinder.getTotalDistance() + ' units';
  animatePath();
});

resetBtn.addEventListener('click', () => {
  if (animationId) {
    clearTimeout(animationId);
    animationId = null;
  }
  houses = [];
  pathFinder.setHouses([]);
  houseCountEl.textContent = '0';
  totalDistanceEl.textContent = '-';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#e8dcc4';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

generateHouses(8);
