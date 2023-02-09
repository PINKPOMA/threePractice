import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r126/three.module.min.js';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
//import { OrbitControls } from "https://unpkg.com/three@0.112/examples/jsm/controls/OrbitControls.js";

AOS.init({  
    duration: 1200,
})

var scene  = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var canvas = document.getElementById("infoObject");
var renderer = new THREE.WebGLRenderer({canvas});
console.log(window.innerWidth);
renderer.setSize( window.innerWidth - 20, window.innerHeight );

var loader = new GLTFLoader();
camera.position.z = 5;

var upLight = new THREE.DirectionalLight(0x4169E1, 15);
upLight.position.x = 1;
upLight.position.y = 1;
upLight.position.z = 1;

var downLight = new THREE.DirectionalLight(0x191970, 15);
downLight.position.x = -1;
downLight.position.y = -1;
downLight.position.z = -1;

scene.add(downLight);
scene.add(upLight);

/*var controls = new OrbitControls(camera, renderer.domElement);
controls.rotateSpeed = 1.0;
controls.panSpeed = 0.8; */

function onWindowResize(){
    camera.aspect = (window.innerWidth - 20) / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize((window.innerWidth - 20), window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

loader.load('../model/logo.gltf', function(gltf){
    scene.add(gltf.scene);
    var animate = function () {
	    requestAnimationFrame( animate );

	    gltf.scene.rotation.y += 0.005;
        gltf.scene.rotation.x += 0.005;

	    renderer.render( scene, camera );
    };
    animate();
});