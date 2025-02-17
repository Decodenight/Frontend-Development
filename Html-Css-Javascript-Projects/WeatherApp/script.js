const API_KEY = '83c845d70f6a66aefd801c6866d19e8e'; // Replace with your API key
        let savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];

        // Initialize the dashboard
        window.onload = function() {
            displaySavedCities();
            if (savedCities.length > 0) {
                getWeather(savedCities[0]);
            }
        };

        // Add a new city
        function addCity() {
            const cityInput = document.getElementById('cityInput');
            const city = cityInput.value.trim();
            
            if (city && !savedCities.includes(city)) {
                savedCities.push(city);
                localStorage.setItem('savedCities', JSON.stringify(savedCities));
                displaySavedCities();
                getWeather(city);
                cityInput.value = '';
            }
        }

        // Delete a city
        function deleteCity(city) {
            savedCities = savedCities.filter(c => c !== city);
            localStorage.setItem('savedCities', JSON.stringify(savedCities));
            displaySavedCities();
            if (savedCities.length > 0) {
                getWeather(savedCities[0]);
            } else {
                document.getElementById('weatherDetails').innerHTML = '';
            }
        }

        // Display saved cities
        function displaySavedCities() {
            const citiesList = document.getElementById('citiesList');
            citiesList.innerHTML = savedCities.map(city => `
                <div class="city-item">
                    <span onclick="getWeather('${city}')" style="cursor: pointer">${city}</span>
                    <button class="delete-btn" onclick="deleteCity('${city}')">Delete</button>
                </div>
            `).join('');
        }

        // Fetch weather data
        async function getWeather(city) {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
                );
                const data = await response.json();
                
                document.getElementById('weatherDetails').innerHTML = `
                    <h3>${city}</h3>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                `;
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }

        // Add city when Enter key is pressed
        document.getElementById('cityInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addCity();
            }
        });