import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const container = document.getElementById("gaming-model-container");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  //   window.innerWidth / window.innerHeight,
  300 / 500,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(300, 500);
renderer.setAnimationLoop(animate);
container.appendChild(renderer.domElement);
// document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

camera.position.x = -0.4;
camera.position.y = 1;
camera.position.z = 1.5;
camera.rotation.x = -0.3;
camera.rotation.y = -0.4;

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const loader = new GLTFLoader();
let mixer;

loader.load(
  "models/gaming.glb",
  function (gltf) {
    const model = gltf.scene;
    scene.add(gltf.scene);
    mixer = new THREE.AnimationMixer(model);

    if (gltf.animations.length > 0) {
      const action = mixer.clipAction(gltf.animations[0]); // Play first animation
      action.play();
    }
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

function animate() {
  if (mixer) {
    mixer.update(0.016); // Roughly 60 FPS (adjust as needed)
  }
  renderer.render(scene, camera);
}
