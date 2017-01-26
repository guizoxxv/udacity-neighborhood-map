var map; // necessary?

// Markers data array
var markersDataArray = [
  {title: 'Museu do Amanhã', location: {lat: -22.8939768, lng: -43.1794345}},
  {title: 'Museu Histórico Nacional', location: {lat: -22.9059083, lng: -43.169513}},
  {title: 'Museu de Arte do Rio', location: {lat: -22.8967084, lng: -43.1820523}},
  {title: 'Museu Nacional De Belas Artes', location: {lat: -22.90876, lng: -43.1757007}},
  {title: 'Museu de Arte Moderna', location: {lat: -22.9136983, lng: -43.1718009}}
];

// Function to create a map on div #map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -22.8967084, lng: -43.1820523},
    zoom: 13
  });

  // Apply Knockout bindings on viewModel
  ko.applyBindings(new viewModel());
}

function knockoutMarker(data) {
  this.title = ko.observable(data.title);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);
}

/***** VIEW MODEL *****/
function viewModel() {
  var self = this;

  // Markers array
  var markersArray = [];

  // Array to receive markersDataArray titles
  this.titleArray = ko.observableArray([]);

  // Loop to fill above array using push() method
  markersDataArray.forEach(function(marker) {
    self.titleArray.push(new knockoutMarker(marker));
  });

  // Info window displayed when marker is clicked
  var infoWindow = new google.maps.InfoWindow();

  // Boundaries of the map
  var bounds = new google.maps.LatLngBounds();

  // Loop to create an array of markers
  for(var i = 0; i < markersDataArray.length; i++) {
    var position = markersDataArray[i].location;
    var title = markersDataArray[i].title;
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP
    });

    // Add current marker to markers array using push() method
    markersArray.push(marker);

    // Extend the boundaries of the map for each marker
    bounds.extend(marker.position);

    // Add click event listener on each marker that triggers function fillInfoWindow
    marker.addListener('click', function() {
      showInfo(this, infoWindow);
    });

  }

  // Make the map fit into boundaries
  map.fitBounds(bounds);

  // Function that runs when marker is clicked. It fills the infowindow with data that is displayed on click
  function showInfo(marker, infowindow) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
  }

  /***** JQUERY *****/
  $(document).ready(function() {

    // Make the value on .markers-select to empty on page load
    $('.markers-select').val('');

    // Click event handler for .markers-list li
    $(document).on('click', '.markers-list li', function() {

      // Run function showInfo with according to the text on the clicked li
      if($(this).text() == 'Museu do Amanhã') {
        showInfo(markersArray[0], infoWindow);
      }

    });

  });

}
