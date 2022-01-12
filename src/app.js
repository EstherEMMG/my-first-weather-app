function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${date}  ${hour}:${minute}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <div class="card">
              <div class="card-body">
                <div class="weather-forecast-day">${formatDay(
                  forecastDay.dt
                )}</div>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" width="42"/>
                <div class="weather-forecast-temp"><span class="max-temp">${Math.round(
                  forecastDay.temp.max
                )}º</span><span class="min-temp">  ${Math.round(
          forecastDay.temp.min
        )}º</span></div>
              </div>
            </div>
          </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  let apiKey = "ed8f1b521e1ef205ffa5fdddc628ab7e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".maintemp").innerHTML = celsiusTemperature;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#kmh").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = Math.round(response.data.main.temp);

  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#find-city");
  currentPosition(input.value);
}

function currentPosition(city) {
  let apiKey = "ed8f1b521e1ef205ffa5fdddc628ab7e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
navigator.geolocation.getCurrentPosition(currentPosition);

function changeToCel(event) {
  event.preventDefault();
  let temp = document.querySelector(".maintemp");
  celsius.classList.add("active");
  fahren.classList.remove("active");
  temp.innerHTML = celsiusTemperature;
}
function changeToFah(event) {
  event.preventDefault();
  let temp = document.querySelector(".maintemp");
  celsius.classList.remove("active");
  fahren.classList.add("active");
  temp.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-city");
form.addEventListener("submit", search, displayWeatherCondition);

let fahren = document.querySelector("#fahren");
fahren.addEventListener("click", changeToFah);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeToCel);

currentPosition("Paris");
