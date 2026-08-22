import {
  getFormattedHourlyRows,
  getHourlyData,
  renderWeatherData,
} from "./scripts/script.js";

import "./styles.css";

const temperatureUnitSelect = document.getElementById("temperature-unit");
temperatureUnitSelect.addEventListener("change", async (event) => {
  const selectedUnit = event.target.value;
  if (selectedUnit === "celsius" || selectedUnit === "fahrenheit") {
    console.log("Selected Temperature Unit:", selectedUnit);

    const newWeatherData = await getHourlyData(
      13.4088,
      122.5615,
      selectedUnit === "celsius" || selectedUnit === "Celsius"
        ? "celsius"
        : "fahrenheit",
    );

    renderWeatherData(
      hourlyWeatherContainer,
      newWeatherData,
      24,
      temperatureUnitSelect.value,
    );
  } else {
    console.error("Invalid temperature unit selected:", selectedUnit);
  }
});

const weatherData = await getHourlyData(
  13.4088,
  122.5615,
  temperatureUnitSelect.value,
);

// const weatherDataContainer = document.querySelector("#weather-data");
const hourlyWeatherContainer = document.getElementById("hourly-weather");
renderWeatherData(
  hourlyWeatherContainer,
  weatherData,
  24,
  temperatureUnitSelect.value,
);
