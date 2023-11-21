/*----------------------------------------------------------------------------------------------------
ultra basic obsidian -> HTML converter because i fucking hate everytthing and i just want a quick solution
there are a millionmarkdown parsers but they all didnt work with obsidian notes out of the box
and i dont really want to spend a lot of time exporting shit
hence i am spending a lot of time to write my own fucking parser
maybe one day ill learn to how to smart but today is not the day
this parser is missing a lot of stuff and you can go fuck yourself
----------------------------------------------------------------------------------------------------*/

var client = new XMLHttpRequest();


function goto_note(name){
    location.assign("?" + name);
}

function load_note(filename){
    //GET FILENAME
    client.open("get","mediaconsumed/" + filename + ".md");
    client.onreadystatechange = function() {
        if(client.readyState == 4){
            //QUERYSTRING
            window.history.replaceState(null,null,"?" + filename.replaceAll(" ","\%20"));

            //CLEAR SCREEN
            document.getElementById("main_text").innerHTML = "<div id = 'main_header'>" + filename.replaceAll("%20"," ") + "</div>";

            //CHECK IF SUCCESS
            if (client.status === 200){
                //PARSE NOTE TO SCREEN
                render_note(client.responseText,document.getElementById("main_text"));
                document.title = "✓ " + filename.replaceAll("%20"," ");
            }else{
                //FAILURE THERE IS NO NOTE!!!
                //PARSE NOTE TO SCREEN
                render_note("OOPS\nI HAVENT WRITTEN ANYTHING ABOUT THIS YET\n:(\n---\n[[index]]",document.getElementById("main_text"));
                document.title = "✗ " + filename.replaceAll("%20"," ");
            }
        }
    }
    //LOAD
    client.send();
}

document.addEventListener("DOMContentLoaded", function(event) {
    //CHECK LINK
    if(location.search == ""){
        load_note("index");
    }else{
        load_note(location.search.substring(1,location.search.length));
    }
})

function render_note(notedata, target){
    notearray = notedata.split("\n");
    let length = notearray.length
    let element = document.createElement("div");
    for(let i = 0; i < length; i++){
        /*----------------------------------------------------------------------------------------------------

            IMAGES

        ----------------------------------------------------------------------------------------------------*/
        while(notearray[i].includes("![[")){
            let imagename = notearray[i].substring(
                notearray[i].indexOf("![[")+3,
                notearray[i].indexOf("]]") 
            )
            notearray[i] = notearray[i].replace(
                "![[" + imagename + "]]",
                "<img class='inlineimage' src='mediaconsumed/"+imagename+"'>"
            )
        }
        /*----------------------------------------------------------------------------------------------------

            BACK LINKS

        ----------------------------------------------------------------------------------------------------*/
        while(notearray[i].includes("[[")){
            let backlink = notearray[i].substring(
                notearray[i].indexOf("[[")+2,
                notearray[i].indexOf("]]") 
            )
            if(backlink.charAt(0) == "?"){
				//BROKEN LINK
				if(backlink.includes("|") == true){
					notearray[i] = notearray[i].replace(
						"[[" + backlink + "]]",
						"<brokenlink>" + backlink.substring(1,backlink.length).split("|")[1] + "</brokenlink>"
					)
				}else{
					notearray[i] = notearray[i].replace(
						"[[" + backlink + "]]",
						"<brokenlink>" + backlink.substring(1,backlink.length) + "</brokenlink>"
						//backlink.substring(1,backlink.length)
					)
				}
            }else{
				//CUT LINK
				if(backlink.includes("|") == true){
					notearray[i] = notearray[i].replace(
						"[[" + backlink + "]]",
						"<backlink onclick = \"goto_note('" + backlink.split("|")[0] + "')\">" + backlink.split("|")[1] + "</backlink>"
					)
				}else{
					//NORMAL LINK
					notearray[i] = notearray[i].replace(
						"[[" + backlink + "]]",
						"<backlink onclick = \"goto_note('" + backlink + "')\">" + backlink + "</backlink>"
					)
				}
            }
            
        }
        /*----------------------------------------------------------------------------------------------------

            TAGS

        ----------------------------------------------------------------------------------------------------*/


        if(notearray[i].substring(0,1) == "#"){
            /*----------------------------------------------------------------------------------------------------

                HEADERS AND TAGS

            ----------------------------------------------------------------------------------------------------*/
            let headeramount = 0;
            while(notearray[i].substring(headeramount,headeramount+1) == "#"){
                headeramount++;
            }
            if(notearray[i].substring(headeramount,headeramount+1) != " "){
                //THIS IS A TAG
                element.innerHTML += "<tag>" + notearray[i] + "</tag><br>";
            }else{
                //THIS IS A HEADER
                element.innerHTML += "<h" + headeramount + ">" + notearray[i].substring(headeramount,notearray[i].length) + "</h" + headeramount + ">";
            }
        }else if(notearray[i] == "---"){
            element.innerHTML += "<hr>";
        }else{
            /*----------------------------------------------------------------------------------------------------

                REGULAR LINES

            ----------------------------------------------------------------------------------------------------*/
            element.innerHTML += notearray[i] + "<br>";
        }
    }
    hide_loading()
    target.innerHTML += element.innerHTML;
}

function hide_loading(){
    document.getElementById("loading").style.visibility = "hidden";
}