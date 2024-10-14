const apiKey = "8d70c99c11d66feefd0e7fdcc0b19a36";

/**
 * Fetches weather data from OpenWeatherMap API
 */
export async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('City not found');
    }

    return await response.json();
}

// New function to save a favorite city
export async function saveFavoriteCity(city) {
  const url = "https://jsonplaceholder.typicode.com/posts"; // POST request endpoint
  const data = {
    city: city,
    userId: 1, 
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error saving favorite city");
  }

  return await response.json(); // Return the response data
}
