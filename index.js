var Neopixels = require('neopixels'),
    animations = require('neopixel-animations'),
    ws = require('nodejs-websocket'),
    numPixels = 60,
    neopixels = new Neopixels(numPixels),
    port = 8000,
    _heart = {},
    _traces = {};

// Create the websocket server, provide connection callback
var server = ws.createServer(function (conn) {
  console.log("Accepted new connection...");

  // When we get a new state
  conn.on("text", function(data) {
    // Gather the JSON state
    var incoming = JSON.parse(data);

    console.log('got this incoming data', incoming);
    // 
    if (incoming.set) {

      // Animate the pulsating heart
      animateTesselHeart(incoming.set.heart);

      // Animate the progress traces 
      // animateTesselTraces(incoming.set.traces);

    }

    if (incoming.get) {

      var packet = {};

      if (incoming.get.heart) {

        packet.heart = _heart;
      }

      if (incoming.get.traces) {

        packet.traces = _traces;
      }

      conn.sendText(JSON.stringify(packet));
    } 
  });

  conn.on('binary', function(stream) {
    stream.on('data', function(data) {
      neopixels.animate(numPixels, data);
    })
  });

  conn.on("close", function (code, reason) {
    console.log("Connection closed")
  });

}).listen(port);

function animateTesselHeart(heart) {
  if (!heart) return;
  console.log('setting ', heart);
  _heart = heart;

  neopixels.animate(numPixels, animations.pulse(heart.color, heart.pulse));
}

function animateTesselTraces(traces) {
  if (!traces) return;
  console.log('setting traces');
  _traces = traces;

  var buffer = new Buffer(0);
  var numTraces = Object.keys(traces).length;
  var traceLength = numPixels/numTraces;
  var animationArr = [];
  for (trace in traces) {
    animationArr.push(animations.progressBar(traceLength, traces[trace].color, traces[trace].progress, "white"));
  }

  neopixels.animate(numPixels, Buffer.concat(animationArr));
}

console.log('listening on port', port);