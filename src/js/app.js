var MF = {
  hundreds: [
    'Holy Balls! Your city is melting, get the fuck out. Find ice.',
    'Hundreds 2'
  ],
  nineties: [
    'You must be almost naked, shit is hot out there.',
    'Nineties message 2'
  ],
  eighties: [
    'Fuck yeah. Today is a nice day bitches.',
    'Eighties message 2'
  ],
  seventies: [
    'Wear whatever the fuck you want weather, fuck yeah.',
    'Seventies message 2'
  ],
  sixties: [
    'Kinda shitty, but not too shitty. L\'il shitty I guess.',
    'Sixties message 2'
  ],
  fifties: [
    'Shit could be worse',
    'Fifties message 2'
  ],
  fourties: [
    'Fourties message 1',
    'Fourties message 2'
  ],
  thirties: [
    'thirties message 1',
    'thirties message 2'
  ],
  twenties: [
    'twenties message 1',
    'twenties message 2'
  ]
};

var UI = require('ui');
var Vector2 = require('vector2');

var textfield = new UI.Text({
  position:   new Vector2(0, 50),
  size:       new Vector2(144, 30),
  font:       'gothic-24-bold',
  text:       'Bitch wait...',
  textAlign:  'center'
});

var loading = new UI.Window();
loading.add(textfield);
loading.show();

function locationSuccess(pos) {
  var coordinates = pos.coords;
  fetchWeather(coordinates.latitude, coordinates.longitude);
}

function locationError(err) {
  console.warn('location error (' + err.code + '): ' + err.message);
  textfield.text('GPS broke yo');
}

var locationOptions = { "timeout": 15000, "maximumAge": 60000 }; 

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

          determineCrassMessage(temperature, city);
        }

      } else {
        console.log("Error");
      }
    }
  }
  req.send(null);
}

function convertToFahrenheit(celcius) {
  return Math.round(celcius * 1.8) + 32;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function determineCrassMessage(temp, city) {
  var message;

  if (temp >= 100 && temp < 105)
    message = MF.hundreds[getRandomInt(0,MF.hundreds.length - 1)]
  else if (temp >= 90)
    message = MF.nineties[getRandomInt(0,MF.nineties.length - 1)]
  else if (temp >= 80)
    message = MF.eighties[getRandomInt(0,MF.eighties.length - 1)]
  else if (temp >= 70)
    message = MF.seventies[getRandomInt(0,MF.seventies.length - 1)]
  else if (temp >= 60)
    message = MF.sixties[getRandomInt(0,MF.sixties.length - 1)]
  else if (temp >= 50)
    message = MF.fifties[getRandomInt(0,MF.fifties.length - 1)]
  else if (temp >= 40)
    message = MF.fourties[getRandomInt(0,MF.fourties.length - 1)]
  else if (temp >= 30)
    message = MF.thirties[getRandomInt(0,MF.thirties.length - 1)]
  else if (temp >= 20)
    message = MF.twenties[getRandomInt(0,MF.twenties.length - 1)]
  else
    message = 'Fuckin crazy, Armageddon shit.'

  showWeather(temp, city, message);
}

function showWeather(temp, city, message) {
  var card = new UI.Card();
  
  card.title('Fuckin ' + temp + "\u00B0F");
  card.subtitle('in ' + city + '...');
  card.body(message);
  
  card.show();
  loading.hide();
}

window.navigator.geolocation.watchPosition(locationSuccess, locationError, locationOptions);