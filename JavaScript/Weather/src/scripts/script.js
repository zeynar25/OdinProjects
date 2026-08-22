import { fetchWeatherApi } from "openmeteo";
import HourlyData from "./HourlyData.js";
import Chart from "chart.js/auto";

let hourlyChart = null;

export async function getHourlyData(
  latitude,
  longitude,
  temperatureUnit = "Celsius",
) {
  const params = {
    latitude: latitude,
    longitude: longitude,
    timezone: "Asia/Manila",
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "wind_speed_10m",
      "shortwave_radiation",
    ],
    temperature_unit: temperatureUnit,
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  const response = responses[0];

  const elevation = response.elevation();
  const timezone = response.timezone();

  console.log(
    `\nCoordinates: ${latitude}°N ${longitude}°E`,
    `\nElevation: ${elevation}m asl`,
    `\nTimezone: ${timezone}`,
  );

  const hourly = response.hourly();
  const time = Array.from(
    {
      length:
        (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval(),
    },
    (_, i) => new Date((Number(hourly.time()) + i * hourly.interval()) * 1000),
  );
  const temperature2m = hourly.variables(0).valuesArray();
  const relativeHumidity2m = hourly.variables(1).valuesArray();
  const windSpeed10m = hourly.variables(2).valuesArray();
  const shortwaveRadiation = hourly.variables(3).valuesArray();

  const hourlyRows = time.map(
    (t, i) =>
      new HourlyData(
        t,
        temperature2m[i],
        relativeHumidity2m[i],
        windSpeed10m[i],
        shortwaveRadiation[i],
      ),
  );

  const weatherData = {
    hourly: hourlyRows,
  };

  return weatherData;
}

function formatTemperature(value, unit = "Celsius") {
  if (unit === "Fahrenheit") {
    return `${((value * 9) / 5 + 32).toFixed(1)}°F`;
  }
  return `${value.toFixed(1)}°C`;
}

function formatHumidity(value) {
  return `${Math.round(value)}%`;
}

function formatWindSpeed(value) {
  return `${value.toFixed(1)} km/h`;
}

function formatRadiation(value) {
  return `${Math.round(value)} W/m2`;
}

function formatTime(value) {
  return value.toLocaleTimeString("en-PH", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(value) {
  return value.toLocaleString("en-PH", {
    month: "short",
    day: "numeric",
  });
}

export function getFormattedHourlyRows(
  weatherData,
  count = 12,
  unit = "Celsius",
) {
  const hourly = weatherData.hourly;
  const size = Math.min(count, hourly.length);

  return Array.from({ length: size }, (_, i) => ({
    time: formatTime(hourly[i].time),
    temperature: formatTemperature(hourly[i].temperature_2m, unit),
    humidity: formatHumidity(hourly[i].relative_humidity_2m),
    wind: formatWindSpeed(hourly[i].wind_speed_10m),
    radiation: formatRadiation(hourly[i].shortwave_radiation),
  }));
}

export function renderWeatherData(
  weatherDataContainer,
  weatherData,
  count = 12,
  unit = "Celsius",
) {
  const rows = getFormattedHourlyRows(weatherData, count, unit);
  console.table(rows);

  if (hourlyChart) {
    hourlyChart.destroy();
  }

  weatherDataContainer.innerHTML = "";

  const date = document.createElement("h2");
  const forecastDate = weatherData.hourly[0]?.time
    ? formatDate(weatherData.hourly[0].time)
    : "Today";
  date.textContent = `Weather Forecast Today (${forecastDate})`;
  weatherDataContainer.appendChild(date);

  const chartContainer = document.createElement("canvas");
  chartContainer.classList.add("weather-chart");
  weatherDataContainer.appendChild(chartContainer);

  hourlyChart = new Chart(chartContainer, {
    type: "line",
    data: {
      labels: rows.map((row) => row.time),
      datasets: [
        {
          label: "Temperature",
          data: rows.map((row) => parseFloat(row.temperature)),
          borderColor: "rgba(255, 99, 132, 1)",
        },
        {
          label: "Humidity",
          data: rows.map((row) => parseFloat(row.humidity)),
          borderColor: "rgba(54, 162, 235, 1)",
        },
        {
          label: "Wind Speed",
          data: rows.map((row) => parseFloat(row.wind)),
          borderColor: "rgba(255, 205, 70, 1)",
        },
        {
          label: "Radiation",
          data: rows.map((row) => parseFloat(row.radiation)),
          borderColor: "rgba(153, 102, 255, 1)",
        },
      ],
    },
  });

  weatherDataContainer.appendChild(createTemperatureChart(rows));
  weatherDataContainer.appendChild(createHumidityChart(rows));
  weatherDataContainer.appendChild(createWindSpeedChart(rows));
  weatherDataContainer.appendChild(createRadiationChart(rows));
}

function createTemperatureChart(rows) {
  const chartContainer = document.createElement("canvas");
  chartContainer.classList.add("weather-chart");

  new Chart(chartContainer, {
    type: "line",
    data: {
      labels: rows.map((row) => row.time),
      datasets: [
        {
          label: "Temperature",
          data: rows.map((row) => parseFloat(row.temperature)),
          borderColor: "rgba(255, 99, 132, 1)",
        },
      ],
    },
  });

  return chartContainer;
}

function createHumidityChart(rows) {
  const chartContainer = document.createElement("canvas");
  chartContainer.classList.add("weather-chart");

  new Chart(chartContainer, {
    type: "line",
    data: {
      labels: rows.map((row) => row.time),
      datasets: [
        {
          label: "Humidity",
          data: rows.map((row) => parseFloat(row.humidity)),
          borderColor: "rgba(54, 162, 235, 1)",
        },
      ],
    },
  });

  return chartContainer;
}

function createWindSpeedChart(rows) {
  const chartContainer = document.createElement("canvas");
  chartContainer.classList.add("weather-chart");
  new Chart(chartContainer, {
    type: "line",
    data: {
      labels: rows.map((row) => row.time),
      datasets: [
        {
          label: "Wind Speed",
          data: rows.map((row) => parseFloat(row.wind)),
          borderColor: "rgba(255, 205, 70, 1)",
        },
      ],
    },
  });

  return chartContainer;
}

function createRadiationChart(rows) {
  const chartContainer = document.createElement("canvas");
  chartContainer.classList.add("weather-chart");

  new Chart(chartContainer, {
    type: "line",
    data: {
      labels: rows.map((row) => row.time),
      datasets: [
        {
          label: "Radiation",
          data: rows.map((row) => parseFloat(row.radiation)),
          borderColor: "rgba(153, 102, 255, 1)",
        },
      ],
    },
  });

  return chartContainer;
}
