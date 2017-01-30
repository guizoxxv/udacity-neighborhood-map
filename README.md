# Udacity Neighborhood Map

This is a project from Udacity's Nanodegree program [Front-End Web Developer](https://udacity.com/course/front-end-web-developer-nanodegree--nd001/). The goal of this project is to develop a single page application featuring a map of your neighborhood or a neighborhood you would like to visit. You will then add functionality to this map including highlighted locations, third-party data about those locations and various ways to browse the content.

The application uses [Google Maps API](https://developers.google.com/maps/) to build the map, [Foursquare API](https://developer.foursquare.com/) to provide information about the venue and [Knockout](http://knockoutjs.com/) framework to provide a [MVVM](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel) pattern and handle information on the page subject to changing state.

## Run

The page application is [https://guizoxxv.github.io/udacity-neighborhood-map/](https://guizoxxv.github.io/udacity-neighborhood-map/).

When the page loads it should display a map with all computed markers and a list of all markers by the venue title. If there is a connection error with an API the browser will display an alert window.

If the user clicks on an marker or a item on the list the corresponding information window containing its title, address and link to site (if exists) will display on that marker and it will bounce.

The application also provides a text input in which the user can filter the markers so that only venues with corresponding title are displayed.
