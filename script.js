// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Initialize Cannon.js
const physicsWorld = new CANNON.World();
physicsWorld.gravity.set(0, -9.82, 0);

// Chassis (physics and visuals)
const chassisBody = new CANNON.Body({ mass: 50 });
chassisBody.addShape(new CANNON.Box(new CANNON.Vec3(2, 0.5, 1)));
chassisBody.position.set(0, 1, 0);
physicsWorld.addBody(chassisBody);

const chassisVisual = new THREE.Mesh(
  new THREE.BoxGeometry(4, 1, 2),
  new THREE.MeshBasicMaterial({ color: 0x333333 })
);
scene.add(chassisVisual);

// Wheel (physics and visuals)
const wheelBody = new CANNON.Body({ mass: 5 });
wheelBody.addShape(new CANNON.Cylinder(0.5, 0.5, 0.2, 4));
wheelBody.position.set(1.8, 0, 0);
physicsWorld.addBody(wheelBody);

const wheelVisual = new THREE.Mesh(
  new THREE.CylinderGeometry(0.5, 0.5, 0.2, 16),
  new THREE.MeshBasicMaterial({ color: 0xaaaaaa })
);
scene.add(wheelVisual);

// Simple constraint (spring)
const spring = new CANNON.Spring(chassisBody, wheelBody, {
  stiffness: 500,
  damping: 20,
  localAnchorA: new CANNON.Vec3(1.8, 0, 0),
  localAnchorB: new CANNON.Vec3(0, 0, 0)
});
physicsWorld.addConstraint(spring);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  physicsWorld.step(1 / 60);
  
  // Sync visuals with physics
  chassisVisual.position.copy(chassisBody.position);
  wheelVisual.position.copy(wheelBody.position);

  renderer.render(scene, camera);
}
animate();