eruda.init();

let socket;
socket = io.connect("https://geode-polyester-elk.glitch.me/");

let objDiv = document.getElementById("messages");
let name;

function addMessage(usr, msg, isAdmin = false) {
  let pelement = document.createElement("p");
  pelement.appendChild(document.createTextNode(usr));
  document.getElementById('messages').appendChild(pelement);
  
  let element = document.createElement("span");
  element.appendChild(document.createTextNode(msg));
  if(isAdmin) {
    element.style.background = "#141414";
    socket.emit('message', {name: name, message: msg});
  }
  document.getElementById('messages').appendChild(element);
  objDiv.scrollTop = objDiv.scrollHeight;
}


window.onload = (e) => {
  objDiv.scrollTop = objDiv.scrollHeight;
  name = prompt("Enter in a name:");
  if(!name) {
    name = "User" + Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9);
  }
  addMessage(name, `${name} has just logged in.`, true);
  
}

document.querySelector("button").onclick = () => {
  if(document.querySelector("input").value) {
    addMessage(name, document.querySelector("input").value, true);
    document.querySelector("input").value = '';
  }
}

document.querySelector("input").oninput = () => {
  if(document.querySelector("input").value) {
    document.querySelector("button").style.background = "dodgerblue";
  }else {
    document.querySelector("button").style.background = "#4f4f4f";
  }
}

document.onkeydown = e => {
  if(e.key === "Enter") {
    if(document.querySelector("input").value) {
      addMessage(name, document.querySelector("input").value, true);
      document.querySelector("input").value = '';
      document.querySelector("button").style.background = "#4f4f4f";
  }
  }
}

socket.on("message", data => {
  addMessage(data.name, data.message);
});
