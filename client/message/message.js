let self_name = localStorage.getItem("self_name");
;let send_name = "";
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
     // if (splitdecoded[2] == self_name) {
        alert(decoded);
        //add to textbook splitdecoded[2]
        let personWhoSent = document.querySelectorAll("#personButton");
        for (let i = 0; i < personWhoSent.length; i++) {
          if (personWhoSent[i].value == splitdecoded[1])
            personWhoSent[i].addEventListener('click', function() {
              let sentTexts = document.querySelector(".Texts");
              sentTexts.innerHTML += `<p>${splitdecoded[3]}</p>`;
            });
        }
      //}
    }
  });

});



function sendMSG() {
  send("M:;" + self_name + ";" + send_name + ";" + document.getElementById('textmessage').value + ""); document.getElementById('textmessage').value = "";
}

texts();


