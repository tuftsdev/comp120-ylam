var map;
var myLatLng;
var shortestDistance = Infinity;
var carMarkers = [];
var cars;
var closestCar;

distance = (a, b) => (google.maps.geometry.spherical.computeDistanceBetween(a, b)/1609.344).toString();

function initMap() {
    navigator.geolocation.getCurrentPosition(myCoord => {
        myLatLng = new google.maps.LatLng({lat: myCoord.coords.latitude, lng: myCoord.coords.longitude});
        map = new google.maps.Map(document.getElementById("map"), {
            center: myLatLng,
            zoom: 2,
            minZoom: 1
        });

        const myMarker = new google.maps.Marker({
            position: myLatLng,
            map: map
        });

        request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                cars = JSON.parse(this.response);
                cars.map(car => {
                    d = google.maps.geometry.spherical.computeDistanceBetween(myLatLng, new google.maps.LatLng({lat: car['lat'], lng: car['lng']}));
                    if (d < shortestDistance) {
                        closestCar = car;
                        shortestDistance = d;
                    }
                    carMarkers.push(new google.maps.Marker({
                        position: {lat: car['lat'], lng: car['lng']},
                        map: map,
                        icon: "./car.png"
                    }));
                });
                carMarkers.map((marker, i) => {
                    google.maps.event.addListener(marker, 'click', function() {
                        d = distance(myLatLng, marker.getPosition());
                        car_infowindow = new google.maps.InfoWindow({
                            content: `<h2>Vehicle</h2><ul><li>username: ${cars[i]['username']}<li>ID: ${cars[i]['id']}<li>Distance: ${d} miles</ul>`
                        });
                        car_infowindow.open(map, marker);
                    });
                })
            }
        }
        request.open('POST', 'https://jordan-marsh.herokuapp.com/rides', true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send("username=JPgy9YNN&lat="+myCoord.coords.latitude+"&lng="+myCoord.coords.longitude);

        const infowindow = new google.maps.InfoWindow({
            content: "NA",
        });
        
        myMarker.addListener("click", () => {
            if (closestCar != undefined) {
                htmlContent = `<h2>Closest Vehicle</h2><ul><li>username: ${closestCar['username']}<li>ID: ${closestCar['id']}<li>Distance: ${(shortestDistance/1609.344).toString()} miles</ul>`;
                infowindow.setContent(htmlContent);

                const path = new google.maps.Polyline({
                    path: [myLatLng, {lat: closestCar['lat'], lng: closestCar['lng']}],
                    geodesic: true,
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                });
                path.setMap(map);
            }
            infowindow.open(map, myMarker);
        });
    });
    
}