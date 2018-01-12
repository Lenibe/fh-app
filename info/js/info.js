/*global document, window, navigator, alert*/

function getCurrentLocation() {
    'use strict';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            currentPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            //console.log('Jetzt ist position bekannt');
        });
    } else {
        alert("GEHT IN DEM BROWSER NICHT")
    }
}

var currentPos = false; //User Position
getCurrentLocation();

function initMap() {
    'use strict';

    //Funktion zum initialisieren der Map
    //Packages für Routenplaner
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    //Karte initialisieren
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16, //zoom für Karte
        center: {
            lat: 47.829412,
            lng: 16.535053
        } //Karten Mittelpunkt
    });
    //zeige Karte
    directionsDisplay.setMap(map);

    // setze marker auf Karte
    var markerFH = new google.maps.Marker({
        position: {
            lat: 47.829235,
            lng: 16.535220
        },
        map: map,
        title: 'Fachhochschulstudiengänge'
    });
    //Bereite info window vor für click
    var infoWindowFH = new google.maps.InfoWindow({
        content: 'Fachhochschulstudiengänge'
    });
    //lege click event auf marker
    markerFH.addListener('click', function () {
        //Zeige info window an auf map über Marker
        infoWindowFH.open(map, markerFH);
        //Zeige Route an wenn userPosition bekannt ist!
        if (currentPos) {
            calculateAndDisplayRoute(directionsService, directionsDisplay, {
                lat: 47.829235,
                lng: 16.535220
            })
        }
    });

    // setze marker auf Karte
    var markerMC = new google.maps.Marker({
        position: {
            lat: 47.828495,
            lng: 16.531519
        },
        map: map,
        title: 'McDonald\'s Eisenstadt'
    });
    //Bereite info window vor für click
    var infoWindowMC = new google.maps.InfoWindow({
        content: 'McDonald\'s Eisenstadt'
    });
    //lege click event auf marker
    markerMC.addListener('click', function () {
        //Zeige info window an auf map über Marker
        infoWindowMC.open(map, markerMC);
        //Zeige Route an wenn userPosition bekannt ist!
        if (currentPos) {
            calculateAndDisplayRoute(directionsService, directionsDisplay, {
                lat: 47.828495,
                lng: 16.531519
            })
        }
    });


    var markerBistro = new google.maps.Marker({
        position: {
            lat: 47.830372,
            lng: 16.532066
        },
        map: map,
        title: 'Stefan\'s Eisenstadt'
    });
    //Bereite info window vor für click
    var infoWindowBistro = new google.maps.InfoWindow({
        content: 'Stefan\'s Bistro Eisenstadt'
    });
    //lege click event auf marker
    markerBistro.addListener('click', function () {
        //Zeige info window an auf map über Marker
        infoWindowBistro.open(map, markerBistro);
        //Zeige Route an wenn userPosition bekannt ist!
        if (currentPos) {
            calculateAndDisplayRoute(directionsService, directionsDisplay, {
                lat: 47.830372,
                lng: 16.532066
            })
        }
    });

    var markerRestaurantZapfel = new google.maps.Marker({
        position: {
            lat: 47.362337,
            lng: 16.125756
        },
        map: map,
        title: 'Restaurant Zapfel Pinkafeldt'
    });
    //Bereite info window vor für click
    var infoWindowRestaurantZapfel = new google.maps.InfoWindow({
        content: 'Restaurant Zapfel Pinkafeld'
    });
    //lege click event auf marker
    markerRestaurantZapfel.addListener('click', function () {
        //Zeige info window an auf map über Marker
        infoWindowRestaurantZapfel.open(map, markerRestaurantZapfel);
        //Zeige Route an wenn userPosition bekannt ist!
        if (currentPos) {
            calculateAndDisplayRoute(directionsService, directionsDisplay, {
                lat: 47.362337,
                lng: 16.125756
            })
        }
    });


    //Clickhandler um nach Eisenstadt zu springen
    var clickHandlerEisenstadt = function (arg) {
        pos = {
            lat: 47.829412,
            lng: 16.535053
        };
        map.setCenter(pos);
    }

    //Clickhandler um nach Pinkafeld zu springen
    var clickHandlerPinkafeld = function (arg) {
        pos = {
            lat: 47.373866,
            lng: 16.125270
        };
        map.setCenter(pos);
    }

    //Binde Clickhandler an Buttons
    document.getElementById('eisenstadt').addEventListener('click', clickHandlerEisenstadt);
    document.getElementById('pinkafeld').addEventListener('click', clickHandlerPinkafeld);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, destination) {
    console.log(currentPos);
    directionsService.route({
        origin: currentPos,
        destination: destination,
        travelMode: 'WALKING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
