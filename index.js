const frm = document.getElementById("frm");
const text = document.getElementById("inp_text");
const city = document.getElementById("city");
const date = document.getElementById("date");
const weather_status = document.getElementById("weather_status");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const curBtn = document.getElementById("current");
const temp = document.getElementById("temp");
let apiKey = "ce144f0cf51fa43f03431f0488a36728";
let units = "metric";
const fah = document.getElementById("fah");
const cel = document.getElementById("cel");

function displayWeather(response) {
  console.log(response);

  const Temp = Math.round(response.data.main.temp);
  console.log(Temp);
  temp.innerHTML = `${Temp}`;
  fah.onclick = () => {
    const fah = (Temp * 9) / 5 + 32;
    temp.innerText = `${Math.round(fah)}`;
  };
  cel.onclick = () => {
    const cel = ((temp.innerText - 32) * 5) / 9;
    temp.innerText = `${Math.round(cel)}`;
  };
  city.innerText = `${response.data.name}`;
  weather_status.innerText = response.data.weather[0].description;
  humidity.innerText = `${response.data.main.humidity}`;
  wind.innerText = `${response.data.wind.speed}`;
}

const showCurrentLocation = (position) => {
  console.log(position);
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
};

curBtn.onclick = (e) => {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
};

frm.onsubmit = (e) => {
  e.preventDefault();
  const city_name = text.value;
  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${apiKey}&units=${units}`;
  axios.get(cityUrl).then(displayWeather);
  e.target.reset();
};

function formatDate() {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursdsay",
    "Friday",
    "Saturday",
  ];
  const d = new Date().getDay();
  const day = dayNames[d];
  const time = new Date().toLocaleTimeString("it-IT");
  const up_time = `${time.slice(0, 5)}`;
  return `${day} ${up_time}`;
}
date.innerText = formatDate();
