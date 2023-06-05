
let currentTime = new Date();
let hours= currentTime.getHours();
let minutes = currentTime.getMinutes();
let day = currentTime.getDay();
let hoursElement = document.querySelector("#hours");
let minutesElement = document.querySelector("#minutes");
let dayElement = document.querySelector("#day");
let form_input = document.querySelector("#forminput");
if (hours < 10) hours = `0${hours}`;
if (minutes < 10) minutes = `0${minutes}`;
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thuersday", "Friday", "Saturdayy"] ;
hoursElement.innerHTML = hours;
minutesElement.innerHTML = minutes;
dayElement.innerHTML = days[day];

function searchCity(city){
  let apiKey= `2f0dea016bed96ccfde24c9fe8409b1f`;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => displayWeather(data))

  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  //axios.get(apiUrl).then(displayWeather);
}

function searchLocation(position){
  let apiKey= `2f0dea016bed96ccfde24c9fe8409b1f`;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => displayWeather(data))
  
}

function displayWeather(response){
  console.log(response);
  document.querySelector("#city").innerHTML= response.name;
  document.querySelector("#degrees").innerHTML= Math.round(response.main.temp);
  document.querySelector("#wind").innerHTML= Math.round(response.wind.speed);
  document.querySelector("#humidity").innerHTML= response.main.humidity;
  document.querySelector("#description").innerHTML= response.weather[0].description;
  document.querySelector("#weather-icon").innerHTML= response.weather[0].icon;
  document.querySelector("#lowTemp").innerHTML= Math.round(response.main.temp_min);
  
  document.querySelector("#highTemp").innerHTML= Math.round(response.main.temp_max);
  
  

}

function displayCurrentWeather(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function handleSubmit(event) {
    
  event.preventDefault();
  let cityInput= document.querySelector("#search");
  let city= cityInput.value;
  searchCity(city);  
}

form_input.addEventListener("submit", handleSubmit);

let currentELement = document.querySelector("#current");
currentELement.addEventListener("click", displayCurrentWeather);