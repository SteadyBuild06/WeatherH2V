const searchBtn = document.getElementById('search-btn');
const apiKey = "bd47012064591c371dce1fb509ec5190"; 

searchBtn.addEventListener('click', () => {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim(); // .trim() removes accidental spaces
    
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name first!");
    }
});

async function getWeather(city) {
    // We use encodeURIComponent to handle cities with spaces (e.g., "New York")
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            // Specific error handling for 404s
            if(response.status === 404) throw new Error("City not found. Check the spelling!");
            throw new Error("API Error: " + response.status);
        }

        const data = await response.json();
        
        // DEBUG: Check your console (F12) to see if 'temp' looks like Celsius (e.g. 25) or Kelvin (e.g. 298)
        console.log("Weather Data Received:", data);
        
        displayData(data);

    } catch (error) {
        console.error("Fetch Error:", error);
        alert(error.message);
    }
}

function displayData(data) {
    const cityNameEl = document.getElementById('city-name');
    const tempEl = document.getElementById('temp');
    const descEl = document.getElementById('description');

    // Verification: If the API ignored &units=metric, we manually convert Kelvin to Celsius
    let temperature = data.main.temp;
    if (temperature > 100) { 
        // This is a safety check: if temp is > 100, it's definitely Kelvin
        temperature = temperature - 273.15;
    }

    cityNameEl.innerText = data.name;
    // Using .toFixed(1) gives you "22.5°C" instead of just "23°C" for better accuracy
    tempEl.innerText = `${temperature.toFixed(1)}°C`;
    descEl.innerText = data.weather[0].description;
}