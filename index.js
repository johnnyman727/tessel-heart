var Neopixels = require('neopixels'),
    animations = require('neopixel-animations'),
    ws = require('nodejs-websocket'),
    numPixels = 60,
    neopixels = new Neopixels(numPixels),
    prop = 0.0,
    port = 8000;


// Create the websocket server, provide connection callback
var server = ws.createServer(function (conn) {
  console.log("Accepted new connection...");

  // If get a binary stream is opened up
  conn.on("binary", function(stream) {
    // When we get data
    stream.on('data', function(data) {
      var data = data.toString().split(' ');
      var color = data[0];
      var prog = parseFloat(data[1])
      if (color) {
        animateProgressBar(color, prog);
      }
      else {
        console.log("Invalid Color Received", color);
      }
      
    });
  });

  conn.on("close", function (code, reason) {
      console.log("Connection closed")
  });
}).listen(port);

function animateProgressBar (color, progress) {
  neopixels.animate(numPixels, animations.progressBar(numPixels, color, progress));
};

console.log('listening on port', port);