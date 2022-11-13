const map = L.map("map").setView([42.3601, -71.0589], 8);

// set the background map tiles and add to the map
const tiles = L.tileLayer(
  "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
  }
);

// add tiles to the map
tiles.addTo(map);

// Add a tooltip when feature is clicked
function everyFeaturePopup(feature, layer) {
  var popupContent =
    "<h2>" +
    feature.properties["District"] +
    "</h2>" +
    "<p>" +
    feature.properties["Name"] +
    "</p>";

  layer.bindPopup(popupContent);
}

// // this is a marker that is added to Boston
// L.marker([42.3601, -71.0589]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')

// var circle = L.circle([42.3601, -71.0589], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map);
