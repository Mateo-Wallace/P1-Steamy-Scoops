// Global Variables
const steamApiKey = "8a1b1e20c7msh9f86df25a5cedc4p1dacd9jsn68af83187e0f"
const steamNewsApiKey = "8a1b1e20c7msh9f86df25a5cedc4p1dacd9jsn68af83187e0f"
const apiUrl = 'https://steam2.p.rapidapi.com/search/'
const apiYoutubeUrl = `https://youtube138.p.rapidapi.com/search/?q=`
const streamUrl = 'https://youtube138.p.rapidapi.com/video/streaming-data/?id='

// options file for the search and details api
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': steamApiKey,
		'X-RapidAPI-Host': 'steam2.p.rapidapi.com'
	}
};
// options file for the news api
const optionsNews = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': steamNewsApiKey,
		'X-RapidAPI-Host': 'steam2.p.rapidapi.com'
	}
};
//options file for the youtube api
const optionsYoutube = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4abe4a0781msh9f300002fb38b8ap1ac971jsnd6b5e73499a4',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};

// DOM Element Variables
const gameSearch = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
const searchForm = document.getElementById("searchForm")
const gameInformationEl = document.getElementById('game-information')
const gameImageEl = document.getElementById('game-image')
const asideTopEl = document.getElementById('aside-top')
const newsCardsEl = document.getElementById('news-cards')
const lastSearchBtn = document.getElementById('lastSearchButton')
const youtubeCardsEl = document.getElementById('youtube-cards')

// FETCH Function to pull AppId data from Steam API
function apiSearch(search) {
	fetch(apiUrl + search + '/page/1', options)
		.then(response => response.json())
		.then(function (data) {
			var appIdData = data[0].appId
			var searchData = data
			var videoTitle = data[0].title
			steamAppDetail(appIdData, searchData)
			steamNews(appIdData)
			youtubeApi(videoTitle)
		})
		.catch(err => console.error(err));
}

//adds the "guide" keyword to the game title and pulls up the relevant video(s)
function youtubeApi(videoTitle) {
	fetch(apiYoutubeUrl + videoTitle + '+news' + '%20guide&hl=en&gl=US', optionsYoutube)
		.then(response => response.json())
		.then(function (videoData) {
			renderYoutube(videoData)
		})
		.catch(err => console.error(err));
}

// Adds information from youtube api to page
function renderYoutube(videoData) {
	youtubeCardsEl.innerHTML = ''
	youtubeCardsEl.removeAttribute('class')
	youtubeCardsEl.setAttribute('class', 'bg-slate-600/80 shadow-lg rounded mx-3 p-1 my-8')

	// Adds title to top of Youtube News
	var gridTitleEl = document.createElement('h2')
	youtubeCardsEl.appendChild(gridTitleEl)
	gridTitleEl.setAttribute('class', 'font-bold text-2xl mt-2 text-center text-slate-100')
	gridTitleEl.innerText = 'Youtube News'
	var gridDivEl = document.createElement('div')
	youtubeCardsEl.appendChild(gridDivEl)
	gridDivEl.setAttribute('class', 'grid grid-cols-1 lg:grid-cols-3 gap-auto justify-items-center')

	// Loop through first 3 search results
	var n = 3
	for (let i = 0; i < n; i++) {

		// checks if the type of content being displayed is a video
		while (videoData.contents[i].type != "video") {
			i++
			n++
		}

		// create variables for data values
		var title = videoData.contents[i].video.title
		var author = videoData.contents[i].video.author.title
		var videoId = videoData.contents[i].video.videoId
		var urlVideoLink = 'https://www.youtube.com/watch?v=' + videoId
		var embedVideoLink = 'https://www.youtube.com/embed/' + videoId

		// Create element tags 
		var urlATag = document.createElement('a')
		var iframeEl = document.createElement('iframe')
		var quoteDivEl = document.createElement('div')
		var titleEl = document.createElement('p')
		var figcaptionEl = document.createElement('figcaption')
		var channelEl = document.createElement('p')
		var youtubeEl = document.createElement('div')

		// append and style elements to document
		gridDivEl.appendChild(urlATag)
		urlATag.setAttribute('class', 'card m-2 flex rounded-xl bg-slate-800 p-0 bounce-custom border-none hover:border-solid border-2 border-purple-700 youtube-width')
		urlATag.setAttribute('href', urlVideoLink)
		urlATag.setAttribute('target', '_blank')
		urlATag.setAttribute('rel', 'noopener noreferrer')
		urlATag.appendChild(iframeEl)
		iframeEl.setAttribute('type', 'text/html')
		iframeEl.setAttribute('class', 'w-1/2 sm:w-1/3 lg:w-5/12 aspect-video rounded-l-xl')
		iframeEl.setAttribute('frameborder', '0')
		iframeEl.setAttribute('allowfullscreen', '')
		iframeEl.setAttribute('src', embedVideoLink)
		urlATag.appendChild(quoteDivEl)
		quoteDivEl.setAttribute('class', 'w-1/2 sm:w-2/3 lg:w-7/12 pt-6 p-3 text-left space-y-4')
		quoteDivEl.appendChild(titleEl)
		titleEl.setAttribute('class', 'text-lg font-medium text-slate-200')
		quoteDivEl.appendChild(figcaptionEl)
		figcaptionEl.setAttribute('class', 'font-medium')
		figcaptionEl.appendChild(channelEl)
		channelEl.setAttribute('class', 'text-sky-400')
		figcaptionEl.appendChild(youtubeEl)
		youtubeEl.setAttribute('class', 'text-slate-500')

		// add text to page
		titleEl.innerText = title
		channelEl.innerText = author
		youtubeEl.innerText = 'Youtube'
	}
}

// FETCH Call fetch api for steam news and pull down data
function steamNews(appIdData) {
	const steamNewsUrl = 'https://steam2.p.rapidapi.com/newsForApp/' + appIdData + '/limit/4/300'
	fetch(steamNewsUrl, optionsNews)
		.then(response => response.json())
		.then(function (data) {
			var newsData = data.appnews
			renderSteamNews(newsData)
		})
		.catch(err => console.error(err));
}

// Adds information from steam news to page
function renderSteamNews(newsData) {
	newsCardsEl.innerHTML = ''
	newsCardsEl.removeAttribute('class')
	newsCardsEl.setAttribute('class', 'bg-slate-600/80 rounded m-3 p-1')

	// Adds title to top of Steam News
	var gridTitleEl = document.createElement('h2')
	newsCardsEl.appendChild(gridTitleEl)
	gridTitleEl.setAttribute('class', 'font-bold text-2xl mt-2 text-center text-slate-100')
	gridTitleEl.innerText = 'Steam News'
	var gridDivEl = document.createElement('div')
	newsCardsEl.appendChild(gridDivEl)
	gridDivEl.setAttribute('class', 'grid grid-cols-1 lg:grid-cols-3 gap-auto flex justify-around')

	// Loop through first 3 search results
	for (let i = 0; i < 3; i++) {
		// create variables for data values
		var author = newsData.newsitems[i].author
		var contents = newsData.newsitems[i].feedlabel
		var title = newsData.newsitems[i].title
		var url = newsData.newsitems[i].url

		// Create element tags 
		var urlATag = document.createElement('a')
		var iconDivEl = document.createElement('div')
		var iconEl = document.createElement('i')
		var quoteDivEl = document.createElement('div')
		var blockquoteDivEl = document.createElement('blockquote')
		var contentsEl = document.createElement('p')
		var figcaptionEl = document.createElement('figcaption')
		var titleEl = document.createElement('div')
		var authorEl = document.createElement('div')

		// append and style elements to document
		gridDivEl.appendChild(urlATag)
		urlATag.setAttribute('class', 'm-2 card flex rounded-xl p-0 bg-slate-800 bounce-custom border-none hover:border-solid border-2 border-purple-700')
		urlATag.setAttribute('href', url)
		urlATag.setAttribute('target', '_blank')
		urlATag.setAttribute('rel', 'noopener noreferrer')
		urlATag.appendChild(iconDivEl)
		iconDivEl.setAttribute('class', 'flex items-center text-white p-2')
		iconDivEl.appendChild(iconEl)
		iconEl.setAttribute('class', 'fa-brands fa-steam fa-lg text-7xl pl-2')
		urlATag.appendChild(quoteDivEl)
		quoteDivEl.setAttribute('class', 'pt-6 p-8 text-left space-y-4')
		quoteDivEl.appendChild(blockquoteDivEl)
		blockquoteDivEl.appendChild(contentsEl)
		contentsEl.setAttribute('class', 'text-lg font-medium text-white overflow-wrap')
		quoteDivEl.appendChild(figcaptionEl)
		figcaptionEl.setAttribute('class', 'font-medium')
		figcaptionEl.appendChild(titleEl)
		titleEl.setAttribute('class', 'text-sky-400')
		figcaptionEl.appendChild(authorEl)
		authorEl.setAttribute('class', 'text-slate-500')

		// add text to page
		contentsEl.innerText = contents
		titleEl.innerText = title
		authorEl.innerText = author
	}
}

// FETCH Call fetch to get app details
function steamAppDetail(appIdData, searchData) {
	const appDetailUrl = 'https://steam2.p.rapidapi.com/appDetail/' + appIdData
	fetch(appDetailUrl, options)
		.then(response => response.json())
		.then(function (data) {
			var appDetailData = data
			renderAppDetailData(appDetailData, searchData)
		})
		.catch(err => console.error(err));
}

// Render relevant game data to the page, using the data from steam search api
function renderAppDetailData(appDetailData, searchData) {
	gameInformationEl.innerHTML = ''
	gameImageEl.innerHTML = ''

	// Define variables for apiSearch data
	var imgUrl = searchData[0].imgUrl
	var price = searchData[0].price
	var title = searchData[0].title
	var description = appDetailData.description
	var steamLink = searchData[0].url

	if (description === '') {
		description = 'No info'
	}
	if (price === '') {
		price = 'No info'
	}

	// Create elements to add to parent div
	var cardDivEl = document.createElement('div')
	var titleEl = document.createElement('h2')
	var informationEl = document.createElement('p')
	var linkEl = document.createElement('a')
	var imgEl = document.createElement('img')

	// Append elements and style
	asideTopEl.classList.remove('lg:grid-cols-2')
	asideTopEl.classList.add('lg:grid-cols-3')
	gameInformationEl.appendChild(cardDivEl)
	cardDivEl.setAttribute('class', 'px-6 py-4')
	cardDivEl.appendChild(titleEl)
	titleEl.setAttribute('class', 'font-bold text-xl mb-2')
	cardDivEl.appendChild(informationEl)
	informationEl.setAttribute('class', 'text-base overflow-wrap')
	gameImageEl.appendChild(linkEl)
	gameImageEl.setAttribute('class', 'w-11/12 max-width m-2 center-custom')
	linkEl.setAttribute('href', steamLink)
	linkEl.setAttribute('target', '_blank')
	linkEl.setAttribute('rel', 'noopener noreferrer')
	linkEl.appendChild(imgEl)
	imgEl.setAttribute('class', 'image-custom rounded bounce-custom border-none hover:border-solid border-2 border-purple-700')
	imgEl.setAttribute('src', imgUrl)

	// Adds text content to appended elements
	titleEl.innerText = title
	informationEl.innerHTML = description + '<br><br>Price: ' + price
}

// stores last user input in local
function storeSearch(search) {
	localStorage.setItem("gameKey", search)
	renderLocal();
}

// Determines if item in local storage has a value
function renderLocal() {
	var lastSearch = localStorage.getItem("gameKey");
	if (lastSearch == null | lastSearch == '') {
		return
	} else {
		lastSearchBtn.innerText = "";
		lastSearchBtn.innerText = lastSearch;
		lastSearchBtn.addEventListener('click', handleLastSearchSubmit);
	}
}

// Targets Last Search Button and runs function
function handleLastSearchSubmit(e) {
	apiSearch(e.target.textContent)
}

// Filters user input to streamline results
function handleSearchFormSubmit(e) {
	e.preventDefault();
	var rawSearch = gameSearch.value.trim();
	var search = rawSearch.charAt(0).toUpperCase() + rawSearch.slice(1).toLowerCase();
	apiSearch(search);
	storeSearch(search)
	gameSearch.value = '';
}

// Update Last Search Button on page load
renderLocal();

// lastSearchBtn.addEventListener('click', renderLocal);
searchButton.addEventListener("click", handleSearchFormSubmit);
searchForm.addEventListener('submit', handleSearchFormSubmit);