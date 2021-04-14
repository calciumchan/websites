if(sessionStorage.getItem("refreshes") == null){
    sessionStorage.setItem("refreshes", 0);
}
if(sessionStorage.getItem("refreshes") > 7){
    sessionStorage.setItem("refreshes", 0);
}
sessionStorage.setItem("refreshes", parseInt(sessionStorage.getItem("refreshes"))+1);

if(sessionStorage.getItem("refreshes") == 6){
    document.title = "CORRUPT";
}