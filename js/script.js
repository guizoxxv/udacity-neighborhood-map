var map;

// Markers array
var markers = [];

// function to create a map on div #map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -22.8967084, lng: -43.1820523},
    zoom: 13
  });

  // Markers data
  var locations = [
    {title: 'Museu do Amanhã', location: {lat: -22.8939768, lng: -43.1794345}},
    {title: 'Museu Histórico Nacional', location: {lat: -22.9059083, lng: -43.169513}},
    {title: 'Museu de Arte do Rio', location: {lat: -22.8967084, lng: -43.1820523}},
    {title: 'Museu Nacional De Belas Artes', location: {lat: -22.90876, lng: -43.1757007}},
    {title: 'Museu de Arte Moderna', location: {lat: -22.9136983, lng: -43.1718009}}
  ];

  // Info window displayed when marker is clicked
  var largeInfowindow = new google.maps.InfoWindow();

  // Loop to create an array of markers
  for (var i = 0; i < locations.length; i++) {
    var position = locations[i].location;
    var title = locations[i].title;
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });

    // Add current marker to markers array using push() method
    markers.push(marker);

    // Add click event listener on each marker that triggers function populateInfoWindow
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
  }

  // Event listeners for hide and show markers buttons
  document.getElementById('show-markers').addEventListener('click', showMarkers);
  document.getElementById('hide-markers').addEventListener('click', hideMarkers);

  // Run function showMarkers when map is loaded
  showMarkers();
}

// Function that runs when marker is clicked. It fills the infowindow with data that is displayed on click
function populateInfoWindow(marker, infowindow) {

  // Check to make sure the infowindow is not already opened on this marker
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);

    // Make sure the marker property is cleared if the infowindow is closed
    infowindow.addListener('closeclick', function(){
      infowindow.setMarker(null);
    });
  }
}

// Function to loop through the markers array and display them all
function showMarkers() {

  // Boundaries of the map
  var bounds = new google.maps.LatLngBounds();

  // Display each marker and extend the boundaries of the map for each marker
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }

  // Make the map fit into boundaries
  map.fitBounds(bounds);
}

// Function to loop through the markers array and hide them all
function hideMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

var viewModel = function() {
  var self = this;

  // Markers titles array
  this.title = ko.observableArray(['Museu de Arte do Rio', 'Museu de Arte Moderna', 'Museu do Amanhã', 'Museu Histórico Nacional', 'Museu Nacional de Belas Artes']);
};

// Testing knockout bindings
// var ClickCounterViewModel = function() {
//   this.numberOfClicks = ko.observable(0);
//
//   this.registerClick = function() {
//     this.numberOfClicks(this.numberOfClicks() + 1);
//   };
// };

// ko.applyBindings(new ClickCounterViewModel());
ko.applyBindings(new viewModel());
