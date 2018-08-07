'use strict';

// CREATING THE SCENE
let scene = new THREE.Scene();
// THREE.PerspectiveCamera(fov, aspect, near, far)
// * FOV (field of view) - Extent of the scene that is seen on display at any given moment
// * Aspect Ratio - Width of the element divided by the height.  
// You'll always want to use width of the element/height or else you'll get the same result as when you play old movies on a widescreen TV - the image looks squished.
// * Near & Far Clipping Plane - Objects that are further away from the camera than the value of 'far' or closer than 'near' won't be rendered.   
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let renderer = new THREE.WebGLRenderer();
// Created renderer instance
// Set the size at which we want it to render our app
// Its a good idea to use the width & height of the area we want to fill with our app, such as the width & height of browser window
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement);

// CUBE
// To create a cube, we need a BoxGeometry (contains all the vertices and faces of the cube).
// Also need a material to color it.
// Also need a Mesh (an object that takes a geometry & applies material to it, which we can then insert to our scene & move freely around).
let geometry = new THREE.BoxGeometry( 1, 1, 1 );
let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// RENDERING THE SCENE
// Can't see anything yet until we have our render or animate loop.

// This will create a loop that causes the renderer to draw the scene every time the screen is refreshed.
// (On a typical screen, this means 60 times per second)
// requestAnimationFrame's one of many advantages is that it pauses when user navigates to another browser tab.
function animate() {
  requestAnimationFrame(animate);

  // This will be run every frame (normally 60 times per second)
  // Anything I want to move or change while the app is running has to go through the animate loop.
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();