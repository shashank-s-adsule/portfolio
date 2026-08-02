# 🎮 Full Integration Guide - 90s PC Website

## Overview
This guide shows how to integrate all components:
- Three.js 3D scene with PC model
- Boot sequence animation
- Windows 95 desktop interface
- Interactive input handling (clicking 3D objects, keyboard)
- Real-time texture rendering

---

## Project Structure

```
interactive-90s-pc/
├── index.html (MAIN FILE)
├── css/
│   ├── style.css
│   └── windows-ui.css
├── js/
│   ├── main.js (initialization)
│   ├── scene-manager.js (Three.js setup)
│   ├── computer-controller.js (PC state & interactions)
│   ├── boot-sequence.js (startup animation)
│   ├── os-interface.js (Windows UI)
│   └── input-handler.js (mouse/keyboard)
├── models/
│   └── computer.glb
└── audio/
    ├── startup.mp3
    ├── click.mp3
    └── ambient.mp3
```

---

## Step 1: Main HTML File Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive 90s PC</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/windows-ui.css">
</head>
<body>
    <!-- 3D Canvas -->
    <div id="canvas-container"></div>

    <!-- Boot Screen Overlay -->
    <div id="boot-overlay"></div>

    <!-- Windows & Desktop UI -->
    <div id="desktop-container"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@r128/examples/js/loaders/GLTFLoader.js"></script>
    <script type="module" src="js/main.js"></script>
</body>
</html>
```

---

## Step 2: Scene Manager (Three.js Setup)

**File: `js/scene-manager.js`**

```javascript
export class SceneManager {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.computerModel = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.init();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a2e);
        this.scene.fog = new THREE.Fog(0x1a1a2e, 100, 1000);

        // Camera
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
        this.camera.position.set(3, 2.5, 4);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);

        // Lighting
        this.setupLighting();

        // Environment
        this.createFloor();

        // Load computer model
        this.loadComputerModel();

        // Input handlers
        this.setupInputHandlers();

        // Animation loop
        this.animate();

        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    setupLighting() {
        // Ambient
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Directional
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 8, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Point light
        const pointLight = new THREE.PointLight(0xffa500, 0.5);
        pointLight.position.set(2, 3, -2);
        this.scene.add(pointLight);
    }

    createFloor() {
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0x4a4a4a,
            roughness: 0.8
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
    }

    loadComputerModel() {
        const loader = new THREE.GLTFLoader();
        loader.load('models/computer.glb', (gltf) => {
            this.computerModel = gltf.scene;
            this.computerModel.scale.set(2, 2, 2);
            this.computerModel.position.y = 0;

            // Enable shadows
            this.computerModel.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                    // Store original material for later use
                    node.userData.originalMaterial = node.material;
                }
            });

            this.scene.add(this.computerModel);
            window.dispatchEvent(new CustomEvent('modelLoaded'));
        });
    }

    setupInputHandlers() {
        // Click detection (raycasting)
        window.addEventListener('click', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera);
            const intersects = this.raycaster.intersectObjects(
                this.computerModel.children,
                true
            );

            if (intersects.length > 0) {
                const clickedObject = intersects[0].object;
                const objectName = clickedObject.parent.userData.name || 
                                  clickedObject.userData.name;
                
                window.dispatchEvent(new CustomEvent('computerClicked', {
                    detail: { object: objectName }
                }));
            }
        });

        // Mouse move for highlighting
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera);
            const intersects = this.raycaster.intersectObjects(
                this.computerModel.children,
                true
            );

            if (intersects.length > 0) {
                document.body.style.cursor = 'pointer';
            } else {
                document.body.style.cursor = 'default';
            }
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    // Method to update monitor texture with desktop UI
    updateMonitorTexture(canvas) {
        if (!this.computerModel) return;

        const texture = new THREE.CanvasTexture(canvas);
        this.computerModel.traverse((node) => {
            if (node.isMesh && node.userData.name === 'Monitor') {
                node.material.map = texture;
                node.material.needsUpdate = true;
            }
        });
    }
}
```

---

## Step 3: Computer Controller

**File: `js/computer-controller.js`**

```javascript
export class ComputerController {
    constructor() {
        this.state = 'off';  // off, booting, idle, running
        this.isBootingUp = false;
        this.monitorCanvas = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('computerClicked', (e) => {
            const object = e.detail.object;
            
            if (object === 'PowerButton') {
                this.togglePower();
            } else if (object === 'Monitor') {
                this.clickMonitor(e);
            } else if (object === 'Keyboard') {
                this.clickKeyboard(e);
            }
        });

        window.addEventListener('bootComplete', () => {
            this.state = 'idle';
            console.log('💻 Computer booted successfully');
        });
    }

    togglePower() {
        if (this.state === 'off') {
            this.powerOn();
        } else if (this.state === 'idle') {
            this.powerOff();
        }
    }

    async powerOn() {
        console.log('🔌 Powering on...');
        this.state = 'booting';
        this.isBootingUp = true;

        // Show boot sequence
        const bootOverlay = document.getElementById('boot-overlay');
        bootOverlay.style.display = 'flex';

        // Simulate boot
        await new Promise(resolve => {
            window.addEventListener('bootComplete', resolve, { once: true });
        });

        this.state = 'idle';
    }

    powerOff() {
        console.log('🔌 Powering off...');
        this.state = 'off';
        
        // Hide desktop
        document.getElementById('desktop-container').innerHTML = '';
        
        // Reset monitor display
        if (this.monitorCanvas) {
            const ctx = this.monitorCanvas.getContext('2d');
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, this.monitorCanvas.width, this.monitorCanvas.height);
        }
    }

    clickMonitor(event) {
        if (this.state !== 'idle') return;
        
        // Convert 3D click to 2D desktop coordinate
        const intersectionPoint = event.detail.point;
        const desktopEvent = new MouseEvent('click', {
            clientX: intersectionPoint.x,
            clientY: intersectionPoint.y
        });
        
        // Dispatch to desktop system
        window.dispatchEvent(new CustomEvent('desktopClicked', {
            detail: event.detail
        }));
    }

    clickKeyboard(event) {
        if (this.state !== 'idle') return;
        console.log('⌨️ Keyboard clicked');
        // Trigger keyboard input handler
    }

    setMonitorCanvas(canvas) {
        this.monitorCanvas = canvas;
    }
}
```

---

## Step 4: Input Handler

**File: `js/input-handler.js`**

```javascript
export class InputHandler {
    constructor() {
        this.keys = {};
        this.setupListeners();
    }

    setupListeners() {
        // Keyboard
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toUpperCase()] = true;
            this.handleKeyPress(e);
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toUpperCase()] = false;
        });

        // Mouse wheel for scrolling
        window.addEventListener('wheel', (e) => {
            if (e.target.classList.contains('window-content')) {
                // Allow normal scrolling in windows
                return;
            }
        });
    }

    handleKeyPress(event) {
        const key = event.key.toUpperCase();

        // Alt+F4 to close window
        if (event.altKey && key === 'F4') {
            event.preventDefault();
            const activeWindow = document.querySelector('.window.active');
            if (activeWindow) {
                activeWindow.remove();
            }
        }

        // Enter in text input
        if (key === 'ENTER') {
            window.dispatchEvent(new CustomEvent('keyPressed', {
                detail: { key: 'ENTER' }
            }));
        }

        // Dispatch key event
        window.dispatchEvent(new CustomEvent('keyPressed', {
            detail: { key }
        }));
    }

    isKeyPressed(key) {
        return this.keys[key.toUpperCase()] || false;
    }
}
```

---

## Step 5: Main Application File

**File: `js/main.js`**

```javascript
import { SceneManager } from './scene-manager.js';
import { ComputerController } from './computer-controller.js';
import { InputHandler } from './input-handler.js';

class Application {
    constructor() {
        this.sceneManager = null;
        this.computerController = null;
        this.inputHandler = null;
        this.init();
    }

    init() {
        // Initialize systems
        const canvasContainer = document.getElementById('canvas-container');
        this.sceneManager = new SceneManager(canvasContainer);
        this.computerController = new ComputerController();
        this.inputHandler = new InputHandler();

        // Setup boot sequence overlay (will be populated by boot-sequence.js)
        this.setupBootOverlay();

        // Listen for model loaded
        window.addEventListener('modelLoaded', () => {
            console.log('✅ 3D model loaded');
        });
    }

    setupBootOverlay() {
        const overlay = document.getElementById('boot-overlay');
        overlay.innerHTML = `<div id="boot-screen" style="display: none;"></div>`;
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.zIndex = '1000';
        overlay.style.display = 'none';
        overlay.style.flexDirection = 'column';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    new Application();
});
```

---

## Step 6: Key Features Implementation

### Monitor Texture Rendering

```javascript
// In SceneManager - Render desktop to texture
createMonitorTexture(desktopUI) {
    const canvas = new OffscreenCanvas(1024, 768);
    const ctx = canvas.getContext('2d');

    // Render desktop UI to canvas
    ctx.fillStyle = 'teal';
    ctx.fillRect(0, 0, 1024, 768);

    // Convert to texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    
    // Apply to monitor mesh
    this.computerModel.traverse((node) => {
        if (node.userData.name === 'MonitorScreen') {
            node.material.map = texture;
            node.material.emissiveMap = texture;
            node.material.emissive = new THREE.Color(0x333333);
            node.material.emissiveIntensity = 0.3;
        }
    });

    return canvas;
}
```

### Power Button Interaction

```javascript
// Raycasting for power button
detectPowerButton() {
    const powerButton = this.computerModel.getObjectByName('PowerButton');
    if (!powerButton) {
        console.warn('Power button not found in model');
        return;
    }

    powerButton.userData.clickable = true;
    powerButton.material.color.set(0xff0000);  // Highlight
}
```

### CRT Monitor Effects

```javascript
// Add scanlines and glow to monitor
addCRTEffects(monitorMesh) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Create scanlines
    for (let y = 0; y < 512; y += 2) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.fillRect(0, y, 512, 1);
    }

    const scanlineTexture = new THREE.CanvasTexture(canvas);
    monitorMesh.material.map = scanlineTexture;
}
```

---

## Step 7: Keyboard Input Mapping

```javascript
// Map keyboard to on-screen keyboard
handleKeyboardInput(key) {
    const keyMap = {
        'A': 'key-a', 'B': 'key-b', // ... etc
    };

    const targetKey = document.getElementById(keyMap[key]);
    if (targetKey) {
        targetKey.classList.add('pressed');
        setTimeout(() => {
            targetKey.classList.remove('pressed');
        }, 100);
    }
}
```

---

## Step 8: Desktop Window Management

```javascript
class DesktopManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.windows = [];
        this.zIndex = 100;
    }

    createWindow(title, content, width = 300, height = 200) {
        const window = {
            id: `window-${Date.now()}`,
            title,
            content,
            width,
            height,
            x: 100 + Math.random() * 100,
            y: 100 + Math.random() * 100,
            zIndex: this.zIndex++,
            visible: true
        };

        this.windows.push(window);
        this.render();
        return window;
    }

    render() {
        const ctx = this.canvas.getContext('2d');
        
        // Render each window
        this.windows.forEach(w => {
            if (w.visible) {
                this.renderWindow(ctx, w);
            }
        });
    }

    renderWindow(ctx, window) {
        // Draw window frame (beveled 95 style)
        ctx.fillStyle = '#c0c0c0';
        ctx.fillRect(window.x, window.y, window.width, window.height);

        // Draw title bar
        ctx.fillStyle = '#000080';
        ctx.fillRect(window.x, window.y, window.width, 19);

        // Draw title text
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.fillText(window.title, window.x + 5, window.y + 14);

        // Draw content
        ctx.fillStyle = '#c0c0c0';
        ctx.fillRect(window.x + 2, window.y + 21, window.width - 4, window.height - 23);
    }
}
```

---

## Performance Optimization Tips

1. **LOD (Level of Detail)**: Use different model detail levels based on distance
2. **Instancing**: Reuse geometries for repeated elements
3. **Texture atlasing**: Combine textures into single atlas
4. **Baking**: Pre-bake lighting into textures
5. **Lazy loading**: Load assets on demand

---

## Testing Checklist

- [ ] 3D model loads without errors
- [ ] Boot sequence plays on power toggle
- [ ] Desktop UI renders on monitor texture
- [ ] Mouse clicks detected on 3D objects
- [ ] Keyboard input works
- [ ] Windows can be dragged and closed
- [ ] Performance smooth at 60 FPS
- [ ] Sound effects play
- [ ] Responsive on resize

---

## Debugging

```javascript
// Enable debug mode
window.DEBUG = true;

// Log all events
window.addEventListener('computerClicked', (e) => {
    if (window.DEBUG) console.log('Clicked:', e.detail);
});
```

---

## Next Steps

1. Create the 3D model in Blender
2. Test individual components (Three.js, boot, UI)
3. Integrate components together
4. Add content (portfolio, games, etc.)
5. Optimize for performance
6. Deploy!

---
