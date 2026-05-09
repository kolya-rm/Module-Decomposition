const QUOTE_URL = "http://127.0.0.1:3000/"

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

window.onload = showQuote