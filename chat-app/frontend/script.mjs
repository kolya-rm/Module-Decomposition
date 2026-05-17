const SERVER_URL = "http://127.0.0.1:3000";

function onWindowLoad() {
  showMessages()
}

function showMessages() {
  fetch(SERVER_URL)
    .then(response => {
      if (!response.ok) {
        response.text().then(
          text => alert(`Error occurred: ${text}`)
        )
      } else {
        response.json().then(
          data => redrawMessages(data)          
        )
      }
    });
}

function redrawMessages(data) {
  const chatElement = document.getElementById("chat");
  chatElement.innerHTML = "";
  for(const message of data) {
    const messageElement = document.createElement("p");
    messageElement.innerHTML = `${message.user}: ${message.text}`;
    chatElement.append(messageElement);
  }
}

window.onload = onWindowLoad;