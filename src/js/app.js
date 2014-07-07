var MF = {
  hundreds: [
    "Holy balls! Your city is melting, get the fuck out.",
    "Hide yo kids, hide yo wives. It’s fuckin hot.",
    "Hot damn mutha fucka, find shade bitch.",
    "Ouch, shit’s hot outside. Nice day to stay inside.",
    "I hope you’re around A/C, otherwise you're dinner.",
    "Hotter than the mutha fuckin hinges of hell.",
    "Cuddle season is over. It's 'Get the hell away from me, it's hot as fuck' season.",
    "I hope my anus and genitals roasting in this weather all day doesn't turn you off from giving me oral sex tonight."
  ],
  nineties: [
    "You must be almost naked, shit is hot.",
    "Everyone has a sweaty crotch right now. Sick.",
    "Fuck you, fuck you, fuck you. Enjoy the sun ass hole.",
    "All dark places of the body are moist right now.",
    "As Dan would say, “shit’s fucked up.” That means it’s good.",
    "Cuddle season is over. It's 'Get the hell away from me, it's hot as fuck' season.",
    "I hope my anus and genitals roasting in this weather all day doesn't turn you off from giving me oral sex tonight."
  ],
  eighties: [
    "Fuck yeah. Today is a nice day bitches. Soak that shit up.",
    "Shit yeah, rock that sun baby.",
    "Fuck you, I love 80’s.",
    "Fuckin A yo, shit’s gonna be alright.",
    "Fuck you cold days, today’s nice."
  ],
  seventies: [
    "Wear whatever the fuck you want weather, fuck yeah.",
    "Meh. Fuck it.",
    "Fuckin A, it’s alright."
  ],
  sixties: [
    "Kinda shitty, but not too shitty. L'il shitty I guess.",
    "Fuck the sixties. Decide a heat damnit.",
    "Fuckin whatever. Fuck it.",
    "Could be shitier."
  ],
  fifties: [
    "Fuck this fuckin 50’s… but shit could be worse.",
    "L'il nippy out, give yours a quick rub so they stay happy.",
    "Shitty.",
    "Fuckin 50’s, again. Fuck.",
    "Fuck my life, 50’s.",
    "Fuckin moisture convergence."
  ],
  fourties: [
    "Cold as balls. Grab a double layer and some gloves homie.",
    "Cold as shit.",
    "Nuts be freezin, cup em if you got em.",
    "Fuckin shitty bro."
  ],
  thirties: [
    "Jesus dick I hope you're warm.",
    "Holy shit Batman, it's cold as shit out.",
    "Shitty as fuck, fuckin shitty, SHIT FUCK.",
    "You be chillin. Got icicles on your butt hole."
  ],
  twenties: [
    "Cold as a witches tit.",
    "Cold as FUCK. GLHF.",
    "Cold as hell, damn!",
    "F-f-f-f-f-f-u-u-u-u-c-c-c-k-k-k-k- k-k-k k-k-k-k-k.",
    "So cold you need a sock for your dick, or it might freeze off."
  ],
  crazies: [
    "Fuckin crazy, Armageddon shit. Check your fuckin bucket list.",
    "Game over.",
    "Why the fuck are you wherever the fuck you are, holy shit mang, damn!"
  ],
  loading: [
    "Bitch wait...",
    "Wait mofo...",
    "Wait sucka...",
    "Fuckin wait...",
    "Fuck again..."
  ]
};

var UI        = require('ui')
  , Vector2   = require('vector2')
  // , Ajax      = require('ajax')
  , Vibe      = require('ui/vibe');

// Loading Message
var loading = new UI.Window();
loading.add(new UI.Text({
  position:         new Vector2(0, 50),
  size:             new Vector2(144, 30),
  font:             'gothic-24-bold',
  text:             MF.loading[getRandomInt(0,MF.loading.length - 1)],
  textAlign:        'center'
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
  // temp = 46;
  // city = 'Portland';

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
    message = MF.crazies[getRandomInt(0,MF.crazies.length - 1)]

  showWeather(temp, city, message);
}

function showWeather(temp, city, message) {
  if (city.length > 12) city = city.substr(0,10) + '..';

  var card = new UI.Card({
    title:      'Fuckin ' + temp + "\u00B0F",
    subtitle:   'in ' + city,
    body:       message,
    scrollable: true
  }).show();

  Vibe.vibrate('short');
  loading.hide();
}

// init by getting geo
window.navigator.geolocation.watchPosition(locationSuccess, locationError, locationOptions);