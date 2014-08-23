var Neopixels = require('neopixels'),
    animations = require('neopixel-animations');
    numPixels = 60,
    neopixels = new Neopixels(numPixels),
    prop = 0.0;


var interval = setInterval(function() {

  prop += 0.02;

  animateProgressBar('red', prop);

  if (prop >= 1.00) clearInterval(interval);

}, 150);


function animateProgressBar (color, progress) {
  neopixels.animate(numPixels, animations.progressBar(numPixels, color, progress));
};