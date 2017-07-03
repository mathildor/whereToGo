
popup = {
    mode: 'deafult' //defaults means new element. other states: edit
}


var close = document.getElementById('close-button');
close.addEventListener('click', function(){
    toggleWindow();
});

function addMapElement(){
    toggleWindow();
}

function toggleWindow(element){
    var popupWindow = document.getElementById('popup-window');
    if(popupWindow.className === "hide"){
        popupWindow.className = "show"
    }else{
        popupWindow.className = "hide"
    }
    //if form made for editing element - set content
    if(element){
        document.getElementById('pop-name').value=element.name;
        document.getElementById('pop-link').value=element.link;
        document.getElementById('pop-img').value=element.img;
        document.getElementById('pop-lat').value=element.coords[1];
        document.getElementById('pop-long').value=element.coords[0];
        document.getElementById('pop-score').value=element.rank;
        document.getElementById('pop-comment').value=element.comment;
    }
}
