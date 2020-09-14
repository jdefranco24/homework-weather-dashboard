// store the value of the input
let city = $("#searchTerm").val();
// store api key
var apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";

let date = new Date();

$("#searchTerm").keypress(function(event) { 
	
	if (event.keyCode === 13) { 
		event.preventDefault();
		$("#searchBtn").click(); 
	} 
});

$("#searchBtn").on("click", function() {

    $('#forecastH5').addClass('show');

  // get the value of the input from user
    city = $("#searchTerm").val();

  // clear input box
    $("#searchTerm").val("");  

  // full url to call api
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

    $.ajax({
    url: queryUrl,
    method: "GET"
    })
    .then(function (response){

    // console.log(response)

    // console.log(response.name)
    // console.log(response.weather[0].icon)

    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    // console.log(Math.floor(tempF))

    // console.log(response.main.humidity)

    // console.log(response.wind.speed)

    getCurrentConditions(response);
    getCurrentForecast(response);
    makeList();

    })
});

    function makeList() {
    let listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
    }

    function getCurrentConditions (response) {

    // get the temperature and convert to fahrenheit 
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $('#currentCity').empty();

    // get and set the content 
    var card = $("<div>").addClass("card");
    var cardBody = $("<div>").addClass("card-body");
    var city = $("<h4>").addClass("card-title").text(response.name);
    var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    var wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    // add to page
    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card)

    }

function getCurrentForecast () {

    $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
    method: "GET"
    }).then(function (response){

    // console.log(response)
    // console.log(response.dt)
    $('#forecast').empty();

    // variable to hold response.list
    let results = response.list;
    console.log(results)
    
    //declare start date to check against
    // startDate = 20
    //have end date, endDate = startDate + 5

    for (let i = 0; i < results.length; i++) {

        let day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
        let hour = results[i].dt_txt.split('-')[2].split(' ')[1];
        // console.log(day);
        // console.log(hour);

        if(results[i].dt_txt.indexOf("12:00:00") !== -1){
        
        // get the temperature and convert to fahrenheit 
        let temp = (results[i].main.temp - 273.15) * 1.80 + 32;
        let tempF = Math.floor(temp);

        var card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
        var cardBody = $("<div>").addClass("card-body p-3 forecastBody")
        var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
        var temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
        var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

        var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

        cardBody.append(cityDate, image, temperature, humidity);
        card.append(cardBody);
        $("#forecast").append(card);

        }
    }
    });

}





// $(document).ready(function() {
//     $("#search-button").on("click", function() {
//         console.log("here");
//         var cityName = $("#search-value").val().trim();
//         console.log(cityName);
//     })
//     $(".history").on("click", "li", function() {
//         console.log("here")
//         citySearches.push(cityName);
//         $("#search-value").val("");
//     })

//     function makeRow(text) {
//         var li = $("<li>").addClass("list-group-itm list-group-item-action").text(text);
//         $(".history").append(li);
//     }
//     var APIKey = "166a433c57516f51dfab1f7edaed8413";

//     function searchWeather(searchValue) {
//         $.ajax({
//             type: "GET",
//             url: "https://api.openweathermap.org/data/2.5/weather?q="+ searchValue + "&appid="+ APIKey + "&units=imperial",
//             dataType: "json",
//             success: function(data) {
//                 if(history.indexOf(searchValue) === -1) {
//                     history.push(searchValue);
//                     window.localStorage.setItem("history", JSON.stringify(history));

//                     makeRow(searchValue);
//                 }

//                 $("#today").empty();

//                 var title = $("<h3>").addClass("card-title").text(data.name + " (" + new DataCue().toLocaleDate);
//                 var card = $("<div>").addClass("card");
//                 var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + "MPH");
//                 var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
//                 var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + "F");
//                 var cardBody = $("<div>").addClass("card-body");
//                 var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")

//                 title.append(img);
//                 cardBody.append(title, temp, humid, wind);
//                 card.append(cardBody);
//                 $("#today").append(card);

//                 getForecast(searchValue);
//                 getUVIndex(data.coord.lat, data.coord.long);

//             }
//         })
//     }
    
//     function getForecast(searchValue) {
//         $.ajax({
//             type: "GET",
//             url: "https://api.openweathermap.org/data/2.5/weather?q="+ searchValue+ "&appid="+ APIKey + "&units=imperial",
//             dataType: "json",
//             success: function(data) {
//                 $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");

//                 for (var i = 0; i < data.list.length; i++) {
//                     if (data.list[i].dt_txt.indexOf("15:00:00") !==-1) {
//                         var col = $("<div>").addClass("col-md-2");
//                         var card = $("<div>").addClass("card bg-primary text-white");
//                         var body = $("<div>").addClass("card-body p-2");
//                         var title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDate);

//                         var img = $("<img>").attr("src", "http://openweathermarp.org/img/w/" + data.list[i].weather[0].icon + ".png");

//                         col.append(card);
//                         card.append(body);
//                         body.append(title, img, temp, humidity);
//                         $("#forecast .row").append(col);
                    
//                         // left off here
//                     }
//                 }
//             }
//         })
//     };

//     var history = JSON.parse(window.localStorage.getItem("history")) || [];

//     if (history.length > 0) {
//         searchWeather(history[history.length-1]);

//     }
//     for (var i = 0; i < history.length; i++) {
//         makeRow(history[i]);
//     }
// });



















// // creating click function for search button
// $("#search-button").on("click", function(event) {
// console.log("here")

// var cityName = $("#search-value").val().trim();
// console.log(cityName)
// // save city name to local storage
// citySearches.push(cityName);
// $("#search-value").val("");

// storedSearches();
// //renderTodos()

// var APIKey = "166a433c57516f51dfab1f7edaed8413";

// $.ajax({
//     url: "https://api.openweathermap.org/data/2.5/weather?q="+ cityName+ "&appid="+ APIKey + "&units=imperial",
//     method: "GET"
// }).then(function(response) {
//     console.log(response);
// });

// });

// var citySearches = [];

// init();
// // Grabbing previous city search from local storage
// function init() {

//     // Parsing the JSON string to an object
// var storedSearches = JSON.parse(localStorage.getItem("citySearches"));

//     // If cities were retrieved from localStorage, update the city array to it
// if (storedSearches !== null) {
//     citySearches = storedSearches;
//     }
// console.log(citySearches)
//     // Render cities to the DOM
// renderCitySearches();
// }
// function storedSearches() {
//     // local storage can only save strings   --> JSON Stringify converts to a string

//     localStorage.setItem("citySearches", JSON.stringify(citySearches));
// }


// function renderCitySearches() {
//     // Clear todoList element and update todoCountSpan
//     citySearches.innerHTML = "";
//     cityCountSpan.textContent = citySearches.length;

//     // Render a new li for each todo
//     for (var i = 0; i < citySearches.length; i++) {
//         var citySearch = citySearches[i];

//         var li = document.createElement("li");
//         li.textContent = citySearches;
//         li.setAttribute("data-index", i);

//         li.appendChild(button);
//         citySearches.appendChild(li);
//     }
// }