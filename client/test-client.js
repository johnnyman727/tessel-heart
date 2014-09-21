var ws = require("nodejs-websocket");
var port = 8000;

// Set the binary fragmentation to 1 byte so it instantly sends
// anything we write to it
ws.setBinaryFragmentation(1);

// When we get a connection (Put your Tessel's IP Address here!)
var connection = ws.connect('ws://192.168.7.197:' + port, function() {

  connection.on('text', function(data) {
    console.log('got some data', data);
  });

  var tesselHeart =
  { 
    set : {
      heart : {
        color : "green",
        pulse : 50,
      },
      traces : {
        1 : {
          color : "red",
          progress : 0.25,
        },
        2 : {
          color : "teal",
          progress : 1.0,
        },
        3 : {
          color : "magenta",
          progress : 0.75,
        }
      }
    },
  };

  connection.sendText(JSON.stringify(tesselHeart));

  setTimeout(function() {
    var packet = {
      get : {
        heart : true
      }
    }

    connection.sendText(JSON.stringify(packet));
  }, 1000);
});