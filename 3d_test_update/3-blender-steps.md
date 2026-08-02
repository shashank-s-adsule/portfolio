# 🖥️ Creating a 90s PC in Blender - Complete Guide

## Overview
This guide walks you through creating a low-poly 3D model of a 1990s desktop computer in Blender, optimized for web export (glTF/GLB format).

**Total Time:** ~2-3 hours  
**Difficulty:** Beginner to Intermediate  
**Required Tools:** Blender 3.0+ (free), exporting plugin (built-in)

---

## Part 1: CRT Monitor

### Step 1.1 - Monitor Base Shape

1. **Start fresh**: Create a new Blender project
2. **Add a cube**: Shift+A → Mesh → Cube
3. **Scale monitor body**:
   - Press `S` (scale), then `Shift+Z` (lock Z-axis)
   - Scale on X: Press `S`, `X`, type `2.5`, Enter
   - Scale on Y: Press `S`, `Y`, type `2`, Enter
   - Position: Press `G`, `Z`, type `1.2`, Enter (move up)

### Step 1.2 - Monitor Screen

1. **Add a plane for the screen**:
   - Shift+A → Mesh → Plane
   - Scale it: `S`, `X`, `2.3`, Enter, then `S`, `Y`, `1.8`, Enter
   - Position in front: `G`, `Z`, `-0.04`, Enter

2. **Create screen depth** (inset):
   - Tab into Edit Mode
   - Press `I` (inset), drag to create rim thickness (~0.02)
   - Extrude slightly: `E`, `Z`, `-0.02`, Enter
   - Tab back to Object Mode

### Step 1.3 - Monitor Bezel

1. **Add cylinder for bezel**:
   - Shift+A → Mesh → Cylinder
   - Scale: `S`, type `0.3`, Enter (make it smaller)
   - Rotate: `R`, `X`, `90`, Enter
   - Position it at monitor corner (repeat 4 times with Shift+D to duplicate)

### Step 1.4 - Monitor Stand

1. **Add cube for stand**:
   - Shift+A → Mesh → Cube
   - Scale: `S`, type `0.3`, Enter globally, but then:
     - `S`, `Y`, `0.8`, Enter (taller)
   - Position below monitor: `G`, `Z`, `-0.5`, Enter

2. **Optional**: Add a base plate
   - Duplicate the stand: Shift+D
   - Scale: `S`, `X`, `1.5`, Enter, `S`, `Y`, `1.5`, Enter
   - Move down: `G`, `Z`, `-0.3`, Enter

---

## Part 2: Computer Tower / CPU Box

### Step 2.1 - Tower Body

1. **Add cube for tower**:
   - Shift+A → Mesh → Cube
   - Scale proportions:
     - `S`, `X`, `0.5`, Enter (narrow)
     - `S`, `Z`, `1.5`, Enter (tall)
     - `S`, `Y`, `1.2`, Enter (moderate depth)
   - Position: `G`, `X`, `-1.5`, Enter (to the right of monitor)

### Step 2.2 - Tower Details

1. **Add bevel** for realistic edges:
   - Select tower cube
   - Modifier → Add Modifier → Bevel
   - Set to `0.05` (small bevel)

2. **Add rectangular details** (power button area, drive bays):
   - Add small cubes: Shift+A → Mesh → Cube
   - Scale them: `S`, `X`, `0.1`, Enter
   - Position on front of tower

3. **Add cylinder for power button**:
   - Shift+A → Mesh → Cylinder
   - Scale down: `S`, type `0.08`, Enter
   - Segments: Set to 8 (for circular look)

---

## Part 3: Keyboard

### Step 3.1 - Keyboard Base

1. **Add cube for keyboard base**:
   - Shift+A → Mesh → Cube
   - Scale:
     - `S`, `X`, `2.5`, Enter (wide)
     - `S`, `Y`, `0.9`, Enter (moderate depth)
     - `S`, `Z`, `0.15`, Enter (thin)
   - Position: `G`, `Y`, `2`, Enter (in front of monitor)

### Step 3.2 - Keyboard Keys

1. **Add small cube for key**:
   - Shift+A → Mesh → Cube
   - Scale: `S`, type `0.08`, Enter
   - Position it on keyboard base

2. **Create array of keys**:
   - Modifier → Add Modifier → Array
   - Set X: `12`, Y offset: `0.2`
   - Set Y: `5`, Y offset: `0.15`
   - This creates a grid of keys

### Step 3.3 - Keyboard Refinement

1. **Add slight texture/bevels**:
   - Modifier → Bevel → `0.01`
   - This gives keys a subtle edge

---

## Part 4: Mouse

### Step 4.1 - Mouse Body

1. **Add UV sphere for mouse**:
   - Shift+A → Mesh → UV Sphere
   - Scale: `S`, type `0.15`, Enter (small)
   - Rotate: `R`, `X`, `60`, Enter (slight angle)
   - Position: `G`, `X`, `1.2`, Enter, `Y`, `2.5`, Enter (to right of keyboard)

### Step 4.2 - Mouse Cable

1. **Add bezier curve for cable**:
   - Shift+A → Curve → Bezier
   - Stretch it: Scale and position to connect mouse to tower
   - Convert to mesh: Object → Convert to → Mesh
   - Add tube modifier for 3D look

---

## Part 5: Materials & Texturing

### Step 5.1 - Monitor Screen Material

1. **Select monitor screen plane**
2. **Shading Tab** → Switch viewport to "Material Preview"
3. **Create new material**:
   - Click "New" in Properties → Material Properties
   - Set Base Color: Dark gray/black (`#1a1a1a`)
   - Set Metallic: `0.3`
   - Set Roughness: `0.4`
   - Add Emission: `0.1` (subtle glow)

### Step 5.2 - Plastic Body (Monitor/Tower)

1. **Create material for body**:
   - Base Color: Dark gray (`#3a3a3a`)
   - Metallic: `0.1`
   - Roughness: `0.6` (plastic look)

### Step 5.3 - Keyboard Material

1. **Create dark keyboard material**:
   - Base Color: Very dark gray (`#2a2a2a`)
   - Metallic: `0.0`
   - Roughness: `0.8` (matte finish)

### Step 5.4 - Mouse Material

1. **Light gray plastic**:
   - Base Color: Light gray (`#5a5a5a`)
   - Metallic: `0.1`
   - Roughness: `0.5`

---

## Part 6: Lighting & Rendering

### Step 6.1 - Scene Lights

1. **Add key light**:
   - Shift+A → Light → Sun
   - Position: `(5, 8, 5)`
   - Energy: `2`
   - Angle: `0.5`

2. **Add fill light**:
   - Shift+A → Light → Area
   - Position: `(-5, 3, -5)`
   - Energy: `0.5`
   - Size: `4`

### Step 6.2 - Camera Setup

1. **Position camera**:
   - Press NumPad 0 to view camera
   - Position: `(3, 2.5, 4)`
   - Look at center: Press `Numpad .` (period) with object selected

---

## Part 7: Export to GLB/GLTF

### Step 7.1 - Prepare for Export

1. **Join all objects** (optional but recommended):
   - Select all: `A`
   - Ctrl+J to join
   - Or keep separate for modular control

2. **Check scale**:
   - All dimensions should be reasonable (not 0.001 or 1000)
   - Recommended: Monitor ~0.5 units, tower ~0.4 units

### Step 7.2 - Export

1. **File → Export as → glTF Binary (.glb)**
2. **Name**: `computer.glb`
3. **Export Settings**:
   - ☑ Include Animations
   - ☑ Include All Bone Influences
   - Format: `glTF Binary (.glb)`
   - Include: 
     - ☑ Cameras
     - ☑ Lights
     - ☑ Custom Properties

4. **Click "Export glTF Binary"**

---

## Part 8: Alternative - Use Sketchfab Models

If modeling from scratch is too time-consuming:

1. Visit **Sketchfab.com**
2. Search: "90s computer" or "CRT monitor"
3. Filter: "Downloadable"
4. Download in `.glb` format
5. Modify in Blender if needed

**Recommended searches**:
- "retro desktop computer"
- "1990s pc monitor"
- "vintage keyboard"

---

## Part 9: Loading in Three.js

Once you have your `computer.glb`:

```javascript
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@r128/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('models/computer.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(2, 2, 2);
    model.position.y = 0;
    
    // Enable shadows
    model.traverse((node) => {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
    
    scene.add(model);
});
```

---

## Part 10: Tips & Tricks

### Optimization
- Keep polygon count low: Aim for **5,000-20,000 triangles** for web
- Use simple materials instead of complex textures
- Bake lighting if possible
- Use LOD (Level of Detail) models

### Details
- Add scratches/dust with normal maps
- Use screen textures (scanlines, glow)
- Add subtle AO (ambient occlusion) for depth
- Screen reflection is key for realism

### Common Issues
- **Model too dark**: Add emission to materials
- **Model too small**: Check export scale
- **Memory issues**: Reduce texture size or polygon count
- **Lighting looks bad**: Add multiple light sources

---

## Quick Reference - Model Dimensions

| Component | Width | Height | Depth | Position |
|-----------|-------|--------|-------|----------|
| Monitor | 0.5 | 0.4 | 0.08 | (0, 1.2, 0) |
| Tower | 0.5 | 1.5 | 1.2 | (-1.5, 0.8, 0) |
| Keyboard | 2.5 | 0.15 | 0.9 | (0, 0.6, 0.3) |
| Mouse | 0.15 | 0.15 | 0.15 | (0.35, 0.61, 0.4) |

---

## Resources

- **Blender Docs**: https://docs.blender.org/
- **Blender Modeling**: https://www.youtube.com/results?search_query=blender+3d+modeling+tutorial
- **glTF Export**: https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html
- **Three.js Loader**: https://threejs.org/docs/index.html#examples/en/loaders/GLTFLoader

---

**Next Step**: Once your model is ready, use the Three.js loader in the setup file to display it in your scene!
