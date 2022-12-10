var express = require('express');
var ws = require('ws');
var app = express();

var clients = [""]
app.use(express.static(__dirname + '/client/'));

var server = app.listen(3000);

let encoder = new TextEncoder();
let decoder = new TextDecoder();
function decode_buffer(input) {
  return JSON.parse(decoder.decode(input)).data;
}
function send_to_ws(ws, message) {
  ws.send(encoder.encode(JSON.stringify({
    data: message
  })));
}
var ws_server = new ws.WebSocketServer({ server: server });
ws_server.on('connection', ws => {
  clients.push("Jake");
  ws.on('message', data => {
    let decoded = decode_buffer(data);
    //  console.log(decoded);
    //send_to_ws(ws, decoded);
    let splitdecoded = decoded.split(';');
    if (splitdecoded[0] == "N:") {
      clients.push(splitdecoded[1]);
      console.log(clients[clients.length - 1]);
      alert((clients[clients.length - 1]))
    }

    else if (splitdecoded[0] == "M:") {
      console.log(decoded);
      send_to_ws(ws, decoded);
    }
  });
});

/*

N:;usern
M:;usern1;usern2;message
H:;usern1;usern2;
Bob:Jack:"ehsjfnswj"



*/

