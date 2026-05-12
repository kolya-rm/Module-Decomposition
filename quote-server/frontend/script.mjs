const QUOTE_URL = "http://kolya-rm-quote-server-backend.178.105.39.91.sslip.io";


function onLoad() {
  document.getElementById("btn_get_quote").onclick = showQuote;
  showQuote();
}

function showQuote() {
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
      document.querySelector("#quote p").innerText = data.quote;
      document.querySelector("#author p").innerText = data.author;
    });
}


window.onload = onLoad;
