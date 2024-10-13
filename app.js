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

