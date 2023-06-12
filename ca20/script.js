//LOGO
var numberoflogos = 2;
document.getElementById("logo").src = "assets/logo/" + Math.round(Math.random()*numberoflogos) + ".png";//LOGO

var numberofheaders = 3;
document.getElementById("header_bg").style.backgroundImage = "url(assets/header/" + Math.round(Math.random()*numberofheaders) + ".png)";

//STUPID WORDS
list_of_phrases = [
	"Never stop searching for what speaks to you, pour all of your energy into it, spend all your money on it, then die",
	"It's only helping if it helps.",
	"If you don't love what you do, you dont deserve to do it at all."
];

phrases = [];

for(let i = 0; i < 64; i ++){
	var element = document.createElement("div");
	element.classList.add("special_phrase");
	element.style.left = Math.random()*100 + "%";
	element.style.top = Math.random()*100 + "%";
	element.innerHTML = list_of_phrases[Math.round(Math.random()*(list_of_phrases.length-1))];
	phrases.push(element);
	document.getElementById("thevoid").appendChild(element);
}