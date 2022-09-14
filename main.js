import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./jsm/controls/OrbitControls.js";

let scene, camera, renderer, pointLight, controls;

window.addEventListener("load", init);

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 500);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  let boxGeometry = new  THREE.BoxGeometry(100,100,100);
  let sphereGeometry = new THREE.SphereGeometry(60,32,16);
  let planeGeometry = new THREE.PlaneGeometry(400,400);
  let torusGeometry = new THREE.TorusGeometry(10,5,10, 30, Math.PI*2);
  let material = new THREE.MeshNormalMaterial({
    // wireframe: true
  });

  const count = 50
  const bufferGeometry = new THREE.BufferGeometry();
  const positionArray = new Float32Array(9*count);


  for(let i = 0; i<count*9; i++){
    positionArray[i] = Math.random(-100,100)
  }

  const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
  bufferGeometry.setAttribute("position", positionAttribute);

  let box = new THREE.Mesh(boxGeometry, material);
  let sphere = new THREE.Mesh(sphereGeometry, material);
  let plane = new THREE.Mesh(planeGeometry, material)
  let torus = new THREE.Mesh(torusGeometry, material)
  let buffer = new THREE.Mesh(bufferGeometry, material)

  box.position.x = -100;
  sphere.position.x = 100;
  plane.rotation.x = Math.PI * -0.5
  plane.position.y = -50
  scene.add(box, sphere, plane, torus, buffer)


  let directionalLight = new THREE.DirectionalLight(0xffffff, 3);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  pointLight = new THREE.PointLight(0xffffff, 4);
  pointLight.position.set(-200, -200, -200);
  scene.add(pointLight);

  let pointLightHelper = new THREE.PointLightHelper(pointLight, 20);
  scene.add(pointLightHelper);

  controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize);

  animate();
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function animate() {
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
