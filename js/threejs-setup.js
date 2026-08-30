import PCDisplay from './modules/pc.js';
import KeyboardInput from './modules/keyboard.js';
import MouseTracker from './modules/mouse.js';

class MonitorScene {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.monitor = null;
    this.pcDisplay = null;
    this.keyboard = null;
    this.mouse = null;
    this.animationId = null;
    this.rotationSpeed = 0.005; // Slow rotation speed
    this.init();
  }

  init() {
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupLighting();
    this.loadModel();
    this.setupModules();
    this.handleWindowResize();
    this.animate();

    window.addEventListener('resize', () => this.handleWindowResize());
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf5f5f5);
  }

  setupCamera() {
    const canvas = document.getElementById('three-canvas');
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    this.camera.position.set(0, 0.5, 2);
    this.camera.lookAt(0, 0, 0);
  }

  setupRenderer() {
    const canvas = document.getElementById('three-canvas');
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
  }

  setupLighting() {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    // Directional light for shadows and depth
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);

    // Point light for additional detail
    const pointLight = new THREE.PointLight(0xffffff, 0.4);
    pointLight.position.set(-5, 3, 3);
    this.scene.add(pointLight);
  }

  loadModel() {
    const loader = new THREE.GLTFLoader();
    const infoText = document.getElementById('display-info');

    loader.load(
      './assets/3d models/monitor.glb',
      (gltf) => {
        this.monitor = gltf.scene;

        // Fixed position - no movement
        this.monitor.position.set(0, 0, 0);

        // Disable scaling
        this.monitor.scale.set(1, 1, 1);

        // Reset rotation
        this.monitor.rotation.set(0, 0, 0);

        // Ensure no user interaction moves the model
        this.monitor.userData.locked = true;

        this.scene.add(this.monitor);

        // Update info text
        infoText.textContent = 'Monitor loaded - Try keyboard input or move your mouse!';

        // Update texture once model is loaded
        this.updateMonitorScreen();
      },
      (progress) => {
        const loaded = progress.loaded;
        const total = progress.total;
        const percentage = ((loaded / total) * 100).toFixed(0);
        infoText.textContent = `Loading... ${percentage}%`;
      },
      (error) => {
        console.error('Error loading model:', error);
        infoText.textContent = 'Error loading 3D model. Check console.';
      }
    );
  }

  setupModules() {
    // Initialize PC Display
    this.pcDisplay = new PCDisplay();

    // Initialize Keyboard Input
    this.keyboard = new KeyboardInput(this.pcDisplay);

    // Initialize Mouse Tracker
    this.mouse = new MouseTracker(this.pcDisplay);
  }

  updateMonitorScreen() {
    if (!this.monitor || !this.pcDisplay) return;

    // Apply texture to all materials on the model
    this.monitor.traverse((child) => {
      if (child.isMesh && child.material) {
        // Apply canvas texture to all materials
        child.material.map = this.pcDisplay.getTexture();
        child.material.needsUpdate = true;
      }
    });
  }

  animate = () => {
    this.animationId = requestAnimationFrame(this.animate);

    if (this.monitor) {
      // Rotate ONLY on Y-axis (vertical axis)
      // Keep X and Z rotation at 0 (fixed)
      this.monitor.rotation.y += this.rotationSpeed;
      this.monitor.rotation.x = 0; // Locked
      this.monitor.rotation.z = 0; // Locked

      // Ensure scale never changes
      this.monitor.scale.set(1, 1, 1);
    }

    // Update screen texture every frame
    if (this.pcDisplay && this.monitor) {
      const texture = this.pcDisplay.getTexture();
      this.monitor.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      });
    }

    this.renderer.render(this.scene, this.camera);
  };

  handleWindowResize() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (this.camera) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }

    if (this.renderer) {
      this.renderer.setSize(width, height);
    }
  }

  // Public methods to control rotation speed
  setRotationSpeed(speed) {
    this.rotationSpeed = speed;
  }

  getRotationSpeed() {
    return this.rotationSpeed;
  }

  // Stop rotation
  stopRotation() {
    this.rotationSpeed = 0;
  }

  // Resume rotation
  resumeRotation(speed = 0.005) {
    this.rotationSpeed = speed;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MonitorScene();
});

// Also initialize if document is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new MonitorScene();
  });
} else {
  new MonitorScene();
}
