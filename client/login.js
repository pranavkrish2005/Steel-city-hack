let self_name = "";

document.querySelector("#logInBtn").addEventListener('click', function() {

  if (document.getElementById('username').value != "") {
    self_name = document.getElementById('username').value;
    localStorage.setItem("self_name", document.getElementById('username').value);
    window.location.href = "./message/index.html";
    send("N:;"+personList[1]);
    
  }
  else {
    document.querySelector('.LoginArea').innerHTML = `<p id="errorUsername">Username cannot be blank!</p>` + document.querySelector('.LoginArea').innerHTML;
  }

  send(person);
})

