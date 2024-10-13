export function saveHistory(city) {
    let history = getHistory();
    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem('weatherSearchHistory', JSON.stringify(history));
    }
    return history;
}

export function getHistory() {
    const history = localStorage.getItem('weatherSearchHistory');
    return history ? JSON.parse(history) : [];
}
