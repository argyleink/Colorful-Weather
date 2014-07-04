var MF = {
  hundreds: [
    'Holy Balls! Your city is melting, get the fuck out. Find ice.',
    'Balls of fire! Hide yo kids, hide yo wives.'
  ],
  nineties: [
    'You must be almost naked, shit is hot out there.',
    'Everyone has a sweaty crotch right now. Sick.'
  ],
  eighties: [
    'Fuck yeah. Today is a nice day bitches. Soack that shit up.',
    'Shit yeah, rock that sun baby.'
  ],
  seventies: [
    'Wear whatever the fuck you want weather, fuck yeah.',
    'Meh.',
    'Calm and sunny, but the air is full of bullshit.'
  ],
  sixties: [
    'Kinda shitty, but not too shitty. L\'il shitty I guess.',
    'Fuck the sixties. Decide a heat damnit.'
  ],
  fifties: [
    'Shit could be worse',
    'L\'l nippy out, give yours a quick rub so they stay happy.'
  ],
  fourties: [
    'Cold as balls. Grab a double layer and some gloves homie.',
    'Cold as shit.',
    'Nuts be freezin, cup em if you got em.'
  ],
  thirties: [
    'Jesus dick I hope you\'re warm.',
    'Holy shit Batman, it\'s cold as shit out.'
  ],
  twenties: [
    'Cold as a witches tit.',
    'Cold as FUCK. GLHF.',
    'Cold as hell, damn!'
  ]
};

var UI        = require('ui')
  , Vector2   = require('vector2')
  , Vibe      = require('ui/vibe')
  , Ajax      = require('ajax');

// Loading Message
var loading = new UI.Window();
loading.add(new UI.Text({
  position:   new Vector2(0, 50),
  size:       new Vector2(144, 30),
  font:       'gothic-24-bold',
  text:       'Bitch wait...',
  textAlign:  'center'
}));
loading.show();

// GPS and Weather
function locationSuccess(pos) {
  var coordinates = pos.coords;
  fetchWeather(coordinates.latitude, coordinates.longitude);
}

function locationError(err) {
  textfield.text('GPS broke yo');
  console.warn('location error (' + err.code + '): ' + err.message);
}

var locationOptions = { "timeout": 15000, "maximumAge": 60000 }; 

function fetchWeather(latitude, longitude) {
  var temperature, city;

  // Ajax({
  //   url: 'http://api.openweathermap.org/data/2.1/find/city',
  //   data: {
  //     lat: latitude,
  //     lon: longitude,
  //     cnt: 1
  //   },
  //   type: 'json'
  // }, function(response){
  //   if (response && response.list && response.list.length > 0) {
  //     var weatherResult = response.list[0];

  //     temperature = convertToFahrenheit(Math.round(weatherResult.main.temp - 273.15));
  //     city = weatherResult.name;

  //     determineCrassMessage(temperature, city);
  //   }
  // }, function(error){
  //   textfield.text('API broke yo');
  //   console.warn(error.message);
  // });

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
  var card = new UI.Card({
    title:      'Fuckin ' + temp + "\u00B0F",
    subtitle:   'in ' + city + ';',
    body:       message,
    scrollable: true
  }).show();

  Vibe.vibrate('short');
  loading.hide();
}

// init by getting geo
window.navigator.geolocation.watchPosition(locationSuccess, locationError, locationOptions);