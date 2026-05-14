// DOM Elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

const apiKey = "d64ab0aac5d6fddede6262ade0decd06"; 
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

// Check the current city displayed 
let currentCity = "";

async function fetchWeather(city) {
  const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);          
  const data = await response.json();
  return data;  ``
}

function createWeatherCard(data) {
  if (data.cod !== 200) {
    alert("City not found!");
    return;
  }

  const card = document.createElement("div");
  card.className = "weather-card";

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  card.innerHTML = `
    <div class="city">
      ${data.name} 
      <span style="background-color:#FFA500;color:white;padding:2px 4px;border-radius:5px;">
        ${data.sys.country}
      </span>

      <button class="delete-btn">X</button>
    </div>

    <div class="temp">${Math.round(data.main.temp)}°C</div>

    <div class="icon" style="font-size:20px;">
      <img src="${iconUrl}" alt="${data.weather[0].description}">
    </div>

    <div class="desc">${data.weather[0].description.toUpperCase()}</div>

    <div class= "humidity">Humidity: ${data.main.humidity}%</div>
  `;

  // Replace previous card
  weatherResult.innerHTML = "";

    // Delete button 
  const deleteBtn = card.querySelector(".delete-btn");

  deleteBtn.addEventListener("click", () => {
    card.remove();
    currentCity = "";
  });

  weatherResult.appendChild(card);
}

searchBtn.addEventListener("click", async () => {

  const city = cityInput.value.trim().toLowerCase();
  if (!city) return;

  // Check if the same city is already displayed on the screeen
  if (city === currentCity) {
    alert("City already displayed");
    return;
  }

  const data = await fetchWeather(city);
  createWeatherCard(data);

  // Update current city
  currentCity = city;

  cityInput.value = "";
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
