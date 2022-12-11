var express = require('express');
var ws = require('ws');
var app = express();

var ws_list = [];
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

function rewrite_template(decoded) {
  let splitdecoded = decoded.split(';');
  for (let i = 0; i < ws_list.length; i++) {

    send_to_ws(ws_list[i], decoded);
  }

  /*
  1) Do send_to+ws(ws:make a list of ws a iteratarte) 
  2) Try to change index.html from here
  */
}

var ws_server = new ws.WebSocketServer({ server: server });
ws_server.on('connection', ws => {
  if (!ws_list.includes(ws)) ws_list.push(ws);
  clients.push("Jake");
  ws.on('message', data => {
    let decoded = decode_buffer(data);
    console.log(decoded);
    let splitdecoded = decoded.split(';');
    if (splitdecoded[0] == "N:") {
      clients.push(splitdecoded[1]);
      console.log(clients[clients.length - 1]);
      alert((clients[clients.length - 1]))
    }

    else if (splitdecoded[0] == "M:" || splitdecoded[0] == "H:" || splitdecoded[0] == "HR:") {
      rewrite_template(decoded);
    }
  });


});

/*

N:;usern
M:;usern1;usern2;message
H:;usern1;usern2;
Bob:Jack:"ehsjfnswj"



*/

/*

TODO
Make the msg appear properly on text field
twist


*/