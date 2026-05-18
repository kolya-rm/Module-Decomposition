// const SERVER_URL = "http://127.0.0.1:3000";
const SERVER_URL = "http://kolya-rm-chat-app-backend.178.105.39.91.sslip.io";

const MESSAGES = [];


function onWindowLoad() {
  showMessages();
  document.getElementById("btn-send").onclick = sendMessage;
}

function showMessages() {
  const lsatMessageTime = MESSAGES.length > 0 ? MESSAGES[MESSAGES.length - 1].time : 0;
  const request_url = `${SERVER_URL}/messages?since=${lsatMessageTime}`;

  fetch(request_url)
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
      console.error(`Error fetching messages from server: ${error}`);
      alert(`Error occurred: ${error}`);
    }
  );
  setTimeout(showMessages, 1000);
}

function redrawMessages(data) {
  MESSAGES.push(...data);
  const chatElement = document.getElementById("chat");
  chatElement.innerHTML = "";
  for (const message of MESSAGES) {
    const messageElement = document.createElement("p");
    messageElement.innerHTML = `${message.user}: ${message.text}`;
    chatElement.append(messageElement);
  }
}

function sendMessage() {
  const user = document.getElementById("username").value;
  const text = document.getElementById("message").value;
  const time = Date.now();

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
      time: time,
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log(`Message sent`);
        document.getElementById("message").value = "";
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
