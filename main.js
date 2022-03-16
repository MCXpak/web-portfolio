import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


// SETUP
//Scene
const scene = new THREE.Scene();

{
	const near = 1;
	const far = 50;
	//const color = 'lightblue';
	scene.fog = new THREE.Fog(0x3DFAFF, near, far);
	//scene.background = new THREE.Color(color);
}
//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//Renderer
const renderer = new THREE.WebGLRenderer({
	antialias: true,
	canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x3DFAFF);
camera.position.set(10,5,10);

/*
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial( {color: 0xAA6347} );
const torus = new THREE.Mesh(geometry, material);
*/
//scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 20, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper);


const controls = new OrbitControls(camera, renderer.domElement);

let iter = 0;

//Create Blocks
function createGrassBlock(){
	const grassBlockGeometry = new THREE.BoxGeometry(1, 1, 1);
	const grassBlockMaterial = new THREE.MeshStandardMaterial({ color: 0x4C9453 });
	return new THREE.Mesh(grassBlockGeometry, grassBlockMaterial);
}

function createDirtBlock(){
	const dirtBlockGeometry = new THREE.BoxGeometry(1, 1, 1);
	const dirtBlockMaterial = new THREE.MeshStandardMaterial({ color: 0x58340E})
	return new THREE.Mesh(dirtBlockGeometry, dirtBlockMaterial);
}

function createTreeTrunk(){
	const treeBlockGeometry = new THREE.BoxGeometry(1,1,1);
	const treeBlockMaterial = new THREE.MeshStandardMaterial({ color: 0x251904})
	return new THREE.Mesh(treeBlockGeometry, treeBlockMaterial);
}

function createLeafBlock(){
	const leafBlockGeometry = new THREE.BoxGeometry(1,1,1);
	const leafBlockMaterial = new THREE.MeshStandardMaterial({ color: 0x0E5838})
	return new THREE.Mesh(leafBlockGeometry, leafBlockMaterial);
}


//Add block functions
function addGrassBlocks(){
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			const grassBlock = createGrassBlock();
			grassBlock.position.set(i,1,j);
			scene.add(grassBlock);
		}
	}
}

function addDirtBlocks(){
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			for (let k = 1; k < 5; k++) {
				const dirtBlock = createDirtBlock();
				dirtBlock.position.set(i,k-4,j);
				scene.add(dirtBlock);
			}
		}
	}
}

function addTreeTrunk(){
	for (let i = 0; i < 4; i++) {
		const treeTrunk = createTreeTrunk();
		treeTrunk.position.set(7,i+2,3);
		scene.add(treeTrunk);
	}
}

function addLeafs(){
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 5; j++) {
			for (let k = 1; k < 3; k++) {
				const leafBlock = createLeafBlock();
				leafBlock.position.set(i+5,k+5,j+1);
				scene.add(leafBlock);
			}
		}
	}
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			const leafBlock = createLeafBlock();
			leafBlock.position.set(i+6,8,j+2);
			scene.add(leafBlock);
		}
	}
}

addGrassBlocks();
addDirtBlocks();
addTreeTrunk();
addLeafs();

const loader = new GLTFLoader();
loader.load( './low_poly_fireplace.glb', function ( gltf ) {
	gltf.scene.position.set(3,1.55,6.5)
	scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );




/*
function addStar() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({color: 0xffffff});
	const star = new THREE.Mesh(geometry, material);
	
	const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
	
	star.position.set(x,y,z);
	scene.add(star)
}

Array(200).fill().forEach(addStar);
*/
//const spaceTexture = new THREE.TextureLoader().load('space.jpg');
//scene.background = 0x3DFAFF;

//Avatar
/*
const moTexture = new THREE.TextureLoader().load('mo.jpg');

const mo = new THREE.Mesh(
	new THREE.BoxGeometry(3,3,3),
	new THREE.MeshBasicMaterial({map:moTexture})
	);
	*/
//scene.add(mo);

// Moon
/*
const earthTexture = new THREE.TextureLoader().load('earth.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
	
const earth = new THREE.Mesh(
	new THREE.SphereGeometry(3, 32, 32),
	new THREE.MeshStandardMaterial({
		map: earthTexture,
		normalMap: normalTexture
	})
	);
	
	//scene.add(earth);
	
	earth.position.z = 30;
	earth.position.setX(-10);
	
	*/

function moveCamera(){
	
	const t = document.body.getBoundingClientRect().top;
	
	camera.position.z = 10 + (t * -0.005);
	camera.position.x = 10 + (t * 0.001);
	camera.position.y = 5 + (t * -0.001);

	
}
document.body.onscroll = moveCamera;
moveCamera();

function animate() {
	requestAnimationFrame(animate);
	/*
	torus.rotation.x += 0.01;
	torus.rotation.y += 0.005;
	torus.rotation.z += 0.01;
	*/
	controls.update();

	renderer.render(scene, camera);
}

animate();