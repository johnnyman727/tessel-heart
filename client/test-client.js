var ws = require("nodejs-websocket");
var port = 8000;

// Set the binary fragmentation to 1 byte so it instantly sends
// anything we write to it
ws.setBinaryFragmentation(1);

// When we get a connection (Put your Tessel's IP Address here!)
var connection = ws.connect('ws://192.168.128.205:' + port, function() {
  process.stdin.pipe(connection.beginBinary());
});