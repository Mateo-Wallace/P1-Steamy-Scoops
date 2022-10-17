// Need to put optionsNews on steamNews fetch, need to call steamAppDetail in apiSearch, need to pull up 

// Global Variables
const apiKey = "7ca66c0b57msh5f0900adbde527ap12f1d6jsn65ee2844dd63"
const apiUrl = 'https://steam2.p.rapidapi.com/search/'
const apiYoutubeUrl = `https://youtube138.p.rapidapi.com/search/?q=`
const streamUrl = 'https://youtube138.p.rapidapi.com/video/streaming-data/?id='
// options file for the search and details api
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': apiKey,
		'X-RapidAPI-Host': 'steam2.p.rapidapi.com'
	}
};
// options file for the news api
const optionsNews = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4abe4a0781msh9f300002fb38b8ap1ac971jsnd6b5e73499a4',
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
	fetch(apiYoutubeUrl + videoTitle + '%20guide&hl=en&gl=US', optionsYoutube)
		.then(response => response.json())
		.then(function (videoData) {
			renderYoutube(videoData)
		})
		.catch(err => console.error(err));
}

// Adds information from youtube api to page
function renderYoutube(videoData) {
	var videoId = videoData.contents[1].video.videoId
	
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
	newsCardsEl.setAttribute('class', 'grid grid-cols-1 lg:grid-cols-3 gap-auto flex bg-slate-600/80 justify-around rounded m-3 p-1')

// Loop through first 3 search results
	for (let i = 0; i < 3; i++) {
		// create variables for data values
		var author = newsData.newsitems[i].author
		var contents = newsData.newsitems[i].feedlabel
		var title = newsData.newsitems[i].title
		var url = newsData.newsitems[i].url
		console.log(author, contents, title, url)

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
		newsCardsEl.appendChild(urlATag)
		urlATag.setAttribute('class', 'w-custom m-2 card flex rounded-xl p-0 bg-slate-800 bounce-custom')
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
	linkEl.appendChild(imgEl)
	imgEl.setAttribute('class', 'image-custom rounded bounce-custom')
	imgEl.setAttribute('src', imgUrl)


	// Adds text content to appended elements
	titleEl.innerText = title
	informationEl.innerHTML = description + '<br><br>Price: ' + price
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