const search = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const output = document.getElementById("output");
const spinner = document.getElementById("spinner");
const autocomplete = document.getElementById("autocomplete");
let searchValue = "koala";
let isSpinner = false;
let autocompleteStyles = [
  "background-color:#669374;color:#f6f2f6;",
  "background-color:#cab7b3;color:#032a18;",
  "background-color:#deb69d;color:#f6f2f6;",
  "background-color:#8f6b5f;color:#f6f2f6;",
];

getAutocolplete = (value) => {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open(
    "GET",
    `https://g.tenor.com/v1/autocomplete?q=${value}&key=LIVDSRZULELA`
  );
  xmlHttp.responseType = "json";
  xmlHttp.send(null);
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let results = xmlHttp.response.results;
      results = results.length > 12 ? results.splice(1, 12) : results;

      autocomplete.innerHTML = "";
      for (res of results) {
        let oneSuggestion = document.createElement("div");
        oneSuggestion.classList.add("suggestion");
        oneSuggestion.innerHTML = `<p style=${
          autocompleteStyles[results.indexOf(res) % 4]
        } class ="suggestionText">${res}</p>`;
        autocomplete.appendChild(oneSuggestion);
        oneSuggestion.addEventListener("click", () => {
          searchValue = oneSuggestion.querySelector("p").innerHTML;
          search.value = searchValue;
          getGifs();
        });
      }
    }
  };
};

getAutocolplete("");

getGifs = () => {
  spinner.style.display = "block";
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open(
    "GET",
    `https://tenor.googleapis.com/v2/search?q=excited&key=AIzaSyBOfkRY9Q6bqTfVpW_6Wzz-bIxPReq170Y&client_key=my_test_app&limit=16&q=${searchValue}`
  );
  xmlHttp.responseType = "json";
  xmlHttp.send();

  xmlHttp.onload = function () {
    if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
      spinner.style.display = "none";
      let gifs = xmlHttp.response.results;
      output.innerHTML = "";
      for (gif of gifs) {
        let outputCard = document.createElement("div");
        document.getElementById("output").appendChild(outputCard);
        outputCard.innerHTML = `<div><img src='${gif.media_formats.gif.url}'></img></div>`;
      }
    }
  };
};

getGifs();

search.addEventListener("input", (e) => {
  searchValue = e.target.value;
  getAutocolplete(e.target.value);
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getGifs();
});
