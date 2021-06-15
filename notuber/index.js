var map;

function initMap() {
    navigator.geolocation.getCurrentPosition(myCoord => {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 42.352271, lng: -71.05524200000001 },
            zoom: 2,
        });

        const myLoc = new google.maps.Marker({
            position: {lat: myCoord.coords.latitude, lng: myCoord.coords.longitude},
            map: map
        });
        
        request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            console.log(request);
            if (this.readyState == 4 && this.status == 200) {
                JSON.parse(this.response).forEach(car => {
                    return new google.maps.Marker({
                        position: {lat: car['lat'], lng: car['lng']},
                        map: map,
                        icon: "./car.png"});
                });
            }
        }
        request.open('POST', 'https://jordan-marsh.herokuapp.com/rides', true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        console.log("username=JPgy9YNN&lat="+myCoord.coords.latitude+"&lng="+myCoord.coords.longitude);
        request.send("username=JPgy9YNN&lat="+myCoord.coords.latitude+"&lng="+myCoord.coords.longitude);    
    });
    
}