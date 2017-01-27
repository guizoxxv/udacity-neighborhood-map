var map; // necessary?

// Markers data array
var markersDataArray = [
  {title: 'Museu do Amanhã', lat: -22.8939768, lng: -43.1794345},
  {title: 'Museu Histórico Nacional', lat: -22.9059083, lng: -43.169513},
  {title: 'Museu de Arte do Rio', lat: -22.8967084, lng: -43.1820523},
  {title: 'Museu Nacional De Belas Artes', lat: -22.90876, lng: -43.1757007},
  {title: 'Museu de Arte Moderna', lat: -22.9136983, lng: -43.1718009}
];

// Function to create a map on div #map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -22.8967084, lng: -43.1820523},
    zoom: 14
  });

  // Apply Knockout bindings on viewModel
  ko.applyBindings(new viewModel());
}

function initMarker(data) {
  var self = this;

  this.title = ko.observable(data.title);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);
  this.marker = new google.maps.Marker({
    position: new google.maps.LatLng(data.lat, data.lng),
    map: map,
    title: data.title,
    animation: google.maps.Animation.DROP
  });
  this.marker.setMap(map);
  this.infoWindowContent = '<div>' + data.title + '</div>';
  this.infoWindow = new google.maps.InfoWindow();
  this.infoWindow.setContent(self.infoWindowContent);

  this.marker.addListener('click', function() {
    self.infoWindowContent = '<div>' + data.title + '</div>';
    self.infoWindow.setContent(self.infoWindowContent);
    self.infoWindow.open(map, this);
    self.marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
        self.marker.setAnimation(null);
    }, 700);
  });

  this.animate = function(data) {
    google.maps.event.trigger(self.marker, 'click');
  };
}

/***** VIEW MODEL *****/
function viewModel() {
  var self = this;

  // Markers objects array
  this.markersArray = ko.observableArray([]);

  // Loop to fill above array using push() method
  markersDataArray.forEach(function(data) {
    self.markersArray.push(new initMarker(data));
  });
}

/***** JQUERY *****/
$(document).ready(function() {

  // Make the value on .markers-select to empty on page load
  $('.markers-select').val('');
});
