let now = new Date();
let date = now.getDate();
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
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let todayDate = document.querySelector("#today-date");
todayDate.innerHTML = `${day} ${date}  ${hour}:${minute}`;

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
}

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#find-city").value;
  let apiKey = "ed8f1b521e1ef205ffa5fdddc628ab7e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
let form = document.querySelector("#search-city");
form.addEventListener("submit", search, displayWeatherCondition);

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
let fahren = document.querySelector("#fahren");
fahren.addEventListener("click", changeToFah);
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeToCel);

function currentPosition(position) {
  let apiKey = "ed8f1b521e1ef205ffa5fdddc628ab7e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=position.coords.latitude&lon=position.coords.longitude&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
navigator.geolocation.getCurrentPosition(currentPosition);

let celsiusTemperature = null;

search("Paris");
