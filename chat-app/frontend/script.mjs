// const SERVER_URL = "http://127.0.0.1:3000";
const SERVER_URL = "http://kolya-rm-chat-app-backend.178.105.39.91.sslip.io";

function onWindowLoad() {
  showMessages();
  document.getElementById("btn-send").onclick = sendMessage;
}

function showMessages() {
  fetch(SERVER_URL)
    .then((response) => {
      if (!response.ok) {
        response.text().then((text) => {
          console.error(`Error fetching messages, server response: ${text}`);
          alert(`Error occurred: ${text}`);
        });
      } else {
        response.json().then((data) => redrawMessages(data));
      }
    })
    .catch((error) => {
      console.error(`Error fetching messages from server: ${text}`);
      alert(`Error occurred: ${text}`);
    });
}

function redrawMessages(data) {
  const chatElement = document.getElementById("chat");
  chatElement.innerHTML = "";
  for (const message of data) {
    const messageElement = document.createElement("p");
    messageElement.innerHTML = `${message.user}: ${message.text}`;
    chatElement.append(messageElement);
  }
}

function sendMessage() {
  const user = document.getElementById("username").value;
  const text = document.getElementById("message").value;

  if (!user) {
    alert("Error: User is empty!");
    return;
  }
  if (!text) {
    alert("Error: Text is empty!");
    return;
  }

  fetch(SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      user: user,
      text: text,
    }),
  })
    .then((response) => {
      if (response.ok) {
        showMessages();
        return;
      } else {
        response.text().then((text) => {
          console.error(`Error on POST message, server response: ${error}`);
          alert(`Error occurred: ${text}`);
        });
        return;
      }
    })
    .catch((error) => {
      console.error(`Error on POST message: ${error}`);
      alert(`Something went wrong: ${error}`);
    });
}

window.onload = onWindowLoad;
