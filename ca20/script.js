let headers = 3;

function load(){
    document.getElementById("main-header").src = "assets/header/" + Math.round(Math.random()*headers) + ".png";
}