const map = L.map('map').setView([42.3601, -71.0589], 8);

    // set the background map tiles and add to the map
    const tiles= L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
    
    // add tiles to the map
    tiles.addTo(map);