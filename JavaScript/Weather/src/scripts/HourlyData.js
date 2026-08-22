export default class HourlyData {
  constructor(
    time,
    temperature_2m,
    relative_humidity_2m,
    wind_speed_10m,
    shortwave_radiation,
  ) {
    this.time = time;
    this.temperature_2m = temperature_2m;
    this.relative_humidity_2m = relative_humidity_2m;
    this.wind_speed_10m = wind_speed_10m;
    this.shortwave_radiation = shortwave_radiation;
  }
}
