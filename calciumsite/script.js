
function start(){
	var MAX_HEADERS = 2;
	console.log("FUCK");
	console.log(document.getElementById("img_header"));
	document.getElementById("img_header").src = "assets/headers/"+Math.round(Math.random()*MAX_HEADERS)+".png";
	console.log(document.getElementById("img_header").src);
}

window.onload = start;
