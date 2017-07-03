var sideMenu = {
    active:{
        type:"" //hostels, cites, restaurants, places
    }
}


//events for markers menu:
document.getElementById('hostel-marker-btn').addEventListener('click', function(){
    toggleMarkers('hostels', 'hostel-marker-btn');
});
document.getElementById('cite-marker-btn').addEventListener('click', function(){
    toggleMarkers('cites', 'cite-marker-btn');
});
document.getElementById('restaurant-marker-btn').addEventListener('click', function(){
    toggleMarkers('restaurants', 'restaurant-marker-btn');
});
document.getElementById('place-marker-btn').addEventListener('click', function(){
    toggleMarkers('places', 'place-marker-btn');
});



function setMenuContent(element, type){ //type = hostels, cites, restaurants
    document.getElementById("sideMenu").className="show";
    sideMenu.active.type = type;
    //Setting global variabel - to be able to edit and delete element
    activeElementName = element.name;

    div=document.getElementById('sideMenu-info');
    console.log(div);
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    newText('h5', 'CLOSE', div).addEventListener('click', function(){
        //backToMenu();
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        document.getElementById("sideMenu").className="hide";
    });

    newText('h1', element.name, div);
    newSrc('img', element.img, '', div);
    var editIconUrl='../img/edit-icon.ico';
    newSrc('img', editIconUrl,'', div,'edit-element').addEventListener('click', function(){
        editElementInDB(type);
    });
    var deleteIconUrl='../img/delete-icon.png';
    newSrc('img', deleteIconUrl,'', div, 'delete-element').addEventListener('click', function(){
        deleteElementInDb(type);
    });

    newHref('a', element.link, 'More info', div);
    newText('p', element.comment, div);
    newText('h1', element.rank, div);

}
