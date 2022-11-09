const map = L.map('map').setView([42.3601, -71.0589], 8);

    // set the background map tiles and add to the map
    const tiles= L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
    
    // add tiles to the map
    tiles.addTo(map);

// this is a marker that is added to Boston
L.marker([42.3601, -71.0589]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')

var circle = L.circle([42.3601, -71.0589], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);