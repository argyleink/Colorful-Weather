/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');

var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  body: 'Press any button.'
});

main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item: ' + e.section + ' ' + e.item);
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});

var req = new XMLHttpRequest();
req.open('GET', 'http://api.openweathermap.org/data/2.1/find/city?lat=37.830310&lon=-122.270831&cnt=1', true);
req.onload = function(e) {
  if (req.readyState == 4 && req.status == 200) {
    if (req.status == 200) {
      var response = JSON.parse(req.responseText);
      var temperature = response.list[0].main.temp;
      //var icon = response.list[0].main.icon;
      console.log(temperature);
      main.title = temperature + ' steps';
      // Pebble.sendAppMessage({ "icon":icon, "temperature":temperature + "\u00B0C"});
    } else { console.log("Error"); }
  }
};
req.send(null);