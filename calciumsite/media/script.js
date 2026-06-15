let client = new XMLHttpRequest();

const notepath = "markdown";

const element_reader = document.getElementById("main_reader");

function load_note(filename){

	element_reader.innerHTML = "";

	client.open("get", notepath + "/" + filename + ".md");

	client.onreadystatechange = function(){
		if(client.readyState == 4){
			if (client.status === 200){
				//element_reader.innerHTML = client.responseText;
				document.title = document.title = ">" + filename.replaceAll("%20"," ");
				window.history.replaceState(null,null,"?" + filename.replaceAll(" ","\%20"));
				render_note(client.responseText,element_reader);
			}
		}
	}

	client.send();
}

function render_note(text,element){
	let lines = text.split("\n")

	let output = document.createElement("span");

	for(let i = 0; i < lines.length; i++){
		let element = undefined;
		/*
		switch(lines[i]){
			case "---":
				element = create_element("hr");
				break;
			default:
				element = parse_line(lines[i]);
				break;
		}
		*/
		element = parse_line(lines[i]);
		if(element != undefined){
			output.appendChild(element);
		}
	}
	//console.log(lines);



	//element.innerHTML = text.replaceAll("\n","<br>");
	element.appendChild(output);
}

function parse_line(text){
	let returnelement = create_element("p");

	//HARD RULE
	text = text.replace(/---/g,"<hr>")


	//TAGS
	text = text.replace(/#(\w{1,})/g,"<tag>#$1</tag>")

	//IMAGES
	text = text.replace(/!\[\[(.*?)\]\]/g,"<img class = 'inline-img' onclick = 'examine_image(this)' src='" + notepath + "/$1'>")

	//DATE
	text = text.replace(/^(\d{4}-\d{2}-\d{2})/g,"<datestamp>$1</datestamp>")

	//BROKEN LINKS
	text = text.replace(/\[\[\?(.*?)\]\]/g,"<brokenlink>$1</brokenlink>")

	//BACK LINKS
	text = text.replace(/\[\[(.*?)\]\]/g,"<backlink onclick = 'goto_note(\"$1\")'>$1</backlink>")

	//HEADERS
	text = text.replace(/(#{1,}) (.*?)/g,"<h1>$2<h1>")

	returnelement.innerHTML = text;
	return returnelement;
}

function goto_note(name){
    location.assign("?" + name);
}

function create_element(type = "div"){
	return document.createElement(type);
}

function examine_image(element){
	console.log(element);
	//ADD THIS FUNCTIONALITY LATER PLEASE!
}


document.addEventListener("DOMContentLoaded", function(event) {
    //CHECK LINK
    if(location.search == ""){
        load_note("index");
    }else{
        load_note(location.search.substring(1,location.search.length));
    }
})