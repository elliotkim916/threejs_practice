/* global THREE */

// Drawing Lines

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

// vertices: points of intersection between 3 edges
// edges: an edge where 2 faces meet
// faces: polygons that make up the face of the model
let material = new THREE.LineBasicMaterial({ color: 0x0000ff});
let geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(-30, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, 10, 0));
geometry.vertices.push(new THREE.Vector3(30, 0, 0));

let line = new THREE.Line(geometry, material);
camera.position.z = 100;

scene.add(line);
renderer.render(scene, camera);