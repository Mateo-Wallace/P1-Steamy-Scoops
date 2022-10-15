// Global Variables
const apiKey = "7ca66c0b57msh5f0900adbde527ap12f1d6jsn65ee2844dd63"
const apiUrl = 'https://steam2.p.rapidapi.com/search/'
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': apiKey,
		'X-RapidAPI-Host': 'steam2.p.rapidapi.com'
	}
};

// DOM Element Variables
var gameSearch = document.getElementById("searchBar");
var searchButton = document.getElementById("searchButton");
var searchForm = document.getElementById("searchForm")

// Function to pull AppId data from Steam API
function apiSearch() {
	fetch(apiUrl + gameSearch.value + '/page/1', options)
		.then(response => response.json())
		.then(function (data) {
			var appIdData = data[0].appId
			steamNews (appIdData)
			renderSearchData (data)
		})
		.catch(err => console.error(err));
}

// Call fetch api for steam news and pull down data
function steamNews (appIdData) {
	console.log(appIdData)
}

// Render relevant game data to the page, using the data from steam search api
function renderSearchData (data) {
	console.log(data)
	var imgUrlData
	var priceData
	var titleData
	var steamLinkData
}

function handleSearchFormSubmit(e) {
	e.preventDefault();
	var rawSearch = gameSearch.value.trim();
	var search = rawSearch.charAt(0).toUpperCase() + rawSearch.slice(1).toLowerCase();
	apiSearch(search);
	gameSearch.value = '';
}

searchButton.addEventListener("click", handleSearchFormSubmit);
searchForm.addEventListener('submit', handleSearchFormSubmit);
