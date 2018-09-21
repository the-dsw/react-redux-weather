import React, { Component } from "react";
import { connect } from "react-redux";
import Chart from "../components/chart";
import GoogleMap from "../components/google_map";

class WeatherList extends Component {
  renderWeather(cityData) {
    const { name } = cityData.city;
    const temps = cityData.list.map(weather => weather.main.temp);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);
    const { lat, lon } = cityData.city.coord;

    return (
      <tr key={name}>
        {/* <td>{name}</td> */}
        <td>
          <GoogleMap lat={lat} lon={lon} />
        </td>
        <td>
          <Chart color="orange" data={temps} units="°C" />
        </td>
        <td>
          <Chart color="green" data={pressures} units="hPa" />
        </td>
        <td>
          <Chart color="black" data={humidities} units="%" />
        </td>
      </tr>
    );
  }

  render() {
    const { weather } = this.props;

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (°C)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>{weather.map(this.renderWeather)}</tbody>
      </table>
    );
  }
}
function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);
