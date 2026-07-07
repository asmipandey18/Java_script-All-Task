//1.Create a Promise
const system = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("System Ready");
    },);
});

system
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });


// Weather API URL (Declare only once)
const url =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,wind_speed_10m";


// 2.Fetch API using .then() and .catch()
fetch(url)

    // Convert response to JSON
    .then((response) => {

        if (!response.ok) {
            throw new Error("Failed to fetch weather data.");
        }

        return response.json();

    })

    // Display current weather
    .then((data) => {

        console.log("\nTask 2:");
        console.log(data.current_weather);

    })

    // Handle errors
    .catch((error) => {

        console.error(error.message);

    });

// 3.Async/Await with Try/Catch
async function getWeather() {

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch weather data.");
        }

        const data = await response.json();

        console.log("\nTask 3:");
        console.log(data.current_weather);

    } catch (error) {

        console.error(error.message);

    }

}

getWeather();

// 4. Use .map()
async function weatherMap() {

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch weather data.");
        }

        const data = await response.json();

        // Combine time and temperature arrays
        const weatherData = data.hourly.time.map((time, index) => {

            return {

                time: time,
                temperature: data.hourly.temperature_2m[index]

            };

        });

        console.log("\nTask 4:");
        console.log(weatherData);

    } catch (error) {

        console.error(error.message);

    }

}

weatherMap();

// 5.Use .filter()
async function filterTemperature() {

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch weather data.");
        }

        const data = await response.json();

        // Create array of objects
        const weatherData = data.hourly.time.map((time, index) => ({
            time,
            temperature: data.hourly.temperature_2m[index]
        }));

        // Filter temperatures above 20°C
        const above20 = weatherData.filter((item) => {
            return item.temperature > 20;
        });

        console.log("\nTask 5:");
        console.log(above20);

    } catch (error) {

        console.error(error.message);

    }

}

filterTemperature();

// 6.Use .find()
async function findTemperature() {

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch weather data.");
        }

        const data = await response.json();

        // Create array of objects
        const weatherData = data.hourly.time.map((time, index) => ({
            time,
            temperature: data.hourly.temperature_2m[index]
        }));

        // Find first temperature below 10°C
        const below10 = weatherData.find((item) => {
            return item.temperature < 16;
        });

        console.log("\nTask 6:");
        console.log(below10);

    } catch (error) {

        console.error(error.message);

    }

}

findTemperature();

// 7.Nested Promise (.then())
// London API
const londonUrl =
"https://api.open-meteo.com/v1/forecast?latitude=51.50&longitude=-0.11&current_weather=true";

// Paris API
const parisUrl =
"https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current_weather=true";

function nestedWeather() {

    // Fetch London weather
    fetch(londonUrl)

        .then((response) => {

            if (!response.ok) {
                throw new Error("Failed to fetch London weather.");
            }

            return response.json();

        })

        .then((londonData) => {

            // Fetch Paris weather inside London .then()
            fetch(parisUrl)

                .then((response) => {

                    if (!response.ok) {
                        throw new Error("Failed to fetch Paris weather.");
                    }

                    return response.json();

                })

                .then((parisData) => {

                    console.log("\nTask 7:");

                    console.log({
                        londonTemperature: londonData.current_weather.temperature,
                        parisTemperature: parisData.current_weather.temperature
                    });

                })

                .catch((error) => {
                    console.error(error.message);
                });

        })

        .catch((error) => {
            console.error(error.message);
        });

}

nestedWeather();

// 8.Async/Await Sequential
async function sequentialWeather() {

    try {

        // Fetch London weather
        const londonResponse = await fetch(londonUrl);

        const londonData = await londonResponse.json();

        // Fetch Paris weather after London finishes
        const parisResponse = await fetch(parisUrl);

        const parisData = await parisResponse.json();

        console.log("\nTask 8:");

        console.log({
            londonTemperature: londonData.current_weather.temperature,
            parisTemperature: parisData.current_weather.temperature
        });

    } catch (error) {

        console.error(error.message);

    }

}

sequentialWeather();

//9.Promise.all()
// ==========================================
// Task 9: Promise.all()
// ==========================================

// Tokyo API
const tokyoUrl =
"https://api.open-meteo.com/v1/forecast?latitude=35.68&longitude=139.69&current_weather=true";

// New York API
const newYorkUrl =
"https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.00&current_weather=true";

// Sydney API
const sydneyUrl =
"https://api.open-meteo.com/v1/forecast?latitude=-33.86&longitude=151.20&current_weather=true";

async function parallelWeather() {

    try {

        // Fetch all cities together
        const responses = await Promise.all([
            fetch(tokyoUrl),
            fetch(newYorkUrl),
            fetch(sydneyUrl)
        ]);

        // Convert all responses to JSON
        const weatherData = await Promise.all(
            responses.map((response) => response.json())
        );

        console.log("\nTask 9:");

        console.log(weatherData);

    } catch (error) {

        console.error(error.message);

    }

}

parallelWeather();

// 10. Ultimate Weather Pipeline
const weatherUrls = [
    tokyoUrl,
    newYorkUrl,
    sydneyUrl
];

async function weatherPipeline() {

    try {

        // Fetch all locations simultaneously
        const responses = await Promise.all(

            weatherUrls.map((url) => fetch(url))

        );

        // Convert every response into JSON
        const weatherData = await Promise.all(

            responses.map((response) => response.json())

        );

        // Create simplified objects
        const simplifiedData = weatherData.map((item, index) => {

            return {

                id: index + 1,

                currentTemp: item.current_weather.temperature,

                windSpeed: item.current_weather.windspeed

            };

        });

        console.log("\nTask 10:");

        console.log(simplifiedData);

        // Find first location with wind speed greater than 15
        const windyLocation = simplifiedData.find((item) => {

            return item.windSpeed > 15;

        });

        console.log("\nLocation with wind speed greater than 15 km/h:");

        console.log(windyLocation);

    } catch (error) {

        console.error(error.message);

    }

}

weatherPipeline();