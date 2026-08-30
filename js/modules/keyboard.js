// Keyboard Module
// Handles keyboard input and updates display

export class KeyboardInput {
  constructor(pcDisplay) {
    this.pcDisplay = pcDisplay;
    this.inputBuffer = '';
    this.maxInputLength = 30;
    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));
  }

  handleKeyPress(event) {
    const key = event.key;

    if (key === 'Backspace') {
      this.inputBuffer = this.inputBuffer.slice(0, -1);
    } else if (key === 'Enter') {
      this.executeCommand();
      return;
    } else if (key === 'Escape') {
      this.inputBuffer = '';
    } else if (key.length === 1) {
      if (this.inputBuffer.length < this.maxInputLength) {
        this.inputBuffer += key;
      }
    }

    // Update display with current input
    this.pcDisplay.updateDisplay('keyboard', this.inputBuffer);
  }

  executeCommand() {
    const command = this.inputBuffer.trim().toLowerCase();
    console.log('Command executed:', command);

    // Handle specific commands
    if (command.includes('help')) {
      this.showHelp();
    } else if (command.includes('clear')) {
      this.inputBuffer = '';
    } else if (command.includes('tech')) {
      this.showTechStack();
    } else if (command.includes('about')) {
      this.showAbout();
    }

    this.inputBuffer = '';
  }

  showHelp() {
    console.log('Available commands: help, clear, tech, about, projects');
  }

  showTechStack() {
    console.log('Tech Stack: Python, C++, JavaScript, PyTorch, OpenCV, Docker');
  }

  showAbout() {
    console.log('Shashank Adsule - M.Tech Data Science & AI at IIT Madras');
  }
}

export default KeyboardInput;
