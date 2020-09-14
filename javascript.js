$(document).ready(function() {
    $("#search-button").on("click", function() {

    })
    $(".history").on("click", "li", function() {

    })

    function makeRow(text) {
        var li = $("<li>").addClass("list-group-itm list-group-item-action").text(text);
        $(".history").append(li);
    }
    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    function searchWeather(searchValue) {
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q="+ searchValue + "&appid="+ APIKey + "&units=imperial",
            dataType: "json",
            success: function(data) {
                if(history.indexOf(searchValue) === -1) {
                    history.push(searchValue);
                    window.localStorage.setItem("history", JSON.stringify(history));

                    makeRow(searchValue);
                }

                $("#today").empty();

                var title = $("<h3>").addClass("card-title").text(data.name + " (" + new DataCue().toLocaleDate);
                var card = $("<div>").addClass("card");
                var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + "MPH");
                var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
                var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp);
                var cardBody = $("<div>").addClass("card-body");
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon)

                title.append(img);
                cardBody.append(title, temp, humid, wind);
                card.append(cardBody);
                $("#today").append(card);

                getForecast(searchValue);
                getUVIndex(data.coord.lat, data.coord.long);

            }
        })
    }
    
    function getForecast(searchValue) {
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q="+ searchValue+ "&appid="+ APIKey + "&units=imperial",
            dataType: "json",
            success: function(data) {
                $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");

                for (var i = 0; i < data.list.length; i++) {
                    if (data.list[i].dt_txt.indexOf("15:00:00") !==-1) {
                        var col = $("<div>").addClass("col-md-2");
                        var card = $("<div>").addClass("card bg-primary text-white");
                        var body = $("<div>").addClass("card-body p-2");
                        var title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDate);

                        var img = $("<img>").attr("src", "http://openweathermarp.org/img/w/" + data.list[i].weather);
                        // left off here
                    }
                }
            }
        })
    };

    var history = JSON.parse(window.localStorage.getItem("history")) || [];

    if (history.length > 0) {
        searchWeather(history[history.length-1]);

    }
    for (var i = 0; i < history.length; i++) {
        makeRow(history[i]);
    }
});



















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