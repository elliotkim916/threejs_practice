/* global THREE */

'use strict';

// Define a Decoration, which is just a THREE.Group with customization
let Decoration = function() {

  // Run the Group constructor with the given arguments
  THREE.Group.apply(this, arguments);

  this.rotationSpeed = Math.random() * 0.02 + 0.005;
  this.rotationPosition = Math.random();

  let colors = ['#ff051', '#f56762', '#a53c6c', '#f19fa0', '#72bdbf', '#47689b'];

  // The main bauble is an Octahedron
  let bauble = new THREE.Mesh(
    addNoise(new THREE.OctahedronGeometry(12, 1), 2),
    new THREE.MeshStandardMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
      shading: THREE.FlatShading,
      metalness: 0,
      roughness: 0.8,
      refractionRatio: 0.25
    })
  );
  bauble.castShadow = true;
  bauble.receiveShadow = true;
  bauble.rotateZ(Math.random()*Math.PI*2);
  bauble.rotateY(Math.random()*Math.PI*2);
  this.add(bauble);

  // Cylinder to represent the top attachment
  let shape_one = new THREE.Mesh(
    addNoise(new THREE.CylinderGeometry(4, 6, 10, 6, 1), 0.5),
    new THREE.MeshStandardMaterial({
      color: 0xf8db08,
      shading: THREE.FlatShading,
      metalness: 0,
      roughness: 0.8,
      refractionRatio: 0.25
    })
  );
  shape_one.position.y += 8;
  shape_one.castShadow = true;
  shape_one.receiveShadow = true;
  this.add(shape_one);

  // a torus to represent the top hook
  let shape_two = new THREE.Mesh(
    addNoise(new THREE.TorusGeometry(2, 1, 6, 4, Math.PI), 0.2),
    new THREE.MeshStandardMaterial({
      color: 0xf8db08,
      shading: THREE.FlatShading,
      metalness: 0,
      roughness: 0.8,
      refractionRatio: 0.25
    })
  );
  shape_two.position.y += 13;
  shape_two.castShadow = true;
  shape_two.receiveShadow = true;
  this.add(shape_two);
};

Decoration.prototype = Object.create(THREE.Group.prototype);
// Decoration.prototype.constructor = Decoration;
Decoration.prototype.updatePosition = function() {
  this.rotationPosition += this.rotationSpeed;
  this.rotation.y = (Math.sin(this.rotationPosition));
};

// Create a scene which will hold all the meshes to be rendered
let scene = new THREE.Scene();

// Create and position a camera
let camera = new THREE.PerspectiveCamera(
  60,                                     // Field of view
  window.innerWidth/window.innerHeight,   // Aspect ration
  0.1,                                    // Near clipping pane
  1000                                    // Far clipping pane
);

// Reposition the camera
camera.position.set(0, 30, 50);

// Point the camera at a given coordinate
camera.lookAt(new THREE.Vector3(0, 15, 0));

// Create a renderer
let renderer = new THREE.WebGLRenderer({antialias: true});

// Size should be same as the window
renderer.setSize(window.innerWidth, window.innerHeight);

// Set a near white clear color (default is black)
renderer.setClearColor(0xfff6e6);

// Enable shadow mapping
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Append to the document
document.body.appendChild(renderer.domElement);

// Add ambient lights
let ambient_light = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient_light);

// Add a point light that will cast shadows
let point_light = new THREE.PointLight(0xffffff, 1);
point_light.position.set(25, 50, 25);
point_light.castShadow = true;
point_light.shadow.mapSize.width = 1024;
point_light.shadow.mapSize.height = 1024;
scene.add(point_light);

let shadow_material = new THREE.ShadowMaterial({color: 0xeeeeee});
shadow_material.opacity = 0.5;
let groundMesh = new THREE.Mesh(
  new THREE.BoxGeometry(100, 0.1, 100),
  shadow_material
);
groundMesh.receiveShadow = true;
scene.add(groundMesh);

let decorations = [];

// Add some new instances of our decoration
let decoration1 = new Decoration();
decoration1.position.y += 10;
scene.add(decoration1);
decorations.push(decoration1);

let decoration2 = new Decoration();
decoration2.position.set(20, 15, -10);
decoration2.scale.set(.8, .8, .8);
scene.add(decoration2);
decorations.push(decoration2);

let decoration3 = new Decoration();
decoration3.position.set(-20, 20, -12);
scene.add(decoration3);
decorations.push(decoration3);

// Render the scene/camera combination
renderer.render(scene, camera);

// An orbit control that allows us to move around the scene
let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 15, 0);
controls.maxPolarAngle = Math.PI / 2;
// controls.addEventListener('change', function() {
//   renderer.render(scene, camera);   // add this if there is no animation loop (requestAnimationFrame)
// });
requestAnimationFrame(render);

function render() {
  controls.update();

  // update the decoration positions
  for (let d = 0; d < decorations.length; d++) {
    decorations[d].updatePosition();
  }

  // render the scene/camera combination
  renderer.render(scene, camera);

  // repeat
  requestAnimationFrame(render);
}

function addNoise(geometry, noiseX, noiseY, noiseZ) {
  noiseX = noiseX || 2;
  noiseY = noiseY || noiseX;
  noiseZ = noiseZ || noiseY;

  // loop through each vertix in the geometry and move it randomly
  for (let i = 0; i < geometry.vertices.length; i++) {
    let v = geometry.vertices[i];
    v.x += -noiseX / 2 + Math.random() * noiseX;
    v.y += -noiseY / 2 + Math.random() * noiseY;
    v.z += -noiseZ / 2 + Math.random() * noiseZ;
  }

  return geometry;
}