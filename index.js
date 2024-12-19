// Import Three.js library
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Particle Material
const particleMaterial = new THREE.PointsMaterial({
    size: 0.1,
    color: 0xff69b4, // Pink color for the heart
    transparent: true,
    opacity: 0.8,
});

// Generate Heart Shape Points
const heartShape = [];
for (let t = 0; t <= Math.PI * 2; t += 0.01) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    heartShape.push(new THREE.Vector3(x / 10, y / 10, 0)); // Scale down
}

// Name Text ("吴静茹") Particle Points
const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new THREE.TextGeometry('吴静茹', {
        font: font,
        size: 1,
        height: 0.1,
        curveSegments: 12,
    });

    const textPoints = new THREE.BufferGeometry().setFromPoints(textGeometry.vertices);
    const textParticles = new THREE.Points(textPoints, particleMaterial);
    scene.add(textParticles);
});

// Create Particle System for Heart Shape
const heartGeometry = new THREE.BufferGeometry().setFromPoints(heartShape);
const heartParticles = new THREE.Points(heartGeometry, particleMaterial);
scene.add(heartParticles);

// Animation Variables
let time = 0;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the heart and name particles for 3A effect
    heartParticles.rotation.y += 0.01;
    scene.traverse((object) => {
        if (object.isPoints) {
            object.rotation.y += 0.01;
            object.rotation.x = Math.sin(time) * 0.1;
        }
    });

    time += 0.01;
    renderer.render(scene, camera);
}

// Camera Position and Controls
camera.position.z = 10;
const controls = new OrbitControls(camera, renderer.domElement);

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
