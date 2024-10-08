// Function to display the pop-up
function showPopup() {
  const overlay = document.getElementById("popup-overlay");
  overlay.style.display = "flex"; // Show the pop-up
}

// Function to close the pop-up
function closePopup() {
  const overlay = document.getElementById("popup-overlay");
  overlay.style.display = "none"; // Hide the pop-up
}

// Event listener for the "Show Pop-up" button
document.getElementById("show-popup-btn").addEventListener("click", showPopup);

// Event listener for the "Close" button
document.getElementById("close-btn").addEventListener("click", closePopup);
const image = document.querySelector(".weather-box img");
const search = document.querySelector(".search-box button");
const temperature = document.querySelector(".weather-box .temperature");
const description = document.querySelector(".weather-box .description");
const humidity = document.querySelector(".weather-details .humidity span");
const wind = document.querySelector(".weather-details .wind span");

search.addEventListener("click", () => {
  const APIKey = "71b26afebfd7d4b386b67fa0f7007f04";
  const city = document.querySelector(".search-box input").value;

  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => {
      if (!response.ok) {
        showPopup();
        document.querySelector(".search-box input").value = "";
        // inputBox.value = "";
        return;
      }
      return response.json();
    })
    .then((json) => {
      console.log(json); // Log full json to inspect the structure

      // Debugging log to check if elements exist
      console.log(description, humidity, wind);

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;
        case "Clouds":
          image.src = "images/cloud.png";
          break;
        case "Mist":
          image.src = "images/mist.png";
          break;
        case "Haze":
          image.src = "images/cloud.png";
          break;
        default:
          image.src = "images/cloud.png";
      }

      // Update inner HTML with API data
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    })
    .catch((error) => console.error("Error fetching data:", error));
});
