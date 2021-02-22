/* Credits: Source Code for google map JavaScript API https://developers.google.com/maps/documentation/javascript/overview */
function initMap() {
    // Map options
    var options = {
        zoom: 8,
        center: { lat: 51.5074, lng: 0.1279 },
    };

    //New Map
    var map = new
        google.maps.Map(document.getElementById('map'), options);

    // Add Marker
    var marker = new google.maps.Marker({
        position: { lat: 51.5028, lng: 0.0877 },
        map: map,
        icon: 'https://img.icons8.com/plasticine/50/000000/marijuana-leaf.png'
    });

    // Add infoWindow
    var contentString = '<div id="content"><h1>Quizijuana</h1><p>Quizjuana is ' +
        'your online guide to learn about marijuana, find marijuana strains and products, and source them from legal,' +
        'licensed retailers.</p></div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
}
