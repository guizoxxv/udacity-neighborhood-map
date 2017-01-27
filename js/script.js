// Markers data array
var markersDataArray = [
  {title: 'Museu do Amanhã', lat: -22.8939768, lng: -43.1794345, id: '56741ea6498e999035b89e4c'}, // id is the venue id on Foursquare
  {title: 'Museu Histórico Nacional', lat: -22.9059083, lng: -43.169513, id: '4b058724f964a520f08122e3'},
  {title: 'Museu de Arte do Rio', lat: -22.8967084, lng: -43.1820523, id: '503518cce4b0a2d03dc424b4'},
  {title: 'Museu Nacional De Belas Artes', lat: -22.90876, lng: -43.1757007, id: '4b058724f964a520ee8122e3'},
  {title: 'Museu de Arte Moderna', lat: -22.9136983, lng: -43.1718009, id: '4cd6b75f89eb6dcb75e8301e'}
];

// Function to create a map on div #map
function initMap() {

  // Instantiate Google Maps Map object
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -22.8967084, lng: -43.1820523},
    zoom: 14
  });

  // Apply Knockout bindings on viewModel
  ko.applyBindings(new viewModel());
}

// Function if error with Google API
function googleAPIError() {
  alert('Fail to connect to Google API.');
}

// Marker object function
function markerObj(data) {
  var self = this;

  this.title = ko.observable(data.title);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);
  this.id = ko.observable(data.id);

  // Foursquare API variables
  this.url = ko.observable('');
  this.address = ko.observable('');

  // Instantiate Google Maps Marker object
  this.marker = new google.maps.Marker({
    position: new google.maps.LatLng(data.lat, data.lng),
    map: map,
    title: data.title,
    animation: google.maps.Animation.DROP
  });

  // Display marker on map
  this.marker.setMap(map);

  // Variable with string URL parameters client_id, client_secret, v. v is a date [YYYYMMDD]
  var urlEnd = '?client_id=ZVNQAZSRDX5KKD4MMK1Z2GWGIXWN5EKAAQHFVQWDNDALL3Q3&client_secret=IT34CTIXJ4GJB0BXQIS4VT1IODEV4CKK5NVKOZMHXCP2OXRY&v=20170126';

  // AJAX request to FOURSQUARE using jQuery
  $.ajax({
    url: 'https://api.foursquare.com/v2/venues/' + data.id + urlEnd,
      dataType: "json",
      success: function(data) { // If request is successfull

        // Get requested data
        var results = data.response.venue;
        // console.log(results);

        // Set desired data into variables
    		self.url = results.url;
    		self.address = results.location.formattedAddress[0] + ' - ' + results.location.formattedAddress[1]; // formattedAddress[0] is street and [2] city, state
      },
      error: function() { // If request fails
        alert('Fail to connect to Foursquare API.');
      }
  });

  // Instantiate Google Maps InfoWindow object
  this.infoWindow = new google.maps.InfoWindow();

  // Click event handler if marker is clicked
  this.marker.addListener('click', function() {

    // Google Maps API info window content
    self.infoWindowContent = '<div><strong>' + data.title + '</strong></div>' +
                             '<div>' + self.address + '</div>' +
                             '<div><a href="' + self.url + '" target="_blank">' + self.url + '</a></div>';

    // Set infoWindowContent as above content
    self.infoWindow.setContent(self.infoWindowContent);

    // Open corresponding infoWindow
    self.infoWindow.open(map, this);

    // Animate clicked marker
    self.marker.setAnimation(google.maps.Animation.BOUNCE);

    // Set time for animation end
    setTimeout(function() {
        self.marker.setAnimation(null);
    }, 700);
  });

  // Click event listener on .markers-list li
  this.listClick = function(data) {
    google.maps.event.trigger(this.marker, 'click');
  };
}

// View Model
function viewModel() {
  var self = this;

  // Markers objects array
  this.markersArray = ko.observableArray([]);

  // Loop to fill above array using push() method
  markersDataArray.forEach(function(data) {
    self.markersArray.push(new markerObj(data));
  });

  // Visible markers objects array
  this.visibleMarkersArray = ko.observableArray([]);

  // Loop to fill above array using push() method
  this.markersArray().forEach(function(data) {
    self.visibleMarkersArray.push(data);
  });

  // Declare variable userInput
  this.userInput = ko.observable('');

  // Function to filter markers based on user input
  this.filter = function() {

    // Declare input variable with lowercase user input string
    var input = self.userInput().toLowerCase();
    // console.log(input);

    // Remove data from visibleMarkersArray at first
    self.visibleMarkersArray.removeAll();

    // Loop throgh markersArray
    self.markersArray().forEach(function(data) {
      // console.log(data.title());
      // console.log(data.title().toLowerCase().includes(input));

      // Compare titles with user input
      if(data.title().toLowerCase().includes(input) === true) {

        // Add match to visibleMarkersArray
        self.visibleMarkersArray.push(data);
      } else {

        // Set marker to not visible
        data.marker.setVisible(false);
      }
    });

    // Loop throgh visibleMarkersArray
    self.visibleMarkersArray().forEach(function(data) {

      // Set marker to visible
      data.marker.setVisible(true);
    });
  };

}
