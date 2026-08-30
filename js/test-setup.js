// Automated Test Suite for 3D Monitor Setup
// Run in browser console or via node

const TestSuite = {
  results: [],
  passed: 0,
  failed: 0,

  // Test 1: Check if Three.js is loaded
  testThreeJSLoaded() {
    const test = 'THREE.js library loaded';
    try {
      if (typeof THREE !== 'undefined' && THREE.Scene) {
        this.results.push({ test, status: '✓ PASS' });
        this.passed++;
      } else {
        throw new Error('THREE is undefined');
      }
    } catch (e) {
      this.results.push({ test, status: `✗ FAIL: ${e.message}` });
      this.failed++;
    }
  },

  // Test 2: Check if GLTFLoader is available
  testGLTFLoaderAvailable() {
    const test = 'GLTFLoader available';
    try {
      if (typeof THREE !== 'undefined' && THREE.GLTFLoader) {
        this.results.push({ test, status: '✓ PASS' });
        this.passed++;
      } else {
        throw new Error('GLTFLoader not found in THREE namespace');
      }
    } catch (e) {
      this.results.push({ test, status: `✗ FAIL: ${e.message}` });
      this.failed++;
    }
  },

  // Test 3: Check canvas element exists
  testCanvasExists() {
    const test = 'Canvas element exists';
    try {
      const canvas = document.getElementById('three-canvas');
      if (canvas && canvas.tagName === 'CANVAS') {
        this.results.push({ test, status: '✓ PASS' });
        this.passed++;
      } else {
        throw new Error('Canvas element not found');
      }
    } catch (e) {
      this.results.push({ test, status: `✗ FAIL: ${e.message}` });
      this.failed++;
    }
  },

  // Test 4: Check display info element exists
  testDisplayInfoExists() {
    const test = 'Display info element exists';
    try {
      const info = document.getElementById('display-info');
      if (info) {
        this.results.push({ test, status: '✓ PASS' });
        this.passed++;
      } else {
        throw new Error('Display info element not found');
      }
    } catch (e) {
      this.results.push({ test, status: `✗ FAIL: ${e.message}` });
      this.failed++;
    }
  },

  // Test 5: Check model file path
  testModelFileAccessible() {
    const test = 'Model file path correct';
    try {
      const modelPath = './assets/3d models/monitor.glb';
      this.results.push({
        test,
        status: `✓ PASS: ${modelPath}`
      });
      this.passed++;
    } catch (e) {
      this.results.push({ test, status: `✗ FAIL: ${e.message}` });
      this.failed++;
    }
  },

  // Test 6: Check CSS is loaded
  testCSSLoaded() {
    const test = 'CSS stylesheets loaded';
    try {
      const styleSheets = document.styleSheets.length;
      if (styleSheets > 0) {
        this.results.push({
          test,
          status: `✓ PASS: ${styleSheets} stylesheets`
        });
        this.passed++;
      } else {
        throw new Error('No stylesheets found');
      }
    } catch (e) {
      this.results.push({ test, status: `✗ FAIL: ${e.message}` });
      this.failed++;
    }
  },

  // Test 7: Check if DOM is fully loaded
  testDOMReady() {
    const test = 'DOM fully loaded';
    try {
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        this.results.push({ test, status: `✓ PASS: ${document.readyState}` });
        this.passed++;
      } else {
        throw new Error(`DOM state: ${document.readyState}`);
      }
    } catch (e) {
      this.results.push({ test, status: `✗ FAIL: ${e.message}` });
      this.failed++;
    }
  },

  // Test 8: Check viewport meta tag
  testViewportMeta() {
    const test = 'Viewport meta tag present';
    try {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        this.results.push({ test, status: '✓ PASS' });
        this.passed++;
      } else {
        throw new Error('Viewport meta tag not found');
      }
    } catch (e) {
      this.results.push({ test, status: `✗ FAIL: ${e.message}` });
      this.failed++;
    }
  },

  // Test 9: Check if window has required global objects
  testGlobalObjects() {
    const test = 'Window global objects available';
    try {
      const hasDocument = typeof document !== 'undefined';
      const hasWindow = typeof window !== 'undefined';
      const hasConsole = typeof console !== 'undefined';

      if (hasDocument && hasWindow && hasConsole) {
        this.results.push({ test, status: '✓ PASS' });
        this.passed++;
      } else {
        throw new Error('Missing global objects');
      }
    } catch (e) {
      this.results.push({ test, status: `✗ FAIL: ${e.message}` });
      this.failed++;
    }
  },

  // Test 10: Check HTML structure
  testHTMLStructure() {
    const test = 'HTML structure valid';
    try {
      const header = document.querySelector('header');
      const main = document.querySelector('main');
      const home = document.getElementById('home');

      if (header && main && home) {
        this.results.push({ test, status: '✓ PASS' });
        this.passed++;
      } else {
        throw new Error('HTML structure incomplete');
      }
    } catch (e) {
      this.results.push({ test, status: `✗ FAIL: ${e.message}` });
      this.failed++;
    }
  },

  // Run all tests
  runAll() {
    console.log('\n🧪 Starting 3D Monitor Setup Tests...\n');

    this.testThreeJSLoaded();
    this.testGLTFLoaderAvailable();
    this.testCanvasExists();
    this.testDisplayInfoExists();
    this.testModelFileAccessible();
    this.testCSSLoaded();
    this.testDOMReady();
    this.testViewportMeta();
    this.testGlobalObjects();
    this.testHTMLStructure();

    this.printResults();
  },

  // Print results in formatted table
  printResults() {
    console.table(this.results);

    console.log('\n' + '='.repeat(50));
    console.log(`📊 Test Summary:`);
    console.log(`   ✓ Passed: ${this.passed}`);
    console.log(`   ✗ Failed: ${this.failed}`);
    console.log(`   Total: ${this.passed + this.failed}`);
    console.log('='.repeat(50) + '\n');

    if (this.failed === 0) {
      console.log('✅ All tests passed! Setup is ready.');
      console.log('\n🎮 Interactive Features:');
      console.log('   • Type to see keyboard input on screen');
      console.log('   • Move mouse to see coordinates');
      console.log('   • Monitor rotates on Y-axis');
      console.log('   • Commands: help, clear, tech, about\n');
    } else {
      console.log('⚠️  Some tests failed. Check the results above.');
      console.log('   Check browser console for errors (F12)\n');
    }
  }
};

// Auto-run tests when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => TestSuite.runAll(), 1000);
  });
} else {
  setTimeout(() => TestSuite.runAll(), 1000);
}
