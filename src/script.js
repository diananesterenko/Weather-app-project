
const apiKey= `2f0dea016bed96ccfde24c9fe8409b1f`;
let form_input = document.querySelector("#forminput");
function formatDayMain(timestamp){
  let date = new Date(timestamp);
  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
  let day = days[date.getDay()];
  return day
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  
  
  return ` ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function choosePicure(icon) {
  let pic = "";
  switch (icon) {
    case "01d":
      pic = `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/829/original/4bbff76d-be9d-44f1-824f-9f9a0a8c5435__6951FEE_.png?1657297967`;
      break;
    case "01n":
      pic = `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/829/original/4bbff76d-be9d-44f1-824f-9f9a0a8c5435__6951FEE_.png?1657297967`;
      break;
    case "02d":
      pic = `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/040/020/original/5.png?1657469871`;
      break;
    case "02n":
      pic = `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/040/020/original/5.png?1657469871`;
      break;
    case "03d":
      pic = `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/040/017/original/3.png?1657469842`;

      break;
    case "03n":
      pic = `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/040/017/original/3.png?1657469842`;

      break;
    case "04d":
      pic = `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/040/019/original/4.png?1657469863`;

      break;
    case "04n":
      pic = `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/040/019/original/4.png?1657469863`;

      break;
    case "09d":
      pic = `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/040/024/original/9.png?1657469899`;

      break;
    case "09n":
      pic = `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/040/024/original/9.png?1657469899`;

      break;
    case "10d":
      pic = `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/040/021/original/6.png?1657469878`;

      break;
    case "10n":
      pic = `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/040/021/original/6.png?1657469878`;

      break;
    case "11d":
      pic = `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/040/018/original/2.png?1657469850`;

      break;
    case "11n":
      pic = `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/040/018/original/2.png?1657469850`;

      break;
    case "13d":
      pic = `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/040/022/original/7.png?1657469884`;

      break;
    case "13n":
      pic = `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/040/022/original/7.png?1657469884`;

      break;
    case "50d":
      pic = `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/040/023/original/8.png?1657469891`;

      break;
    case "50n":
      pic = `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/040/023/original/8.png?1657469891`;

      break;
  }
  return pic;
}

function searchCity(city){
  
  console.log(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => displayWeather(data))

  
}

function searchLocation(position){
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => displayWeather(data))
  
}

function displayWeather(response){
  console.log(response);
  celciusTemp = response.main.temp;
  document.querySelector("#dateElem").innerHTML= `<br><hr> ${formatDate(response.dt*1000)}`;
  document.querySelector("#day").textContent= formatDayMain(response.dt*1000);
  document.querySelector("#city").textContent= response.name;
  document.querySelector("#degrees").textContent= Math.round(response.main.temp);
  document.querySelector("#wind").textContent= `${Math.round(response.wind.speed)} km/h`;
  document.querySelector("#humidity").textContent= `${response.main.humidity} %`;
  document.querySelector("#description").textContent= response.weather[0].description;
  document.querySelector("#lowTemp").textContent= Math.round(response.main.temp_min);
  document.querySelector("#highTemp").textContent= Math.round(response.main.temp_max);
  document.querySelector("#sunrise").textContent = formatDate(response.sys.sunrise*1000);
  document.querySelector("#sunset").textContent = formatDate(response.sys.sunset*1000);
  document.querySelector("#feels").textContent= `${Math.round(response.main.feels_like)}°C`;
  let mainIcon= document.querySelector("#weather-icon");
  mainIcon.setAttribute("alt", response.weather[0].description);
  mainIcon.setAttribute("src", choosePicure(response.weather[0].icon));
  getForecast(response.coord);
  displayWeekForecast();
}

function getForecast(coordinates){
  
  
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`)
  .then(response => response.json())
  .then(data => displayWeekForecast(data))
 
  console.log(apiUrl);
}

function displayWeekForecast(response){
  let weekForecastElem= document.querySelector("#week-forecast");
  let forecast = response.daily;
  let forecastHTML= `<div class="row">`;
  forecast.forEach(function(forecastDay, index){
    if(index<6){
    forecastHTML += ` 
    
      <div class="col2">
      <div class="week-forecast-date">${formatDay(forecastDay.dt)}</div>
       <img id="weekIcon"src="${choosePicure(forecastDay.weather[0].icon)}" alt="" width="42">
      <div class="week-forecast-temperatures">
          <span class="week-forecast-tempMax"> ${Math.round(forecastDay.temp.max)}° </span>
         <span class="week-forecast-tempMin"> ${Math.round(forecastDay.temp.min)}° </span>
      </div>
      </div>`;
    }
  })
  forecastHTML= forecastHTML + `</div>`
  weekForecastElem.innerHTML = forecastHTML;
  
}

function displayCurrentWeather(){
 
  navigator.geolocation.getCurrentPosition(searchLocation);
}
displayCurrentWeather( );
function handleSubmit(event) {
    
  event.preventDefault();
  let cityInput= document.querySelector("#search");
  let city= cityInput.value;
  searchCity(city);  
}

form_input.addEventListener("submit", handleSubmit);
let farinh = document.querySelector("#farenheit");
let celciy = document.querySelector("#celcium");
let currentELement = document.querySelector("#current");
let celciusTemp = null;

currentELement.addEventListener("click", displayCurrentWeather);


celciy.classList.add("active");

function showfarenh(event) {
  event.preventDefault();
  let currentdegree = document.querySelector("#degrees");
  celciy.classList.remove("active");
  farinh.classList.add("active");

  let tmp = celciusTemp * 1.8 + 32;
  currentdegree.textContent = Math.round(tmp);
}
function showcelc() {
  let currentdegree = document.querySelector("#degrees");
  farinh.classList.remove("active");
  celciy.classList.add("active");

  currentdegree.textContent = Math.round(celciusTemp);
}
farinh.addEventListener("click", showfarenh);
celciy.addEventListener("click", showcelc);