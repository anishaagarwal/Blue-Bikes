// Vis 1: Daily trips in 2021
//Assign the specification to a local variable vlSpec.

var vlSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: { url: "./data.json" },
  width: 600,
  mark: "bar",
  encoding: {
    x: {
      timeUnit: "month",
      field: "Date",
      type: "temporal",
      title:"Days by Month (2021)",
    },
    y: {
      aggregate: "count",
      field: "Total Trips",
      type: "quantitative",
      title:"Total trips",
    },
  },
};

vegaEmbed("#vis1", vlSpec);

// Viz 2: Map locating availabilities of blurbird with no. of docks
//set the background map tiles and add to the map
const map = L.map("map").setView([42.3601, -71.0589], 8);
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
L.marker([42.3398, -71.0892])
  .addTo(map)
  .bindPopup("This is your school.<br>Northeastern University.");
var circle = L.circle([42.3398, -71.0892], {
  color: "#4A3BE1",
  fillColor: "#4A3BE1",
  fillOpacity: 0.5,
  radius: 500,
}).addTo(map);

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

    // create a new geojson layer and add the pointToLayer function, which will loop thru each feature in the data and return a circle marker
    let bikes = L.geoJSON(null, {
      onEachFeature: everyFeaturePopup,
      pointToLayer: function (feature, latlng) {
        if (feature.properties["District"] == "Cambridge") {
          geojsonMarkerOptions.fillColor = "blue";
        } else {
          geojsonMarkerOptions.fillColor = "orange";
        }

        if (feature.properties["Total docks"] > 20) {
          geojsonMarkerOptions.radius = 15;
        } else if (
          feature.properties["Total docks"] <= 20 &&
          feature.properties["Total docks"] > 12
        ) {
          geojsonMarkerOptions.radius = 10;
        } else {
          geojsonMarkerOptions.radius = 5;
        }

        // circle marker takes two args: position and styling
        return L.circleMarker(latlng, geojsonMarkerOptions);
      },
    });

    // circle marker takes two args: position and styling
    return L.circleMarker(latlng, geojsonMarkerOptions);
  },
});

// set the filename for the geojson
const url =
  "https://cdn.glitch.global/feedfe67-3b30-4f7e-bacb-65ee64aa7ecc/bikes.geojson?v=1667938381575";

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
