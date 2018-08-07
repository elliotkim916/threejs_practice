'use strict';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let loader = new THREE.FontLoader();
loader.load('fonts/helvetiker_regular.typeface.json', function(font) {
  let geometry = new THREE.TextGeometry('Hello THREE.js!', {
    font: 'optimer',
    size: 80,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 8,
    bevelSegments: 5
  });

  let material = new THREE.MeshBasicMaterial({color: 0x11ff00});
  let text = new THREE.Mesh(geometry, material);
  scene.add(text);
});


camera.position.z = 10;

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();