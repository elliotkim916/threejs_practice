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
camera.position.set(0, 30, 50);

// Point the camera at a given coordinate
camera.lookAt(new THREE.Vector3(0, 15, 0));

// Create a renderer
// setting antialias to true for the renderer improves the appearances of edges of objects in the scene
let renderer = new THREE.WebGLRenderer({antialias: true});

// Size should be the same as the window
renderer.setSize(window.innerWidth, window.innerHeight);

// Set a near white color (default is black)
renderer.setClearColor(0xfff6e6);

// Casting & receiving shadows
// Shadows are disabled by default, so must be enabled on renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Append to the document
document.body.appendChild(renderer.domElement);

// ambient lights get applied to all objects in the scene globally
let ambient_light = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambient_light);

// point lights create a light at a specific position in the scene
// the light shines in all directions, roughly like a lightbulb
let point_light = new THREE.PointLight(0xffffff, 1);
point_light.position.set(25, 50, 25);
// we need to specify which lights should cast a shadow & the size of the shadow map that will be rendered
point_light.castShadow = true;
point_light.shadow.mapSize.width = 1024;
point_light.shadow.mapSize.height = 1024;
scene.add(point_light);

let shadow_material = new THREE.ShadowMaterial({color: 0xeeeeee});
shadow_material.opacity = 0.5;
let ground_mesh = new THREE.Mesh(
  new THREE.BoxGeometry(
    100,
    0.1,
    100
  ),
  shadow_material
);
ground_mesh.receiveShadow = true;
scene.add(ground_mesh);

// let plane = new THREE.Mesh(
//   new THREE.PlaneGeometry(5, 5, 5, 5),
//   new THREE.MeshBasicMaterial({
//     color: 0x393839, 
//     wireframe: true 
//   })
// );
// plane.rotateX(Math.PI/2);
// scene.add(plane);

// Mesh is created from the geometry & material, then added to scene
// We need a Mesh, an object that takes a Geometry and applies a Material to it, which we can insert into our scene & move freely around.
let shape_one = new THREE.Mesh(
  // Geometry is any object that contains all the points (vertices) & fill (faces) of the cube.
  new THREE.OctahedronGeometry(10, 1),
  // Materials describe the appearance of objects.
  // You don't have to rewrite Materials if you decide to use a different renderer.
  new THREE.MeshStandardMaterial({
    color: 0xff0051,
    shading: THREE.FlatShading, // default is THREE.SmoothShading  metalness: 0, roughness: 1
    metalness: 0,
    roughness: 0.8
  })
);
shape_one.position.y += 10;
shape_one.rotateZ(Math.PI/3);
shape_one.castShadow = true;
shape_one.receiveShadow = true;
scene.add(shape_one);

let shape_two = new THREE.Mesh(
  new THREE.OctahedronGeometry(5, 1),
  new THREE.MeshStandardMaterial({
    color: 0x47689b,
    shading: THREE.FlatShading,
    metalness: 0,
    roughness: 0.8
  })
);
shape_two.position.y += 5;
shape_two.position.x += 15;
shape_two.rotateZ(Math.PI/5);
shape_two.castShadow = true;
shape_two.receiveShadow = true;
scene.add(shape_two);
// Render the scene/camera combination
renderer.render(scene, camera);

// Add an orbit control which allows you to move around the scene
let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', function() {
  renderer.render(scene, camera);
});