// Mouse Module
// Handles mouse movement tracking and cursor visualization

export class MouseTracker {
  constructor(pcDisplay) {
    this.pcDisplay = pcDisplay;
    this.mouseX = 0;
    this.mouseY = 0;
    this.isActive = false;
    this.inactivityTimeout = null;
    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    document.addEventListener('mouseenter', () => this.handleMouseEnter());
    document.addEventListener('mouseleave', () => this.handleMouseLeave());
  }

  handleMouseMove(event) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.isActive = true;

    // Update display
    this.pcDisplay.updateDisplay('mouse', {
      x: this.mouseX,
      y: this.mouseY
    });

    // Clear previous timeout
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
    }

    // Set timeout to return to welcome screen after inactivity
    this.inactivityTimeout = setTimeout(() => {
      this.isActive = false;
      this.pcDisplay.updateDisplay('welcome', null);
    }, 5000);
  }

  handleMouseEnter() {
    this.isActive = true;
  }

  handleMouseLeave() {
    this.isActive = false;
    this.pcDisplay.updateDisplay('welcome', null);
  }

  getPosition() {
    return {
      x: this.mouseX,
      y: this.mouseY,
      active: this.isActive
    };
  }
}

export default MouseTracker;
