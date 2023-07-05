

var apiKey="86dbb0be58935b576e4fdd7365e04545";


var searchHistoryEl= document.getElementById("search-history-container");
var forcastEl= document.getElementById("5-day-forecast");
var searchInputEl= $("#search-place-holder");
var searchBtn= $("#search-button");
var CityEl= $("#city");
var currentCityEl= $("#current-city")
var DateEl= $("#current-date");
var WeatherIconEl=$("#weather-icon");
var temperatureEl=$("#temperature");
var windEl=$("#wind-speed");
var humidityEl=$("#current-humidity");


 

 // event listener for user input

searchInputEl.on("submit",function(event){
    event.preventDefault();
    var cityName= CityEl.val();
    
    if (cityName==="") {
        alert("Please enter a valid city name.");
        return;
    }
    
    
    getWeather(cityName);
    getForecast(cityName);


     $(searchInputEl)[0].reset();
})

$(searchHistoryEl).on("click", "button", function () {
    var cityName = $(this).text();
    getWeather(cityName);
     getForecast(cityName);
  });

//gets the current weather and displays in html

function getWeather(cityName){

    var requestCurrent =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
    fetch(requestCurrent)   
 .then(function(response){
     return response.json();

 })
 .then(function(data){
     console.log(data);
    currentCityEl.text(data.name);
     DateEl.text(dayjs().format('dddd, MMM DD, YYYY'))
     
     WeatherIconEl.attr("src","https://openweathermap.org/img/wn/"+ data.weather[0].icon+ "@2x.png");
     temperatureEl.text("Temprature: " + data.main.temp + "\u00B0F");
     windEl.text("Wind speed: " + data.wind.speed + " MPH");
     humidityEl.text("Humidity: "+ data.main.humidity + "%" );
     saveSearchEntry(data.name); 
 })

}



// gets the data for 5 days forecast and calls a function to display information 
function getForecast(cityName){
    var requestForecast =`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`
    fetch(requestForecast)   
 .then(function(response){
     return response.json();

 })
 .then(function(data){
      console.log(data);
     displayForecast(data);     
 })
}
// this function displays the 5-day-forecast 
function displayForecast(data){
    forcastEl.innerHTML="";
  var forecastTitle=document.createElement("h3");
  forecastTitle.textContent=data.city.name + "  5-day-forcast";
  $(forcastEl).append(forecastTitle);

 for (i=5; i<data.list.length; i+=8) {
     var forecastCard= document.createElement("div");
     forecastCard.setAttribute("class","weather-card col"); 
     $(forcastEl).append(forecastCard);

     var forecastDate = document.createElement("p");
        forecastDate.style.fontSize = "18px";
        forecastDate.textContent = dayjs.unix(data.list[i].dt).format('dddd, MMM DD, YYYY');
        
        $(forecastCard).append(forecastDate);

        var forecastIcon = document.createElement("img");
        forecastIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png");
       
        $(forecastCard).append(forecastIcon);

        var forecastTemp = document.createElement("p");
        forecastTemp.textContent = "Temp: " + data.list[i].main.temp + "\u00B0F";
        
        $(forecastCard).append(forecastTemp);

        var forecastWind = document.createElement("p");
        forecastWind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
        $(forecastCard.append(forecastWind));

        var forecastHumidity = document.createElement("p");
        forecastHumidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
       
        $(forecastCard).append(forecastHumidity);



 }

}

// stores the citiesSearched in  localstorage
function saveSearchEntry(cityName) {
    
    var citiesSearched = JSON.parse(localStorage.getItem("searchedCities"));
  
    if (citiesSearched === null){
        citiesSearched = [];
        citiesSearched.push(cityName);   
    } else if (citiesSearched.indexOf(cityName) === -1) {
        citiesSearched.push(cityName);
        console.log(citiesSearched);
    }
    localStorage.setItem("searchedCities", JSON.stringify(citiesSearched)); 
    printSearchedCities();

}
// this function renders the savedCities to the saved-cities-container
function printSearchedCities(){
  var citiesHistory= JSON.parse(localStorage.getItem("searchedCities"));
    if (citiesHistory=== null){
        return;
    }
    searchHistoryEl.innerHTML=""
  
  citiesHistory.forEach((element)=>{
    var pastCitiesBtn= document.createElement("button");
        pastCitiesBtn.setAttribute("id", element);
        pastCitiesBtn.setAttribute("class", " btn btn-outline-secondary btn-lg btn-block");
        pastCitiesBtn.textContent= element;
        searchHistoryEl.append(pastCitiesBtn);
    }); 
   
}
printSearchedCities();

  