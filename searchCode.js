// added map
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.2555, lng: -76.7113},
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
var input = document.getElementById('searchBox');
  var searchBox = new google.maps.places.SearchBox(input);

// check for bounds to change and sets the bounds
// based on search result
map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

// stores the location markers we add
var markers = [];

// below is the listener for the searchBox
searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    console.log(places[0]);
    var placeDiv = document.getElementById('placeInfo');
    placeDiv.innerHTML = places[0]['formatted_address'] + "<br>";
    
    var photos = places[0]['photos'];
    
    console.log(typeof photos);
    
    try{
        for(var i = 0; i < photos.length; i++){
            var photoUrl = photos[i].getUrl({'maxWidth': 200, 'maxHeight': 200});
            var imgStr = "<img src='"+ photoUrl +"' alt='image'>";
            placeDiv.innerHTML += imgStr;
        }
        var reviews = places[0]['reviews'];
        console.log(reviews);
        placeDiv.innerHTML += "<br><ol class='smallerText'>";
        for(var index in reviews){

            placeDiv.innerHTML += "<li>" + reviews[index]["text"] + "</li>";
            
        }
        placeDiv.innerHTML += "</ol>";
    }catch(err){
        placeDiv.innerHTML += "Sorry No Images!";
    }
    if (places.length == 0) {
      return;
    }
    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];
    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    
});
    
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

}
