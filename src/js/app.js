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

// ELEMS TO NEXT 6 days
const contentFirstDay = document.getElementById('contentFirstDay');
const contentSecondDay = document.getElementById('contentSecondDay');
const contentThirdDay = document.getElementById('contentThirdDay');
const contentFourthDay = document.getElementById('contentFourthDay');
const contentFifthDay = document.getElementById('contentFifthDay');
const contentSixthDay = document.getElementById('contentSixthDay');

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

// SCRIPT TO GET WEATHER INFO FROM CURRENT POSITION CLIENT
function getWeather(latitude, longitude){
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=69518b1f8f16c35f8705550dc4161056`;

	fetch(url)
		.then(function(response) {
			let data = response.json();
			return data;
		})
		.then(function(data) {		
            this.changeCityWeatherInfo(data);
		});

    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=69518b1f8f16c35f8705550dc4161056`;

    fetch(urlForecast)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            this.forecastInfoClientPosition(data);
        });
        
}

// Script to ge weather from input search bar
function getWeatherFromLocationSearch(){
    const inputSearchValue = inputSearchLocation.value;
    const url = currentWeatherUrl + inputSearchValue;
    
    fetch(url)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {		
            this.changeCityWeatherInfo(data);
		});

    const urlForecast = forecastWeatherUrl + inputSearchLocation.value;

    fetch(urlForecast)
        .then(function(response) {
			let data = response.json();
			return data;
		})
        .then(function(data) {
            console.log(urlForecast);
            this.forecastInfoSearchLocation(data);
        });
}

// Scripts to get weather from suggestions buttons
function getPiatraNeamtWeather(){
    const url = currentWeatherUrl + 'Piatra Neamt';

    fetch(url)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {		
            this.changeCityWeatherInfo(data);
		});

    const urlForecast = forecastWeatherUrl + 'Piatra Neamt';

    fetch(urlForecast)
        .then(function(response) {
			let data = response.json();
			return data;
		})
        .then(function(data) {
            this.forecastInfoSuggestionLocation(data);
        });
}

function getClujNapocaWeather(){
    const url = currentWeatherUrl + 'Cluj-Napoca';

    fetch(url)
        .then(function(response) {
			let data = response.json();
			return data;
		})
        .then(function(data) {		
            this.changeCityWeatherInfo(data);
		});

    const urlForecast = forecastWeatherUrl + 'Cluj-Napoca';

    fetch(urlForecast)
        .then(function(response) {
			let data = response.json();
			return data;
		})
        .then(function(data) {
            this.forecastInfoSuggestionLocation(data);
        });
}

function getBucharestWeather(){
    const url = currentWeatherUrl + 'Bucharest';

    fetch(url)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {		
            this.changeCityWeatherInfo(data);
		});
    
    const urlForecast = forecastWeatherUrl + 'Bucharest';

    fetch(urlForecast)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            this.forecastInfoSuggestionLocation(data);
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
    temperatureFeelsLikeCity.innerHTML = Math.round(data.main.feels_like) + '&#176;C';
    descriptionWeatherCity.innerHTML = data.weather[0].description;
    humidityWeatherCity.innerHTML = Math.round(data.main.humidity) + '%';
    presureWeatherCity.innerHTML = Math.round(data.main.pressure);
    minOfTemperatureCity.innerHTML = Math.round(data.main.temp_min) + '&#176;C';
    maxOfTemperatureCity.innerHTML = Math.round(data.main.temp_max) + '&#176;C';
}

function forecastInfoClientPosition(data){
    
    contentFirstDay.innerHTML = 
        `${data.list[7].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[7].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[7].main.temp)}&#176C <br>
        ${data.list[7].weather[0].description} <hr>
        ${data.list[8].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[8].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[8].main.temp)}&#176C <br>
        ${data.list[8].weather[0].description} <hr>
        ${data.list[9].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[9].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[9].main.temp)}&#176C <br>
        ${data.list[9].weather[0].description} <hr>
        ${data.list[10].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[10].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[10].main.temp)}&#176C <br>
        ${data.list[10].weather[0].description} <hr>
        ${data.list[11].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[11].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[11].main.temp)}&#176C <br>
        ${data.list[11].weather[0].description} <hr>
        ${data.list[12].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[12].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[12].main.temp)}&#176C <br>
        ${data.list[12].weather[0].description} <hr>
        ${data.list[13].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[13].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[13].main.temp)}&#176C <br>
        ${data.list[13].weather[0].description} <hr>
        ${data.list[14].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[14].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[14].main.temp)}&#176C <br>
        ${data.list[14].weather[0].description}`;

    contentSecondDay.innerHTML = 
        `${data.list[15].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[15].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[15].main.temp)}&#176C <br>
        ${data.list[15].weather[0].description} <hr>
        ${data.list[16].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[16].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[16].main.temp)}&#176C <br>
        ${data.list[16].weather[0].description} <hr>
        ${data.list[17].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[17].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[17].main.temp)}&#176C <br>
        ${data.list[17].weather[0].description} <hr>
        ${data.list[18].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[18].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[18].main.temp)}&#176C <br>
        ${data.list[18].weather[0].description} <hr>
        ${data.list[19].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[19].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[19].main.temp)}&#176C <br>
        ${data.list[19].weather[0].description} <hr>
        ${data.list[20].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[20].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[20].main.temp)}&#176C <br>
        ${data.list[20].weather[0].description} <hr>
        ${data.list[21].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[21].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[21].main.temp)}&#176C <br>
        ${data.list[21].weather[0].description} <hr>
        ${data.list[22].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[22].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[22].main.temp)}&#176C <br>
        ${data.list[22].weather[0].description}`;

    contentThirdDay.innerHTML = 
        `${data.list[23].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[15].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[15].main.temp)}&#176C <br>
        ${data.list[23].weather[0].description} <hr>
        ${data.list[24].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[16].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[16].main.temp)}&#176C <br>
        ${data.list[24].weather[0].description} <hr>
        ${data.list[25].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[17].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[17].main.temp)}&#176C <br>
        ${data.list[25].weather[0].description} <hr>
        ${data.list[26].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[18].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[18].main.temp)}&#176C <br>
        ${data.list[26].weather[0].description} <hr>
        ${data.list[27].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[19].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[19].main.temp)}&#176C <br>
        ${data.list[27].weather[0].description} <hr>
        ${data.list[28].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[20].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[20].main.temp)}&#176C <br>
        ${data.list[28].weather[0].description} <hr>
        ${data.list[29].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[21].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[21].main.temp)}&#176C <br>
        ${data.list[29].weather[0].description} <hr>
        ${data.list[30].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[22].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[22].main.temp)}&#176C <br>
        ${data.list[30].weather[0].description}`;
}

function forecastInfoSearchLocation(data){

    contentFirstDay.innerHTML = 
        `${data.list[7].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[7].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[7].main.temp)}&#176C <br>
        ${data.list[7].weather[0].description} <hr>
        ${data.list[8].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[8].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[8].main.temp)}&#176C <br>
        ${data.list[8].weather[0].description} <hr>
        ${data.list[9].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[9].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[9].main.temp)}&#176C <br>
        ${data.list[9].weather[0].description} <hr>
        ${data.list[10].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[10].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[10].main.temp)}&#176C <br>
        ${data.list[10].weather[0].description} <hr>
        ${data.list[11].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[11].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[11].main.temp)}&#176C <br>
        ${data.list[11].weather[0].description} <hr>
        ${data.list[12].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[12].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[12].main.temp)}&#176C <br>
        ${data.list[12].weather[0].description} <hr>
        ${data.list[13].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[13].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[13].main.temp)}&#176C <br>
        ${data.list[13].weather[0].description} <hr>
        ${data.list[14].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[14].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[14].main.temp)}&#176C <br>
        ${data.list[14].weather[0].description}`;

    contentSecondDay.innerHTML = 
        `${data.list[15].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[15].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[15].main.temp)}&#176C <br>
        ${data.list[15].weather[0].description} <hr>
        ${data.list[16].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[16].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[16].main.temp)}&#176C <br>
        ${data.list[16].weather[0].description} <hr>
        ${data.list[17].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[17].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[17].main.temp)}&#176C <br>
        ${data.list[17].weather[0].description} <hr>
        ${data.list[18].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[18].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[18].main.temp)}&#176C <br>
        ${data.list[18].weather[0].description} <hr>
        ${data.list[19].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[19].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[19].main.temp)}&#176C <br>
        ${data.list[19].weather[0].description} <hr>
        ${data.list[20].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[20].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[20].main.temp)}&#176C <br>
        ${data.list[20].weather[0].description} <hr>
        ${data.list[21].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[21].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[21].main.temp)}&#176C <br>
        ${data.list[21].weather[0].description} <hr>
        ${data.list[22].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[22].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[22].main.temp)}&#176C <br>
        ${data.list[22].weather[0].description}`;

    contentThirdDay.innerHTML = 
        `${data.list[23].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[15].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[15].main.temp)}&#176C <br>
        ${data.list[23].weather[0].description} <hr>
        ${data.list[24].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[16].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[16].main.temp)}&#176C <br>
        ${data.list[24].weather[0].description} <hr>
        ${data.list[25].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[17].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[17].main.temp)}&#176C <br>
        ${data.list[25].weather[0].description} <hr>
        ${data.list[26].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[18].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[18].main.temp)}&#176C <br>
        ${data.list[26].weather[0].description} <hr>
        ${data.list[27].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[19].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[19].main.temp)}&#176C <br>
        ${data.list[27].weather[0].description} <hr>
        ${data.list[28].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[20].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[20].main.temp)}&#176C <br>
        ${data.list[28].weather[0].description} <hr>
        ${data.list[29].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[21].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[21].main.temp)}&#176C <br>
        ${data.list[29].weather[0].description} <hr>
        ${data.list[30].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[22].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[22].main.temp)}&#176C <br>
        ${data.list[30].weather[0].description}`;

}

function forecastInfoSuggestionLocation(data){

    contentFirstDay.innerHTML = 
        `${data.list[7].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[7].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[7].main.temp)}&#176C <br>
        ${data.list[7].weather[0].description} <hr>
        ${data.list[8].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[8].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[8].main.temp)}&#176C <br>
        ${data.list[8].weather[0].description} <hr>
        ${data.list[9].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[9].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[9].main.temp)}&#176C <br>
        ${data.list[9].weather[0].description} <hr>
        ${data.list[10].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[10].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[10].main.temp)}&#176C <br>
        ${data.list[10].weather[0].description} <hr>
        ${data.list[11].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[11].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[11].main.temp)}&#176C <br>
        ${data.list[11].weather[0].description} <hr>
        ${data.list[12].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[12].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[12].main.temp)}&#176C <br>
        ${data.list[12].weather[0].description} <hr>
        ${data.list[13].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[13].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[13].main.temp)}&#176C <br>
        ${data.list[13].weather[0].description} <hr>
        ${data.list[14].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[14].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[14].main.temp)}&#176C <br>
        ${data.list[14].weather[0].description}`;

    contentSecondDay.innerHTML = 
        `${data.list[15].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[15].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[15].main.temp)}&#176C <br>
        ${data.list[15].weather[0].description} <hr>
        ${data.list[16].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[16].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[16].main.temp)}&#176C <br>
        ${data.list[16].weather[0].description} <hr>
        ${data.list[17].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[17].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[17].main.temp)}&#176C <br>
        ${data.list[17].weather[0].description} <hr>
        ${data.list[18].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[18].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[18].main.temp)}&#176C <br>
        ${data.list[18].weather[0].description} <hr>
        ${data.list[19].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[19].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[19].main.temp)}&#176C <br>
        ${data.list[19].weather[0].description} <hr>
        ${data.list[20].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[20].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[20].main.temp)}&#176C <br>
        ${data.list[20].weather[0].description} <hr>
        ${data.list[21].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[21].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[21].main.temp)}&#176C <br>
        ${data.list[21].weather[0].description} <hr>
        ${data.list[22].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[22].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[22].main.temp)}&#176C <br>
        ${data.list[22].weather[0].description}`;

    contentThirdDay.innerHTML = 
        `${data.list[23].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[15].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[15].main.temp)}&#176C <br>
        ${data.list[23].weather[0].description} <hr>
        ${data.list[24].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[16].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[16].main.temp)}&#176C <br>
        ${data.list[24].weather[0].description} <hr>
        ${data.list[25].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[17].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[17].main.temp)}&#176C <br>
        ${data.list[25].weather[0].description} <hr>
        ${data.list[26].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[18].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[18].main.temp)}&#176C <br>
        ${data.list[26].weather[0].description} <hr>
        ${data.list[27].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[19].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[19].main.temp)}&#176C <br>
        ${data.list[27].weather[0].description} <hr>
        ${data.list[28].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[20].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[20].main.temp)}&#176C <br>
        ${data.list[28].weather[0].description} <hr>
        ${data.list[29].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[21].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[21].main.temp)}&#176C <br>
        ${data.list[29].weather[0].description} <hr>
        ${data.list[30].dt_txt} <br> 
        <img src="${weatherIconUrl}${data.list[22].weather[0].icon}.png""> <br> 
        ${Math.round(data.list[22].main.temp)}&#176C <br>
        ${data.list[30].weather[0].description}`;

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

// FUNCTION TO CLEAR INPUT FIELD VALUE
function clearField(){
    inputSearchLocation.value = '';
}
