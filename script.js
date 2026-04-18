const searchBtn = document.getElementById('search-btn');
const apiKey = "bd47012064591c371dce1fb509ec5190"; // Put your key from Phase 2 here

searchBtn.addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name first!");
    }
});

// This is the function that talks to the server
async function getWeather(city) {
    // 1. We construct the URL with your city and key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        // 2. Fetch the data (Waiting for the server to reply)
        const response = await fetch(url);
        
        // 3. Check if the city was found
        if (!response.ok) {
            throw new Error("City not found");
        }

        // 4. Convert the raw data into a readable JavaScript Object
        const data = await response.json();
        
        // 5. Send that data to our UI
        displayData(data);

    } catch (error) {
        console.error(error);
        alert("Error: " + error.message);
    }
}

// This function "injects" the data into your HTML
function displayData(data) {
    document.getElementById('city-name').innerText = data.name;
    document.getElementById('temp').innerText = Math.round(data.main.temp) + "°C";
    document.getElementById('description').innerText = data.weather[0].description;
}