
var gameSearch = document.getElementById("searchBar");
var searchButton = document.getElementById("searchButton");
const apiKey = "7ca66c0b57msh5f0900adbde527ap12f1d6jsn65ee2844dd63"
var searchForm = document.getElementById("searchForm")
const apiUrl = 'https://steam2.p.rapidapi.com/search/'
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': apiKey,
		'X-RapidAPI-Host': 'steam2.p.rapidapi.com'
	}
};


function apiSearch() {
    try {
    fetch(apiUrl+ gameSearch.value +'/page/1', options)
	.then(response => response.json())
	.then((data) => (data[0].title))
	.catch(err => console.error(err));
    let searchData = data;
    searchData.map(function(searchData){
        let li = document.createElement('li');
        let title = document.createElement('h2');
    
        title.innerHTML = `${data.title}`;
        li.appendChild(title);
        console.log()
    });
    }
  finally {
     console.log(data);
}
}
    

















    function handleSearchFormSubmit(e){
        e.preventDefault();
        console.log(e.target)
   var rawSearch = gameSearch.value.trim();
   var search = rawSearch.charAt(0).toUpperCase() + rawSearch.slice(1).toLowerCase();
    console.log(search);
    apiSearch(search);
    gameSearch.value = '';
}

    searchButton.addEventListener("click", apiSearch);
   searchForm.addEventListener('submit', handleSearchFormSubmit);
