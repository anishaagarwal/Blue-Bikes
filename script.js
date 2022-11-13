const map = L.map("map").setView([42.3601, -71.0589], 8);

// set the background map tiles and add to the map
const tiles = L.tileLayer(
  "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
  {
    maxZoom: 30,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
  }
);

// add tiles to the map
tiles.addTo(map);

// add a tooltip when feature is clicked mentioning districk, station name and no. of docks
function everyFeaturePopup(feature, layer) {
  var popupContent =
    "<h2>" +
    feature.properties["District"] +
    "</h2>" +
    "<p>" +
    feature.properties["Name"] +
    "</p>" +
    "<p>" +
    feature.properties["Total docks"] +
    " docks" +
    "</p>";

  layer.bindPopup(popupContent);
}

// style object applies to all markers
const geojsonMarkerOptions = {
  radius: 3,
  fillColor: "#1C428A",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.9,
};

// create a new geojson layer and add the tooltip function
// also add the pointToLayer function, which will loop through each feature in the data and return a circle marker
let bikes = L.geoJSON(null, {
  onEachFeature: everyFeaturePopup,
  pointToLayer: function (feature, latlng) {
    if (feature.properties["Total docks"] > 20) {
      geojsonMarkerOptions.radius = 15;
    } else if (
      feature.properties["Total docks"] <= 20 &&
      feature.properties["Total docks"] > 15
    ) {
      geojsonMarkerOptions.radius = 12;
    } else if (
      feature.properties["Total docks"] <= 15 &&
      feature.properties["Total docks"] > 10
    ) {
      geojsonMarkerOptions.radius = 9;
    } else if (
      feature.properties["Total docks"] <= 10 &&
      feature.properties["Total docks"] > 5
    ) {
      geojsonMarkerOptions.radius = 6;
    } else {
      geojsonMarkerOptions.radius = 3;
    }

    // circle marker takes two args: position and styling
    return L.circleMarker(latlng, geojsonMarkerOptions);
  },
});

// set the filename for the geojson
const url =
  "/current_bluebikes";

// Get GeoJSON data using jQuery and create features.
// then attach the data to the variable we created above
$.getJSON(url, function (dataFromJson) {
  bikes.addData(dataFromJson);
});

// add features to the map
bikes.addTo(map);

// // this is a marker that is added to Boston
// L.marker([42.3601, -71.0589]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')

// var circle = L.circle([42.3601, -71.0589], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map);
