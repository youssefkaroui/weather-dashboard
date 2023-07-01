

var apiKey="86dbb0be58935b576e4fdd7365e04545";

// var requestUrl="https://api.openweathermap.org/geo/1.0/direct?q=" + CityEl+ "&appid=" + apiKey;
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





function getWeather(cityName){
    
    
    var requestCurrent =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    fetch(requestCurrent)   
 .then(function(response){
     return response.json();

 })
 .then(function(data){
    //  console.log(data);
     CityEl.text($("#city"));
     DateEl.text(dayjs().format('dddd, MMM DD, YYYY'))
     WeatherIconEl.attr("src","https://openweathermap.org/img/wn/"+ data.weather[0].icon+ "@2x.png");
     temperatureEl.text("Temprature: " + data.main.temp + " \u00B0F");
     windEl.text("Wind speed: " + data.wind.speed + " MPH");
     humidityEl.text("Humidity: "+ data.main.humidity + "%" );
     
 
 })

}



searchInputEl.on("submit",function(event){
    event.preventDefault();
    var cityName= CityEl.val();
    console.log(cityName);
    getWeather(cityName);
     getForecast(cityName);
})


function getForecast(cityName){
    var requestForecast =`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
    fetch(requestForecast)   
 .then(function(response){
     return response.json();

 })
 .then(function(data){
    //  console.log(data);
     displayForecast();     
     
 
 })


}
function displayForecast(){
    
}