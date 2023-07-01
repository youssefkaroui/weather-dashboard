var apiKey="86dbb0be58935b576e4fdd7365e04545";


var requestUrl="https://api.openweathermap.org/geo/1.0/direct?q=" + CityEl+ "&appid=" + apiKey;
var searchHistoryEl= $("#search-history-container");
var forcastEl= $("#5-days-forcast");
var searchInputEl= $("#search-place-holder");
var searchBtn= $("#search-button");
var CityEl= $("#city");
var DateEl= $("#current-date");
var WeatherIconEl=$("#weather-icon");
var temperatureEl=$("#temperature");
var windEl=$("#wind-speed");
var humidityEl=$("#current-humidity");

// this function gets the coordinates of the city 

function getCoordinates (CityEl){
fetch(requestUrl)
.then(function(response){
    return response.json();
    

})
.then(function (data){
    
    var longitude = data[0].lon;
    console.log(longitude)
    var latitude = data[0].lat;
    console.log(latitude);

    getWeather(longitude,latitude);
    getForecast(longitude,latitude);

})
};

function getWeather(longitude,latitude){
    var requestWeather= "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + apiKey;

    fetch(requestWeather)   
 .then(function(response){
     return response.json();

 })
 .then(function(data){
     CityEl.text($("#city"));
     DateEl.text(dayjs().format('dddd, MMM DD, YYYY'))
     WeatherIconEl.attr("src","https://openweathermap.org/img/wn/"+ data.weather[0].icon+ "@2x.png");
     temperatureEl.text("Temprature: " + data.main.temp + " \u00B0F");
     windEl.text("Wind speed: " + data.wind.speed + " MPH");
     humidityEl.text("Humidity: "+ data.main.humidity + "%" );
     
 
 })

}
getCoordinates();
getWeather();

