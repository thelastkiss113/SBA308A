const apiKey = 'Y8d70c99c11d66feefd0e7fdcc0b19a36';

export async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('City not found');
    }

    return await response.json();
}
