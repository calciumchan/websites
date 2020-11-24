var pfpnum = 0;
var name = "";
var message = "";

function post(){
	name = document.getElementById("input_name").value;
	message = document.getElementById("input_body").value;
	fetch("https://ca20.xyz/board/post.php?pfp=" + pfpnum + "&name=" + name + "&message=" + message )
	document.getElementById("input").innerHTML = "POSTED!<br><a href=board.html><button>Board</button></a>"
}

function set_pfp(number){
	pfpnum = number;
	document.getElementById("userpfp").src = "pfp" + pfpnum + ".png";
}
