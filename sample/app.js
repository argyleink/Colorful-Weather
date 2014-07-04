var UI = require('ui');
var Vector2 = require('vector2');

var wind = new UI.Window();
var textfield = new UI.Text({
  position:   new Vector2(0, 50),
  size:       new Vector2(144, 30),
  font:       'gothic-24-bold',
  text:       'Wait bitch...',
  textAlign:  'center'
});
wind.add(textfield);
wind.show();

function locationSuccess(pos) {
  var coordinates = pos.coords;
  console.log(pos.coords);
  // fetchWeather(coordinates.latitude, coordinates.longitude);
}

function locationError(err) {
  console.warn('location error (' + err.code + '): ' + err.message);
  Pebble.sendAppMessage({
    "city":"Loc Unavailable",
    "temperature":"N/A"
  });
}

var locationOptions = { "timeout": 15000, "maximumAge": 60000 }; 

Pebble.addEventListener("ready", function(e) {
  console.log("connect!" + e.ready);
  locationWatcher = window.navigator.geolocation.watchPosition(locationSuccess, locationError, locationOptions);
  console.log(e.type);
});