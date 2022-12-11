let decNum = 0;
let decMessage = JSON.parse(localStorage.getItem("msg_sent"));
var alphaList = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
  "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let decTest = "";
let encrypted_msg = "";

document.querySelector(".allmessages").innerHTML = `<p>${decMessage}</p>`;

document.getElementById("decryptBtn").addEventListener('click', function() {
  decNum = document.getElementById("decNum").value;
  decTest = decrypt_textfile(decMessage, decNum);
  console.log(decTest);
  document.querySelector(".allmessages").innerHTML = `<p>${decTest}</p>`;
  // localStorage.clear();
});

function decrypt_textfile(msg_var, num) {
  num = parseInt(num);
  msg_list = msg_var.split('');
  for (var i = 0; i < msg_list.length; i++) {
    if (alphaList.includes(msg_list[i]))
      encrypted_msg += alphaList[(alphaList.indexOf(msg_list[i]) + 26 - num)%26];
    else encrypted_msg += msg_list[i];
  }
  return encrypted_msg;
}