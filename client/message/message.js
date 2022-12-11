let self_name = localStorage.getItem("self_name");
; let send_name = "";
var msg_sent = "";
var encrypted_msg = "";
let encrypt_num = 0;
var alphaList = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
  "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

document.getElementById("placeholder").innerHTML = ` <p>Username :  ${localStorage.getItem("self_name")}</p>`;
function texts() {
  let people = document.querySelectorAll("#personButton");
  for (let i = 0; i < people.length; i++) {
    people[i].addEventListener('click', function() {
      send_name = people[i].textContent;
      let messages = document.querySelector(".Texts");
      messages.innerHTML = `
  <input type="text" id="textmessage" name="newtext">
  <button type="button" id="sendBtn" onClick="sendMSG()">SEND</button>
  `;
      send(messages.innerHTML);
    });
  }
}

document.getElementById("encryptBtn").addEventListener('click', function() {
  encrypt_num = document.getElementById("encNum").value;
  
});

document.getElementById("AddBtn").addEventListener('click', function() {
  let person = document.getElementById('Addperson').value;
  document.getElementById("ListOfNames").innerHTML += `<li id="nameList">
                        <button type="button" id="personButton">${person}</button>
                    </li>`;
  document.getElementById('Addperson').value = "";
  texts();
});


let wss = new WebSocket('wss://Node-JS-Stuff.jaithrapagadala.repl.co');
wss.binaryType = "arraybuffer";
let encoder = new TextEncoder();
let decoder = new TextDecoder();

function send(message) {
  wss.send(encoder.encode(JSON.stringify({
    data: message
  })));
}
function decode_buffer(input) {
  return JSON.parse(decoder.decode(input)).data;
}

wss.addEventListener('open', function() {
  alert("Websocket is open!");
});

wss.addEventListener('open', function() {
  wss.addEventListener('message', (event) => {
    let decoded = decode_buffer(event.data);
    let splitdecoded = decoded.split(';');
    console.log(splitdecoded[0]);
    
    if (splitdecoded[0] == "M:") {
      if (splitdecoded[2] == self_name) {
        var sender = splitdecoded[1];
        var msg = splitdecoded[3];

        let personWhoSent = document.querySelectorAll("#personButton");
        for (let i = 0; i < personWhoSent.length; i++) {

          if (personWhoSent[i].textContent == sender) {
            let sentTexts = document.querySelector(".Texts");
            sentTexts.innerHTML += `<p id="Irecieve">${msg}</p>`;
          }
        }
      }
      else if (splitdecoded[1] == self_name) {
        var texter = splitdecoded[2];
        var msg = splitdecoded[3];

        let personWhoSent = document.querySelectorAll("#personButton");
        for (let i = 0; i < personWhoSent.length; i++) {

          if (personWhoSent[i].textContent == texter) {
            let sentTexts = document.querySelector(".Texts");
            sentTexts.innerHTML += `<p id="Igive">${msg}</p>`;
            msg_sent = "// " + msg.toLowerCase();
            console.log(encrypt_num);
          }
        }
      }

    }

    else if (splitdecoded[0] == "HR:") {
      if (splitdecoded[2] == self_name) {
        send("H:;" + self_name + ";" + splitdecoded[1] + ";" + msg_sent + ";" + encrypt_num);
      }

    }
    else if (splitdecoded[0] == "H:") {
  
      if (splitdecoded[2] == self_name) {
        localStorage.setItem("msg", splitdecoded[3]);
        localStorage.setItem("msg_sent", JSON.stringify(encrypt_textfile(splitdecoded[3], splitdecoded[4])));
        window.location.href = "./hacking.html";

      }
    }

  });

});

function sendMSG() {
  send("M:;" + self_name + ";" + send_name + ";" + 
  document.getElementById('textmessage').value + "");     
  document.getElementById('textmessage').value = "";
}

texts();

document.querySelector("#hackBtn").addEventListener('click', function() {
  send("HR:;" + self_name + ";" + send_name + "");
  window.location.href = "./hacking.html";
})


function encrypt_textfile(msg_var, num) {
  num = parseInt(num);
  let msg_list = msg_var.split("");
  for (var i = 0; i < msg_list.length; i++) {
    if (alphaList.includes(msg_list[i])){
      
      encrypted_msg += alphaList[(alphaList.indexOf(msg_list[i]) + num) % 26];
      console.log(num);
      
    }    else encrypted_msg += msg_list[i];
    
  }

  
  
  localStorage.setItem("encrypted_msg", JSON.stringify(encrypted_msg));
  return encrypted_msg;
}

function decrypt_textfile(msg_var, num) {
num = parseInt(num);
  let msg_list = msg_var.split('');
  for (var i = 0; i < msg_list.length; i++) {
    if (alphaList.includes(msg_list[i]))
      encrypted_msg += alphaList[(alphaList.indexOf(msg_list[i]) + 26 - num)%26];
    else encrypted_msg += msg_list[i];
  }
  return encrypted_msg;
}