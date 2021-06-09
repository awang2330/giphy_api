
/* Global Constants */
const apiKey = "UMDTsYVLpmun2BsaDRl52E6Dnx5weP3t";
const limit = 12;
const rating = "pg-13";

var offset = 0;
var pages = 0;
var searchValue = "";

const gifSearch = document.querySelector("form")
const searchResults = document.querySelector('#search-results')
const moreButton = document.querySelector('.more-gifs')

gifSearch.addEventListener("submit", getResults)
moreButton.addEventListener("click", showMoreGifs)

async function getResults(event) {
  event.preventDefault();
  console.log(event)
  console.log(event.target.gifs)
  var gifInput

  // check if search value is already extracted using page number
  if (pages == 0) {
    gifInput = event.target.gifs.value;
    searchValue = gifInput;
  }
  else {
    gifInput = searchValue;
  }
  
  
  const apiURL = "http://api.giphy.com/v1/gifs/search?" 
  + "api_key=" + apiKey + "&limit=" + limit + "&offset" + offset + "&rating=" + rating + "&q=" + gifInput;
   
  const response  = await fetch(apiURL);
  const responseData = await response.json();

  displayGIFGrid(responseData);
}

/** Display the GIF grid by adding each element to searchResults
 * Display the show more button
 * Update the offset
 */
function displayGIFGrid(gifResults) {
  gifResults.data.forEach(element => {
    searchResults.innerHTML += displayGIF(element)
  });

  moreButton.classList.remove("hidden")

  offset = pages * limit
}

/** Display a single GIF */
function displayGIF(gifData) {
  return `
    <div class="gif-image">
      <img src="${gifData.images.original.url}" alt="${gifData.title}">  
    </div>
  `
}

function showMoreGifs(event) {
  pages++
  getResults(event)
}