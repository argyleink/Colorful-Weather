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
    "I hope my anus and genitals roasting in this weather all day doesn't turn you off from giving me oral sex tonight.",
    "Holy shit, fuckin amazeballs."
  ],
  eighties: [
    "Fuck yeah. Today is a nice day bitches. Soak that shit up.",
    "Shit yeah, rock that sun baby.",
    "Fuck you, it's nice as balls out.",
    "Fuckin' A yo, shit’s gonna be alright.",
    "Fuck you cold days, today's nice.",
    "Holy shit, fuckin amazeballs."
  ],
  seventies: [
    "Wear whatever the fuck you want weather, fuck yeah.",
    "Meh. Fuck it.",
    "Fuckin A, it’s alright.",
    "Fuckin coo."
  ],
  sixties: [
    "Kinda shitty, but not too shitty. L'il shitty I guess.",
    "Fuck it outside. Decide a temperature bitch.",
    "Fuckin whatever. Fuck it.",
    "Could be shitier. Or is it shittier? Meh.",
    "Fuckin alright."
  ],
  fifties: [
    "Fuck this fuckin shit… but fuck, could be worse.",
    "L'il nippy out, give yours a quick rub so they stay happy.",
    "Shitty.",
    "Fuckin lame, again. Fuck.",
    "Doom and gloom bitch.",
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
    "Fetchin shit",
    "Wait bitch...",
    "Fuckin wait...",
    "Fuck again..."
  ]
};

var degrees = {
  c: '\u00B0C',
  f: '\u00B0F'
};

var UI = require('ui');
var ajax = require('ajax');
var Accel = require('ui/accel');
var Vibe = require('ui/vibe');
var Vector2 = require('vector2');
var Settings = require('settings');
var loading, report;

// Create a Card with title and subtitle
function showLoading() {
  loading = new UI.Window()
    .add(new UI.Text({
      position:         new Vector2(0, 50),
      size:             new Vector2(144, 30),
      font:             'gothic-24-bold',
      text:             MF.loading[getRandomInt(0,MF.loading.length - 1)],
      textAlign:        'center'
    }))
    .show();
}
showLoading();

// set options to default at fahrenheit
if (!Settings.data('degrees'))
  Settings.data('degrees', 'f');

// GPS and Weather
var locationOptions = { 
  "timeout": 2000, 
  "maximumAge": 60000 
} 

function locationSuccess(pos) {
  var coordinates = pos.coords;
  getWeather(coordinates.latitude, coordinates.longitude);
}

function locationError(err) {
  loading.text('GPS broke yo');
  console.warn('location error (' + err.code + '): ' + err.message);
}

function getWeather(latitude, longitude) {
  // Make the request
  ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?lat='+ latitude +'&lon=' + longitude,
      type: 'json'
    },
    function(data) {
      // Success!
      console.log("Successfully fetched the fucking weather data!");

      // for (var item in data)
      //   console.log(item + ' ' + data[item]);

      // Extract data
      var temperature;

      if (getUserDegreeSetting() === 'c') {
        temperature = Math.round(data.main.temp - 273.15);
      }
      else {
        temperature = convertToFahrenheit(Math.round(data.main.temp - 273.15));
      }

      determineCrassMessage(temperature, data.name);
    },
    function(error) {
      // Failure!
      loading.text('Fuckin failed.');
      console.log('Failed fetching weather data: ' + error);
    }
  );
}

function convertToFahrenheit(celsius) {
  return Math.round(celsius * 1.8) + 32;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function determineCrassMessage(temp, city) {
  var message;

  // TEST DATA: kinda for screenshots
  // temp = 46;
  // city = 'Portland';

  // IF F
  if (getUserDegreeSetting() === 'f') {
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
  }
  // ELSE C
  else {
    if (temp >= 38 && temp < 41)
      message = MF.hundreds[getRandomInt(0,MF.hundreds.length - 1)]
    else if (temp >= 32)
      message = MF.nineties[getRandomInt(0,MF.nineties.length - 1)]
    else if (temp >= 27)
      message = MF.eighties[getRandomInt(0,MF.eighties.length - 1)]
    else if (temp >= 21)
      message = MF.seventies[getRandomInt(0,MF.seventies.length - 1)]
    else if (temp >= 16)
      message = MF.sixties[getRandomInt(0,MF.sixties.length - 1)]
    else if (temp >= 10)
      message = MF.fifties[getRandomInt(0,MF.fifties.length - 1)]
    else if (temp >= 5)
      message = MF.fourties[getRandomInt(0,MF.fourties.length - 1)]
    else if (temp >= 0)
      message = MF.thirties[getRandomInt(0,MF.thirties.length - 1)]
    else if (temp >= -5)
      message = MF.twenties[getRandomInt(0,MF.twenties.length - 1)]
    else
      message = MF.crazies[getRandomInt(0,MF.crazies.length - 1)]
  }

  showWeather(temp, city, message);
}

function showWeather(temp, city, message) {
  Vibe.vibrate('short');

  report = new UI.Card({
    title:      'Fuckin ' + temp + degrees[getUserDegreeSetting()],
    subtitle:   'in ' + city + '...',
    body:       message,
    scrollable: true
  }).show();

  loading.hide();

  report.on('click', 'select', showSettings);
  report.on('accelTap', function(e) {
    showLoading();
    report.hide();
    init();
  });
}

// Settings
function showSettings() {
  var menu = new UI.Menu({
    sections: [{
      title: 'Degrees Setting:',
      items: [
        { title: degrees.f }, 
        { title: degrees.c }
      ]
    }]
  }).show();

  menu.on('select', function(e){
    switch(e.item) {
      case 0:
        Settings.data('degrees', 'f');
        break;
      case 1:
        Settings.data('degrees', 'c');
        break;
    }

    // reset card view to new degrees
    report.hide();
    showLoading();
    menu.hide();
    init();
  });
}

function getUserDegreeSetting() {
  return Settings.data('degrees');
}

// init by getting geo
function init() {
  window.navigator.geolocation.getCurrentPosition(
    locationSuccess, 
    locationError, 
    locationOptions
  );
}

init();

// Prepare the accelerometer
Accel.init();