/*global document*/
/*eslint-disable no-unused-vars*/

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/de_DE/sdk.js#xfbml=1&version=v2.11';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));



function changeImage(imgName) {
    var images = ["#Bild0", "#Bild1", "#Bild2", "#Bild3", "#Bild4", "#Bild5"], 
        imagesLength=images.length, 
        i;
    
    $(images[imgName]).show();
    
    for (i=0; i<imagesLength; i=i+1){
        if (i!==imgName){
            $(images[i]).hide();
        }      
        
    }
}

$(document).ready(function () {
    changeImage(0);
});

