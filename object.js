'use strict';

// Create a scene which will hold all our meshes to be rendered
let scene = new THREE.Scene();

// Create & position the camera
let camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
);

// Reposition the camera
camera.position.set(5, 5, 0);

// Point the camera at a given coordinate
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Create a renderer
// setting antialias to true for the renderer improves the appearances of edges of objects in the scene
let renderer = new THREE.WebGLRenderer({antialias: true});

// Size should be the same as the window
renderer.setSize(window.innerWidth, window.innerHeight);

// Set a near white color (default is black)
renderer.setClearColor(0xfff6e6);

// Append to the document
document.body.appendChild(renderer.domElement);

// Mesh is created from the geometry & material, then added to scene
let plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5, 5, 5),
  new THREE.MeshBasicMaterial({
    color: 0x393839, 
    wireframe: true 
  })
);
plane.rotateX(Math.PI/2);
scene.add(plane);

// Render the scene/camera combination
renderer.render(scene, camera);

// Add an orbit control which allows you to move around the scene
let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', function() {
  renderer.render(scene, camera);
});