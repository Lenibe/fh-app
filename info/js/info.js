/*global $, document, google */

var map,
    infowindow;


function createMarker(place) {
    'use strict';

    var icon,
        marker;

    if (place.types.indexOf("restaurant") > -1) {
        icon = 'img/markers/brown_MarkerR.png';
    } else if (place.types.indexOf("bank") > -1) {
        icon = 'img/markers/yellow_MarkerB.png';
    } else if (place.types.indexOf("supermarket") > -1) {
        icon = 'img/markers/blue_MarkerS.png';
    } else if (place.types.indexOf("shopping_mall") > -1) {
        icon = 'img/markers/blue_MarkerS.png';
    } else if (place.types.indexOf("gas_station") > -1) {
        icon = 'img/markers/green_MarkerT.png';
    }

    marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: icon
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

function callback(results, status) {
    'use strict';

    var i;

    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (i = 0; i < results.length; i += 1) {
            createMarker(results[i]);
        }
    }
}

function findPlaces(lat, lng) {
    'use strict';

    var service = new google.maps.places.PlacesService(map);

    infowindow = new google.maps.InfoWindow();

    service.nearbySearch({
        location: new google.maps.LatLng(lat, lng),
        radius: 1000,
        type: ["restaurant"]
    }, callback);

    service.nearbySearch({
        location: new google.maps.LatLng(lat, lng),
        radius: 1000,
        type: ["bank"]
    }, callback);

    service.nearbySearch({
        location: new google.maps.LatLng(lat, lng),
        radius: 1000,
        type: ["supermarket"]
    }, callback);

    service.nearbySearch({
        location: new google.maps.LatLng(lat, lng),
        radius: 1000,
        type: ["shopping_mall"]
    }, callback);
    
    service.nearbySearch({
        location: new google.maps.LatLng(lat, lng),
        radius: 1000,
        type: ["gas_station"]
    }, callback);
}

function initMap(location) {
    'use strict';

    var mapProp,
        lat,
        lng,
        marker,
        zoom;

    if (location !== "") {
        if (location === "eisenstadt") {
            lat = 47.829412;
            lng = 16.535053;
            zoom = 15;

        } else if (location === "pinkafeld") {
            lat = 47.362505;
            lng = 16.126811;
            zoom = 17;
        }

        mapProp = {
            center: new google.maps.LatLng(lat, lng),
            zoom: zoom
        };

        map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map
        });

        findPlaces(lat, lng);
    }
}

$(document).ready(function () {
    'use strict';

    var tabEisenstadt = document.getElementById("eisenstadt"),
        tabPinkafeld = document.getElementById("pinkafeld");

    if (tabEisenstadt.getAttribute("class") === "active") {
        initMap("eisenstadt");
    } else if (tabPinkafeld.getAttribute("class") === "active") {
        initMap("pinkafeld");
    }
});
