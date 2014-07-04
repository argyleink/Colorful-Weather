var UI = require('ui');
var Vector2 = require('vector2');

var textfield = new UI.Text({
  position:   new Vector2(0, 50),
  size:       new Vector2(144, 30),
  font:       'gothic-24-bold',
  text:       'Bitch wait...',
  textAlign:  'center'
});

var wind = new UI.Window();
wind.add(textfield);
wind.show();

function locationSuccess(pos) {
  var coordinates = pos.coords;
  fetchWeather(coordinates.latitude, coordinates.longitude);
}

function locationError(err) {
  console.warn('location error (' + err.code + '): ' + err.message);
  textfield.text('GPS broke yo');
}

var locationOptions = { "timeout": 15000, "maximumAge": 60000 }; 

window.navigator.geolocation.watchPosition(locationSuccess, locationError, locationOptions);

function fetchWeather(latitude, longitude) {
  var response, temperature, city;
  var req = new XMLHttpRequest();
  req.open('GET', "http://api.openweathermap.org/data/2.1/find/city?" + "lat=" + latitude + "&lon=" + longitude + "&cnt=1", true);

  req.onload = function(e) {
    if (req.readyState == 4) {
      if(req.status == 200) {
        response = JSON.parse(req.responseText);

        if (response && response.list && response.list.length > 0) {
          var weatherResult = response.list[0];

          temperature = convertToFahrenheit(Math.round(weatherResult.main.temp - 273.15));
          city = weatherResult.name;

          console.log(temperature);
          console.log(city);
          textfield.text('It is ' + temperature + "\u00B0F" + ' in ' + city);
        }

      } else {
        console.log("Error");
      }
    }
  }
  req.send(null);
}

function convertToFahrenheit(celcius) {
  return celcius * 1.8 + 32;
}