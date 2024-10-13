/**
 * Saves the given city to the user's search history in local storage.
 */
export function saveHistory(city) {
  let history = getHistory();
  if (!history.includes(city)) {
    history.push(city);
    if (history.length > 5) {
      history = history.slice(1); // remove the oldest item
    }
    localStorage.setItem("weatherSearchHistory", JSON.stringify(history));
  }
  return history;
}
/**
 * Gets the user's search history from local storage.
 */
export function getHistory() {
  const history = localStorage.getItem("weatherSearchHistory");
  return history ? JSON.parse(history) : [];
}
