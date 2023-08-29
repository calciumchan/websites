//LOGO
var numberoflogos = 2;
document.getElementById("logo").src = "assets/logo/" + Math.round(Math.random()*numberoflogos) + ".png";//LOGO

var numberofheaders = 3;
document.getElementById("header_bg").style.backgroundImage = "url(assets/header/" + Math.round(Math.random()*numberofheaders) + ".png)";

//STUPID WORDS
list_of_phrases = [
	"Never stop searching for what speaks to you, pour all of your energy into it, spend all your money on it, then die",
	"It's only helping if it helps.",
	"If you don't love what you do, you dont deserve to do it at all.",
	"find a place you belong and never let it go.",
	"this world wasnt made for you, make your own.",
	"no reason to fear",
];

document.getElementById("special_phrase").innerHTML = list_of_phrases[Math.round(Math.random()*(list_of_phrases.length-1))];

//RANDOM CHANCE BACKGROUND CHANGE
const special_colors = [
	"#000000",
	"#ffffff",
	"#ffc0be",
	"#ffac1c",
	"#900c3f"
]
if(Math.round(Math.random()* 50)  == 1){
	const bg_color_to_use = special_colors[Math.round(Math.random() * special_colors.length)];
	document.body.style.backgroundColor = bg_color_to_use;
}


/*------------------------------------------------------------------------------------------------------------------------

	THREE JS

------------------------------------------------------------------------------------------------------------------------*/

const scene = new THREE.Scene({
	
});
scene.fog = new THREE.Fog(0xffffff,0,10);
const camera = new THREE.PerspectiveCamera(75,300/300,0.1,1000);
const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true});
renderer.setSize(300,300);
renderer.domElement.id = "canvas_3d";
document.body.prepend(renderer.domElement);


let knot;
function generate_knot(){
	if(knot!= undefined){
		scene.remove(knot);
	}
	let geometry;
	switch(Math.round(Math.random()*16)){
		case 1:
			geometry = new THREE.OctahedronGeometry(1 + Math.random(4),Math.round(Math.random()*5));
			break;
		case 2:
			geometry = new THREE.TetrahedronGeometry(1 + Math.random(4),Math.round(Math.random()*5))
			break;
		case 3:
			geometry = new THREE.DodecahedronGeometry(1 + Math.random(4),Math.round(Math.random()*5))
			break;
		case 4:
			geometry = new THREE.CapsuleGeometry(1 + Math.random(4),1+(Math.random()*32),2,4+Math.round(Math.random()*4))
			break;
		default:
		geometry = new THREE.TorusKnotGeometry(
			1 + Math.random(4),
			0.02,
			64+Math.round(Math.random()) * 64,
			1 + Math.round(Math.random()) * 2,
			1 + Math.round(Math.random()) * 16,
			1 + Math.round(Math.random()) * 16
		);
		break;
	}
	
	const material = new THREE.MeshBasicMaterial({
		color:0x000000,
		wireframe:true,
		transparent:true,
		opacity:0,
		side:THREE.DoubleSide
	});
	knot = new THREE.Mesh(geometry,material);
	scene.add(knot);
}

let tick = 0;
let time_to_shift = false;
let shift_timer = 0;

function animate(){
	requestAnimationFrame(animate);
	tick++;
	shift_timer ++;
	if(shift_timer > 500 && Math.random() * 1000 < 1 && knot.material.opacity >= 1){
		shift_timer = 0;
		time_to_shift = true;
	}
	if(time_to_shift == true && knot.material.opacity > 0){
		knot.material.opacity -= 0.01;
		if(knot.material.opacity <= 0){
			shift();
		}
	}
	if(time_to_shift == false && knot.material.opacity < 1){
		knot.material.opacity += 0.001;
	}
	knot.rotation.y+=0.0005;
	knot.rotation.x+=0.0006;
	knot.rotation.z+=0.0007;
	renderer.setSize(document.getElementById("thevoid").offsetWidth,document.getElementById("thevoid").offsetHeight);
	camera.aspect = (document.getElementById("thevoid").offsetWidth/document.getElementById("thevoid").offsetHeight);
	camera.updateProjectionMatrix()
	renderer.render(scene,camera);
}
shift();
animate();

function shift(){
	generate_knot();
	time_to_shift = false;
	camera.position.z = Math.random() * 8;
	knot.rotation.x = Math.random() * 16;
	knot.rotation.y = Math.random() * 16;
	knot.rotation.z = Math.random() * 16;
}