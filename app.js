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

  /**
   * Get the icon class for the weather condition.
   */
  const iconClass = getIconClass(weather[0].main);

  /**
   * Convert the temperature from Kelvin to Celsius and Fahrenheit.
   */
  const temperatureInCelsius = Math.round(main.temp);
  const temperatureInFahrenheit = Math.round(
    (temperatureInCelsius * 9) / 5 + 32
  );

  /**
   * Create the HTML to display the weather data.
   */
  weatherDisplay.innerHTML = `
      <h2>Weather in ${name}</h2>
      <p>Temperature: ${temperatureInFahrenheit}°F / ${temperatureInCelsius}°C</p>
      <p>Humidity: ${main.humidity}%</p>
      <p>Condition: <i class="${iconClass} icon"></i> ${weather[0].description}</p>
    `;
}

/**
 * Updates the search history in local storage and displays it in the UI.
 */
function updateHistory(city) {
  // Get the current search history from local storage
  const history = saveHistory(city);

  // Display the updated search history in the UI
  displayHistory(history);

  // Return the updated search history
  return history;
}

/**
 * Displays the search history in the UI.
 */
function displayHistory(history) {
  historyList.innerHTML = "";
  const last5History = history.slice(-5); // get the last 5 items in the history array

  // Loop through the last 5 items in the history array
  last5History.forEach((city) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = city;
    link.href = "#";

    // Add an event listener to each link
    link.addEventListener("click", async () => {
      cityInput.value = city;
      await searchCity(city);
    });

    // Append the link to each list item
    li.appendChild(link);
    historyList.appendChild(li);
  });
}

/**
 * Searches for the weather in the given city and displays the result.
 */
async function searchCity(city) {
  try {
    // Get the weather data from the API
    const weatherData = await getWeather(city);
    // Display the weather data in the UI
    showWeather(weatherData);
    // Update the search history
    updateHistory(city);
    // Show the save button
    document.getElementById("saveButton").style.display = "inline-block";
  } catch (error) {
    // Handle any errors that may occur
    weatherDisplay.innerHTML = `<p>${error.message}</p>`;
  }
}

searchButton.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) return;
  await searchCity(city);
  document.getElementById("weatherDisplay").style.display = "block";
});

/**
 * Returns the Font Awesome icon class for the given weather condition.
 */
function getIconClass(weatherCondition) {
  // Switch statement to determine the icon class based on the weather condition
  switch (weatherCondition) {
    // Clear weather
    case "Clear":
      return "fas fa-sun fa-2x";
    // Cloudy weather
    case "Clouds":
      return "fas fa-cloud";
    // Rainy weather
    case "Rain":
      return "fas fa-cloud-showers-heavy";
    // Snowy weather
    case "Snow":
      return "fas fa-snowflake";
    // Default icon for unknown weather conditions
    default:
      return "fas fa-question-circle";
  }
}

/**
 * Initializes the app by displaying the user's search history.
 */
function init() {
  const history = getHistory();
  // Display the user's search history in the UI
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
