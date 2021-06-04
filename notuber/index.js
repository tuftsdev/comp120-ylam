let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 42.352271, lng: -71.05524200000001 },
    zoom: 10,
  });
}

function loadCar() {
    x = 42.352271;
    y = -71.05524200000001;
    jsonData = '[{"id":"mXfkjrFw", "lat": 42.3453, "long": -71.0464},\
    {"id":"nZXB8ZHz", "lat": 42.3662, "long": -71.0621},\
    {"id":"Tkwu74WC", "lat": 42.3603, "long": -71.0547},\
    {"id":"5KWpnAJN", "lat": 42.3472, "long": -71.0802},\
    {"id":"uf5ZrXYw", "lat": 42.3663, "long": -71.0544},\
    {"id":"VMerzMH8", "lat": 42.3542, "long": -71.0704}]';
    JSON.parse(jsonData).forEach(car => {
        div = document.createElement("div");
        div.id = "car";
        document.getElementById("map").append(div);
    });
    
}