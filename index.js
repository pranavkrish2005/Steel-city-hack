var express = require('express');
var ws = require('ws');
var app = express();
let x = -1;

var ws_List_Map = new Map();
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
  console.log(ws_List_Map);
  if (!(splitdecoded[1] == undefined)) {
    send_to_ws(ws_List_Map.get(splitdecoded[2]), decoded);
  }
  else {
    send_to_ws(connectionws, decoded);
  }

  /*
  1) Do send_to+ws(ws:make a list of ws a iteratarte) 
  2) Try to change index.html from here
  */
}

var ws_server = new ws.WebSocketServer({ server: server });
let connectionws;
ws_server.on('connection', ws => {
  clients.push("Jake");
  ws.on('message', data => {
    let decoded = decode_buffer(data);
    //  console.log(decoded);
    //send_to_ws(ws, decoded);
    let splitdecoded = decoded.split(';');

    // console.log(connectionws);
    if (splitdecoded[0] == "N:") {
      clients.push(splitdecoded[1]);
      alert((clients[clients.length - 1]))

      if (!(splitdecoded[1] == undefined)) {
        ws_List_Map.set(splitdecoded[1], ws);
      }
      else connectionws = ws;
    }

    else if (splitdecoded[0] == "M:") {
      // console.log(decoded);
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