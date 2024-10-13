import { saveHistory, getHistory } from './history.js';
import { getWeather } from './weather.js';

const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherDisplay = document.getElementById('weatherDisplay');
const historyList = document.getElementById('historyList');

/**
 * Shows the weather data in the UI
 * 
 */
function showWeather(data) {
    const { name, main, weather } = data;
    const iconClass = getIconClass(weather[0].main);
    weatherDisplay.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${main.temp} C</p>
        <p>Condition: <i class="${iconClass} icon"></i> ${weather[0].description}</p>
    `;
}

/*
 * Updates the search history when a new search is made
 */

function updateHistory(city) {
    // Get the current history from local storage
    const history = saveHistory(city);
    // Display the history in the UI
    displayHistory(history);
}

/**
 * Displays the search history in the UI
 */
function displayHistory(history) {
    // Clear the current history list
    historyList.innerHTML = '';
    // Loop through the history array and add each one to the list
    history.forEach(city => {
        const li = document.createElement('li');
        // Add the city name to the list item
        li.textContent = city;
        // Add the list item to the history list
        historyList.appendChild(li);
    });
}


searchButton.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
        const weatherData = await getWeather(city);
        showWeather(weatherData);
        updateHistory(city);
    } catch (error) {
        weatherDisplay.innerHTML = `<p>${error.message}</p>`;
    }
});

/**
 * Initializes the app by displaying the saved history in the UI
 */

function init() {
    // Get the current history from local storage
    const history = getHistory();
    // Display the history in the UI
    displayHistory(history);
}

init();

/**
 * Returns the class name of the Font Awesome icon that
 * corresponds to the given weather condition.
 */

function getIconClass(condition) {
    switch (condition) {
        // Clear weather
        case 'Clear':
            return 'fas fa-sun';
        // Cloudy weather
        case 'Clouds':
            return 'fas fa-cloud';
        // Rainy weather
        case 'Rain':
            return 'fas fa-cloud-showers-heavy';
        // Snowy weather
        case 'Snow':
            return 'fas fa-snowflake';
        // Unknown or other weather
        default:
            return 'fas fa-question-circle';
    }
}


