//  let mapToken = mapToken;
	mapboxgl.accessToken = mapToken;
       const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: [77.216721, 28.644800], // starting position [lng, lat]
        zoom: 9 // starting zoom
});
