// creating click function for search button
$("#search").on("click", function(event) {
console.log("here")

var cityName = $("#search-term").val().trim();
console.log(cityName)
// save city name to local storage
citySearches.push(cityName);
$("#search-term").val("");

storedSearches();
//renderTodos()

var APIKey = "166a433c57516f51dfab1f7edaed8413";

$.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q="+ cityName+ "&appid="+ APIKey + "&units=imperial",
    method: "GET"
}).then(function(response) {
    console.log(response);
});

});

var citySearches = [];

init();
// Grabbing previous city search from local storage
function init() {

    // Parsing the JSON string to an object
var storedSearches = JSON.parse(localStorage.getItem("citySearches"));

    // If cities were retrieved from localStorage, update the city array to it
if (storedSearches !== null) {
    citySearches = storedSearches;
    }
console.log(citySearches)
    // Render cities to the DOM
renderCitySearches();
}
function storedSearches() {
    // local storage can only save strings   --> JSON Stringify converts to a string

    localStorage.setItem("citySearches", JSON.stringify(citySearches));
}

function renderCitySearches() {
    // Clear todoList element and update todoCountSpan
    citySearches.innerHTML = "";
    cityCountSpan.textContent = citySearches.length;

    // Render a new li for each todo
    for (var i = 0; i < citySearches.length; i++) {
        var citySearches = citySearch[i];

        var li = document.createElement("li");
        li.textContent = citySearches;
        li.setAttribute("data-index", i);

        li.appendChild(button);
        citySearches.appendChild(li);
    }
}