let self_name = "";

document.querySelector("#logInBtn").addEventListener('click', function() {

  if (document.getElementById('username').value != "") {
    self_name = document.getElementById('username').value;
    localStorage.setItem("self_name", document.getElementById('username').value);
    window.location.href = "./message";
    send("N:;"+personList[1]);
    
  }
  else {
    alert("Enter a new username");
  }

  send(person);
})

