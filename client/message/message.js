let self_name = localStorage.getItem("self_name");
; let send_name = "";
var msg_sent = "";
var encrypted_msg = "";
let encrypt_num = 0;
var alphaList = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
  "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];



//let personList = JSON.parse(localStorage.getItem("personList"));
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


document.getElementById("AddBtn").addEventListener('click', function() {
  let person = document.getElementById('Addperson').value;
  // if(personList.includes(person))
  // {
  document.getElementById("ListOfNames").innerHTML += `<li id="nameList">
                        <button type="button" id="personButton">${person}</button>
                    </li>`;
  document.getElementById('Addperson').value = "";
  texts();
  //}
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
  //  alert("Connection");
  //send("TEST");
  wss.addEventListener('message', (event) => {
    //alert('Message from server ' + decode_buffer(event.data));
    let decoded = decode_buffer(event.data);
    let splitdecoded = decoded.split(';');

    if (splitdecoded[0] == "M:") {
      console.log(decoded);
      if (splitdecoded[2] == self_name) {
        //alert(decoded);
        var sender = splitdecoded[1];
        var msg = splitdecoded[3];
        //add to textbook splitdecoded[2]

        let personWhoSent = document.querySelectorAll("#personButton");
        for (let i = 0; i < personWhoSent.length; i++) {
          console.log(personWhoSent[i].textContent + " : " + sender);

          if (personWhoSent[i].textContent == sender) {
            console.log("works");
            let sentTexts = document.querySelector(".Texts");
            sentTexts.innerHTML += `<p id="Irecieve">${msg}</p>`;
          }
        }
      }
      else if (splitdecoded[1] == self_name) {
        var texter = splitdecoded[2];
        var msg = splitdecoded[3];
        //add to textbook splitdecoded[2]

        let personWhoSent = document.querySelectorAll("#personButton");
        for (let i = 0; i < personWhoSent.length; i++) {
          console.log(personWhoSent[i].textContent + " : " + texter);

          if (personWhoSent[i].textContent == texter) {
            console.log("works");
            let sentTexts = document.querySelector(".Texts");
            sentTexts.innerHTML += `<p id="Igive">${msg}</p>`;
          }
        }
      }

    }

    else if (splitdeoced[0] = "H:") {
      if(splitdecoded[2] = self_name)
        send("H:;" + self_name + ";" + msg_sent + ";" + encrypt_num);
    }
    else if (splitdecoded[0] = "H:") {
      //get userinfo, encrypted  etc
      /*
      encrypt_num
      msg_sent
      
      */
    }

  });

});

function sendMSG() {
  msg_sent += "\n " + document.getElementById('textmessage').value;
  msg_sent = msg_sent.toLowerCase();
  send("M:;" + self_name + ";" + send_name + ";" + document.getElementById('textmessage').value + ""); document.getElementById('textmessage').value = "";
}

texts();

document.querySelector("#DecryptBtn").addEventListener('click', decrypt_textfile())
document.querySelector("#EncryptBtn").addEventListener('click', encrypt_textfile())


function encrypt_textfile(msg_var, num) {
  msg_list = msg_var.split('');
  for (var i = 0; i < msg_list.length; i++) {
    if (alphaList.includes(msg_list[i]))
      encrypted_msg += alphaList[alphaList.indexOf(msg_list[i]) + num];
    else encrypted_msg += msg_list[i];
  }
}

function decrypt_textfile() {

}


/*

a 2

(index(a) + 2)%26 => index(c);

*/
