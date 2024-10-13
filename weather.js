const apiKey = "8d70c99c11d66feefd0e7fdcc0b19a36";

/*************  ✨ Codeium Command 🌟  *************/
/**
 * Fetches weather data from OpenWeatherMap API
 *
 */
export async function fetchWeatherData(city) {
  // Construct the URL for the API request
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Make the request to the API
  const response = await fetch(url);

  // Check if the response was successful
  if (!response.ok) {
    // Throw an error if the response was not successful
    throw new Error("City not found");
  }

  // Return the JSON response from the API
  return await response.json();
}
/******  0f45fa0a-38d4-446c-832d-66d0005fd19a  *******/

// New function to save a favorite city
export async function saveFavoriteCity(city) {
  const url = "https://jsonplaceholder.typicode.com/posts"; // Example endpoint
  const data = {
    city: city,
    userId: 1, // You can use this to relate to a user
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to save favorite city");
  }

  return await response.json(); // Return the response data
}
