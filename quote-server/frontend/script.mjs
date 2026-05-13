// const QUOTE_URL = "http://kolya-rm-quote-server-backend.178.105.39.91.sslip.io";
const QUOTE_URL = "http://127.0.0.1:3000";


function onLoad() {
  document.getElementById("btn-get-quote").onclick = showQuote;
  document.getElementById("btn-add-quote").onclick = addQuote;
  showQuote();
}

function showQuote() {
  console.log("Get quote button is clicked")
  fetch(QUOTE_URL)
    .catch(error => {
      console.error(error)
    }) 
    .then(response => {
      if (!response.ok) {
        console.error(`Response status: ${response.status}`);
        return;
      }
      return response.json();
    })
    .then(data => {
      console.log(data)
      document.querySelector("#get-quote-text p").innerText = data.quote;
      document.querySelector("#get-quote-author p").innerText = data.author;
    });
}

function addQuote() {
  console.log("Add quote button clicked");
}


window.onload = onLoad;
