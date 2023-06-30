var apiKey="86dbb0be58935b576e4fdd7365e04545";
var cityName="London"
var requestUrlCityName="https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey ;

function getWeatherInfo () {
    fetch(requestUrlCityName)
    .then(function(response){
        return response.json();
        
    })
   


}