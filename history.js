/**
 * Adds a city to the local storage history, if it doesn't already exist there.
 * @param {string} city - the city to be added
 * @returns {string[]} the updated history
 */
export function saveHistory(city) {
    let history = getHistory();
    if (city != null && !history.includes(city)) {
        history.push(city);
        localStorage.setItem('weatherSearchHistory', JSON.stringify(history));
    }
    return history;
}

export function getHistory() {
    const history = localStorage.getItem('weatherSearchHistory');
    return history ? JSON.parse(history) : [];
}