const apiKey = 'Y8d70c99c11d66feefd0e7fdcc0b19a36';

export async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
        throw new Error('City not found');
    }
    return await response.json();
}