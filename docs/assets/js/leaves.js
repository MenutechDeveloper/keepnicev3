const canvas = document.getElementById('leaves-canvas');
const ctx = canvas.getContext('2d');
let leaves = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const leafImagePaths = [
  './assets/img/leaf1.png',
  './assets/img/leaf2.png',
  './assets/img/leaf3.png'
];
const loadedImages = [];
let imagesLoaded = 0;

leafImagePaths.forEach((src, i) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    loadedImages[i] = img;
    imagesLoaded++;
    if (imagesLoaded === leafImagePaths.length) {
      animate();
    }
  };
});

function Leaf() {
  this.x = Math.random() * canvas.width;
  this.y = -20;
  this.size = 30 + Math.random() * 30;
  this.speed = 0.5 + Math.random() * 1.5;
  this.angle = Math.random() * Math.PI * 2;
  this.spin = 0.01 + Math.random() * 0.02;
  this.swing = Math.random() * 2 + 1;
  this.swingSpeed = Math.random() * 0.03 + 0.01;
  this.opacity = 0.4 + Math.random() * 0.3;
  this.image = loadedImages[Math.floor(Math.random() * loadedImages.length)];
}

function drawLeaf(leaf) {
  ctx.save();
  ctx.translate(leaf.x, leaf.y);
  ctx.rotate(leaf.angle);
  ctx.globalAlpha = leaf.opacity;
  ctx.drawImage(
    leaf.image,
    -leaf.size / 2,
    -leaf.size / 2,
    leaf.size,
    leaf.size
  );
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (leaves.length < 20 && Math.random() < 0.3) {
    leaves.push(new Leaf());
  }

  leaves.forEach(leaf => {
    leaf.y += leaf.speed;
    leaf.x += Math.cos(leaf.angle) * leaf.swing;
    leaf.angle += leaf.spin;
    drawLeaf(leaf);
  });

  leaves = leaves.filter(leaf => leaf.y < canvas.height + 50);
  requestAnimationFrame(animate);
}


