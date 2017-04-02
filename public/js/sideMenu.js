var sideMenu = {
    active:{
        type:"" //hostels, cites, restaurants
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



function setMenuContent(element, type){ //type = hostels, cites, restaurants
    sideMenu.active.type = type;
    //Setting global variabel - to be able to edit and delete element
    activeElementName = element.name;

    div=document.getElementById('sideMenu-info');
    console.log(div);
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    newText('h5', 'Back', div).addEventListener('click', function(){
        //backToMenu();
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    });

    newText('h1', element.name, div);
    newSrc('img', element.img, '', div);
    newText('h1', element.rank, div);
    newHref('a', element.link, 'homepage', div);
    newText('p', element.comment, div);

    newText('h5', 'edit', div, 'edit-element').addEventListener('click', function(){
        editElementInDB(type);
    });
    newText('h5', 'delete', div, 'delete-element').addEventListener('click', function(){
        deleteElementInDb(type);
    });



}
