import { saveHistory, getHistory } from "./history.js";
import { fetchWeatherData as getWeather, saveFavoriteCity } from "./weather.js";

const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const weatherDisplay = document.getElementById("weatherDisplay");
const historyList = document.getElementById("historyList");
const favoriteCitiesList = document.getElementById("favoriteCitiesList");

/**
 * Shows the weather data fetched from the API in the UI.
 */
function showWeather(data) {
  const {
    name, // The name of the city
    main, // The main weather data
    weather, // The weather conditions
  } = data;

  // Convert temperature from Kelvin to Celsius and Fahrenheit
  const temperatureInCelsius = Math.round(main.temp);
  const temperatureInFahrenheit = Math.round((temperatureInCelsius * 9) / 5 + 32);
  
  const weatherDescription = weather[0].description; // Get the description
  const icon = weather[0].icon; // Get the icon code

  // Create the HTML to display the weather data
  weatherDisplay.innerHTML = `
      <h2>Weather in ${name}</h2>
      <p>Temperature: ${temperatureInFahrenheit}°F / ${temperatureInCelsius}°C</p>
      <p>Humidity: ${main.humidity}%</p>
      <p>Condition: <i class="icon fas fa-${icon}"></i> ${weatherDescription}</p>
      <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${weatherDescription}" />
    `;
}

/**
 * Updates the search history in local storage and displays it in the UI.
 */
function updateHistory(city) {
  const history = saveHistory(city);
  displayHistory(history);
  return history;
}

/**
 * Displays the search history in the UI.
 */
function displayHistory(history) {
  historyList.innerHTML = "";
  const last5History = history.slice(-5); // Get only the last 5 items in the history array

  last5History.forEach((city) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = city;
    link.href = "#";

    link.addEventListener("click", async () => {
      cityInput.value = city;
      await searchCity(city);
    });

    li.appendChild(link);
    historyList.appendChild(li);
  });
}

/**
 * Searches for the weather in the given city and displays the result.
 */
async function searchCity(city) {
  try {
    const weatherData = await getWeather(city);
    showWeather(weatherData);
    updateHistory(city);
    document.getElementById("saveButton").style.display = "inline-block";
  } catch (error) {
    weatherDisplay.innerHTML = `<p>${error.message}</p>`;
  }
}

searchButton.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) return;
  await searchCity(city);
  weatherDisplay.style.display = "block";
});

/**
 * Initializes the app by displaying the user's search history.
 */
function init() {
  const history = getHistory();
  displayHistory(history);
}

// Function to display favorite cities as clickable links
function displayFavoriteCities(cities) {
  favoriteCitiesList.innerHTML = "";
  cities.forEach((city) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = city;
    link.href = "#";
    link.addEventListener("click", async () => {
      cityInput.value = city;
      await searchCity(city); // Fetch and display weather data for the favorite city
    });
    li.appendChild(link);
    favoriteCitiesList.appendChild(li);
  });
}

// Add favorite city saving functionality
document.getElementById("saveButton").addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    const response = await saveFavoriteCity(city);
    alert(`Saved ${response.city} as a favorite!`);

    // Update favorite cities display
    const favoriteCities = [
      ...new Set([
        city,
        ...Array.from(favoriteCitiesList.children).map((li) => li.textContent),
      ]),
    ]; // Avoid duplicates
    displayFavoriteCities(favoriteCities);
  } catch (error) {
    alert(error.message);
  }
});

init();
