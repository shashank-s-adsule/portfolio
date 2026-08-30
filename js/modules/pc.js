// PC Display Module
// Manages the content shown on the monitor screen

export class PCDisplay {
  constructor() {
    this.screenCanvas = null;
    this.screenContext = null;
    this.screenTexture = null;
    this.displayContent = 'welcome';
    this.init();
  }

  init() {
    // Create an off-screen canvas for the monitor screen texture
    this.screenCanvas = document.createElement('canvas');
    this.screenCanvas.width = 1920;
    this.screenCanvas.height = 1080;
    this.screenContext = this.screenCanvas.getContext('2d');
    this.drawWelcomeScreen();
  }

  drawWelcomeScreen() {
    const ctx = this.screenContext;
    const w = this.screenCanvas.width;
    const h = this.screenCanvas.height;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Title
    ctx.fillStyle = '#00d4ff';
    ctx.font = 'bold 120px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Welcome', w / 2, 250);

    // Subtitle
    ctx.fillStyle = '#fff';
    ctx.font = '60px Arial';
    ctx.fillText('Interactive 3D Portfolio', w / 2, 400);

    // Footer text
    ctx.fillStyle = '#888';
    ctx.font = '40px Arial';
    ctx.fillText('Rotate the monitor to explore', w / 2, h - 100);
  }

  drawKeyboardDisplay(text) {
    const ctx = this.screenContext;
    const w = this.screenCanvas.width;
    const h = this.screenCanvas.height;

    // Clear with dark background
    ctx.fillStyle = '#0f0f0f';
    ctx.fillRect(0, 0, w, h);

    // Terminal-style display
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 50, w - 100, h - 100);

    ctx.fillStyle = '#00ff00';
    ctx.font = 'bold 60px "Courier New"';
    ctx.fillText('$ ' + text, 150, 300);

    ctx.font = '40px "Courier New"';
    ctx.fillText('> Ready for input...', 150, 500);
  }

  drawMouseActivity(x, y) {
    const ctx = this.screenContext;
    const w = this.screenCanvas.width;
    const h = this.screenCanvas.height;

    // Background
    ctx.fillStyle = '#2a2a3e';
    ctx.fillRect(0, 0, w, h);

    // Title
    ctx.fillStyle = '#ff6b6b';
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Mouse Activity', w / 2, 150);

    // Draw crosshair at cursor position
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = 3;
    const scaledX = (x / window.innerWidth) * w;
    const scaledY = (y / window.innerHeight) * h;

    // Crosshair
    ctx.beginPath();
    ctx.moveTo(scaledX - 100, scaledY);
    ctx.lineTo(scaledX + 100, scaledY);
    ctx.moveTo(scaledX, scaledY - 100);
    ctx.lineTo(scaledX, scaledY + 100);
    ctx.stroke();

    // Circle around crosshair
    ctx.beginPath();
    ctx.arc(scaledX, scaledY, 80, 0, Math.PI * 2);
    ctx.stroke();

    // Info text
    ctx.fillStyle = '#fff';
    ctx.font = '40px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`X: ${x.toFixed(0)}`, w / 2 - 400, h - 150);
    ctx.fillText(`Y: ${y.toFixed(0)}`, w / 2 - 400, h - 80);
  }

  updateDisplay(type, data) {
    this.displayContent = type;
    switch (type) {
      case 'welcome':
        this.drawWelcomeScreen();
        break;
      case 'keyboard':
        this.drawKeyboardDisplay(data);
        break;
      case 'mouse':
        this.drawMouseActivity(data.x, data.y);
        break;
    }
  }

  getTexture() {
    if (!this.screenTexture) {
      this.screenTexture = new THREE.CanvasTexture(this.screenCanvas);
    } else {
      this.screenTexture.needsUpdate = true;
    }
    return this.screenTexture;
  }
}

export default PCDisplay;
