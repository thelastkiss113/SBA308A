import { saveHistory, getHistory } from './history.js';
import { fetchWeatherData as getWeather } from './weather.js';
import { saveFavoriteCity } from './weather.js';

const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherDisplay = document.getElementById('weatherDisplay');
const historyList = document.getElementById('historyList');

function showWeather(data) {
    const { name, main, weather } = data;
    const iconClass = getIconClass(weather[0].main);
    const temperatureInCelsius = Math.round(main.temp);
    const temperatureInFahrenheit = Math.round((temperatureInCelsius * 9/5) + 32);
    weatherDisplay.innerHTML = `
      <h2>Weather in ${name}</h2>
      <p>Temperature:  ${temperatureInFahrenheit}°F / ${temperatureInCelsius}°C /
      <p>Humidity: ${main.humidity}% </p>
      <p>Condition: <i class="${iconClass} icon"></i> ${weather[0].description}</p>
    `;
  }
/**
 * Adds a city to the local storage history, if it doesn't already exist there.
 * @param {string} city - the city to be added
 * @returns {string[]} the updated history
 */
function updateHistory(city) {
    const history = saveHistory(city);
    displayHistory(history);
    return history;
}


/**
 * Displays the local storage history as an unordered list.
 * Each item in the list is a link that when clicked, will search for the city.
 */
function displayHistory(history) {
    historyList.innerHTML = '';
    history.forEach(city => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = city;
        link.href = "#";
        link.addEventListener('click', async () => {
            // When the link is clicked, populate the input field with the city name
            // and search for the city.
            cityInput.value = city;
            await searchCity(city);
        });
        li.appendChild(link);
        historyList.appendChild(li);
    });
}


/**
 * Searches for the weather data for the given city
 */
async function searchCity(city) {
    try {
        const weatherData = await getWeather(city);
        showWeather(weatherData);
        // Update the history after the weather data is successfully retrieved
        updateHistory(city);
    } catch (error) {
        // In case of an error, show the error message in the weatherDisplay
        weatherDisplay.innerHTML = `<p>${error.message}</p>`;
    }
}


searchButton.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    await searchCity(city);
    document.getElementById('weatherDisplay').style.display = 'block';
  });
/**
 * Returns a Font Awesome class name for the given weather condition.
 * @param {string} condition - The weather condition for which to return the icon.
 * @returns {string} The Font Awesome class name for the given weather condition.
 */
function getIconClass(condition) {
    switch (condition) {
        case 'Clear':
            return 'fas fa-sun';
        case 'Clouds':
            return 'fas fa-cloud';
        case 'Rain':
            return 'fas fa-cloud-showers-heavy';
        case 'Snow':
            return 'fas fa-snowflake';
        default:
            return 'fas fa-question-circle';
    }
}

//save button

// Add a button for saving favorite cities
const saveButton = document.createElement('button');
saveButton.textContent = 'Save as Favorite';
document.getElementById('app').appendChild(saveButton);

// Add an event listener to the save button
saveButton.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    
    try {
        const response = await saveFavoriteCity(city);
        alert(`Saved ${response.city} as a favorite!`);
    } catch (error) {
        alert(error.message);
    }
});




/**
 * Initializes the application by retrieving the search history from local storage
 * and displaying it as an unordered list.
 */
function init() {
    // Retrieve the search history from local storage and display it in the page
    const history = getHistory();
    displayHistory(history);
}


init();


