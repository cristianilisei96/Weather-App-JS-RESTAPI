// Const URLs APP API
const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=';
const forecastWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=';
const weatherIconUrl = 'http://openweathermap.org/img/w/';

// Select element from html
const iconElement = document.querySelector(".weather-icon");
const inputSearchLocation = document.getElementById('locationSearchInput');
const searchBtn = document.getElementById('buttonToSearch');
const cityTemperature = document.getElementById('cityTemperature');
const cityName = document.getElementById('cityName');
const daysNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const dateAndTimeCity = document.getElementById('dateAndTimeCity');
const iconWeatherCity = document.getElementById('iconWeatherCity');
const statusWeatherCity = document.getElementById('statusWeatherCity');
const temperatureFeelsLikeCity = document.getElementById('temperatureFeelsLikeCity');
const descriptionWeatherCity = document.getElementById('descriptionWeatherCity');
const humidityWeatherCity = document.getElementById('humidityWeatherCity');
const presureWeatherCity = document.getElementById('presureWeatherCity');
const minOfTemperatureCity = document.getElementById('minOfTemperatureCity');
const maxOfTemperatureCity = document.getElementById('maxOfTemperatureCity');

// ELEM TO DATE AND TIME
let currentDate = new Date();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let amp = hours >= 12 ? 'pm' : 'am';

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
	navigator.geolocation.getCurrentPosition(getClientPosition, showError);
} else {
    alert("Your browser does not support Geolocation!");
}

// GEOLOCATION - GET CLIENT POSITION
function getClientPosition(position){
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;

	getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    alert(`${error.message}`);
}

// Add eventlistener to buttons
searchBtn.addEventListener('click', getWeatherFromLocationSearch);
document.getElementById('getPiatraNeamtWeatherBtn').addEventListener('click', getPiatraNeamtWeather);
document.getElementById('getClujNapocaWeatherBtn').addEventListener('click', getClujNapocaWeather);
document.getElementById('getBucharestWeatherBtn').addEventListener('click', getBucharestWeather);

// SCRIPT TO GET WEATHER FROM CURRENT POSITION CLIENT
function getWeather(latitude, longitude){
	let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=69518b1f8f16c35f8705550dc4161056`;

	fetch(api)
		.then(function(response) {
			let data = response.json();
			return data;
		})
		.then(function(data) {		
            this.changeCityWeatherInfo(data);
		});
}

// Script to ge weather from input search bar
function getWeatherFromLocationSearch(){
    const inputSearchValue = inputSearchLocation.value;
    const url = currentWeatherUrl + inputSearchValue;
    
    fetch(url)
        .then((response) => response.json())
        .then(function(data) {		
            this.changeCityWeatherInfo(data);
		});
}

// Scripts to get weather from suggestions buttons
function getPiatraNeamtWeather(){
    const url = currentWeatherUrl + 'Piatra Neamt';

    fetch(url)
        .then((response) => response.json())
        .then(function(data) {		
            this.changeCityWeatherInfo(data);
		});
}

function getClujNapocaWeather(){
    const url = currentWeatherUrl + 'Cluj-Napoca';

    fetch(url)
        .then((response) => response.json())
        .then(function(data) {		
            this.changeCityWeatherInfo(data);
		});
}

function getBucharestWeather(){
    const url = currentWeatherUrl + 'Bucharest';

    fetch(url)
        .then((response) => response.json())
        .then(function(data) {		
            this.changeCityWeatherInfo(data);
		});
}

function changeCityWeatherInfo(data){
    cityTemperature.innerHTML = Math.round(data.main.temp) + '&#176;C';
    cityName.innerHTML = data.name;
    dateAndTimeCity.innerHTML = 
        [hours % 12] + ":" + minutes + " " + amp + " - "
        + daysNames[currentDate.getDay() - 1] + ', '
        + currentDate.getDate() + "  "
        + monthNames[currentDate.getMonth()] + " "
        + currentDate.getFullYear() + " ";
    // iconWeatherCity.innerHTML = data.weather[0].icon;
    iconWeatherCity.innerHTML = 
        `<img width="50" height="50" alt="icon-weather" src="${weatherIconUrl}${data.weather[0].icon}.png"/>`
    statusWeatherCity.innerHTML = data.weather[0].main;
    temperatureFeelsLikeCity.innerHTML = Math.round(data.main.feels_like) + '&#176;';
    descriptionWeatherCity.innerHTML = data.weather[0].description;
    humidityWeatherCity.innerHTML = Math.round(data.main.humidity) + '%';
    presureWeatherCity.innerHTML = Math.round(data.main.pressure);
    minOfTemperatureCity.innerHTML = Math.round(data.main.temp_min) + '&#176;';
    maxOfTemperatureCity.innerHTML = Math.round(data.main.temp_max) + '&#176;';
}

// Container and btns suggestion city
const suggestionCityContainer = document.getElementById("suggestionCityContainer");
const btns = suggestionCityContainer.getElementsByClassName("suggestionBtn");

// Script add class active to selected suggestion city name 
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");

    // If there's no active class
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }

    searchBtn.addEventListener('click', removeActiveClassSuggestionBtn);

    function removeActiveClassSuggestionBtn() {
        if(current.length > 0) {
            current[0].classList.remove("active");
        }
        clearField();
    }

    // Add the active class to the current/clicked button
    this.className += " active";
  });
}

function clearField(){
    inputSearchLocation.value = '';
}
