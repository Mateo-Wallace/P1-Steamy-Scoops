
var gameSearch = document.getElementById("searchBar");
var searchButton = document.getElementById("searchButton");
const apiKey = "7ca66c0b57msh5f0900adbde527ap12f1d6jsn65ee2844dd63"
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': apiKey,
		'X-RapidAPI-Host': 'steam2.p.rapidapi.com'
	}
};


function apiSearch() {
    fetch('https://steam2.p.rapidapi.com/search/'+ gameSearch +'/page/1', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
    
}
    




    function handleSearchFormSubmit(e){
        e.preventDefault();

   var rawSearch = gameSearch.value.trim();
   var search = rawSearch.charAt(0).toUpperCase() + rawSearch.slice(1).toLowerCase();
    console.log(search);
    apiSearch(search);
    gameSearch.value = '';
}


    searchButton.addEventListener('click', handleSearchFormSubmit)
