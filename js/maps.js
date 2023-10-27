var map;
var searchBox;

function initializeMap() {
    // Configurar el mapa
    var mapOptions = {
        center: { lat: 0, lng: 0 },
        zoom: 10
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Configurar el cuadro de búsqueda de direcciones
    searchBox = new google.maps.places.SearchBox(document.getElementById('search-box'));

    // Conectar el cuadro de búsqueda con el mapa
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('search-box'));
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    // Escuchar los resultados de búsqueda
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length === 0) {
            return;
        }

        // Mover el mapa al resultado de búsqueda
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

google.maps.event.addDomListener(window, 'load', initializeMap);
