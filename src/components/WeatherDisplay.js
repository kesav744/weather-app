import "./WeatherDisplay.css";
import Button from "../re-use/Button";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { styled } from "@mui/system";

const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "#2997F9",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#0D6EC3",
    },
  },
}));

const WeatherDisplay = ({ weather, forecast, unit, setUnit, addFavorite }) => {
  // const toggleUnit = () => {
  //   setUnit(unit === "metric" ? "imperial" : "metric");
  // };

  return (
    <div className="weather-display">
      <h2>{weather.name}</h2>
      <p>
        {weather.main.temp}° {unit === "metric" ? "C" : "F"}
      </p>
      {/* <Button onClick={toggleUnit}>Toggle {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}</Button>
       */}
      <ToggleButtonGroup
        // color=red
        exclusive
        value={unit}
        onChange={(event, newUnit) => {
          setUnit(newUnit);

          console.log(newUnit);
        }}
        aria-label="Platform"
      >
        <CustomToggleButton value="metric">Celsius</CustomToggleButton>
        <CustomToggleButton value="imperial">Farenheat</CustomToggleButton>
      </ToggleButtonGroup>
      <Button
        className="addfav"
        onClick={() => {
          addFavorite(weather.name);
        }}
      >
        Add to Favorites
      </Button>

      <h3>5-Day Forecast</h3>
      <div className="forecast">
        {forecast.map((day) => (
          <div key={day.dt}>
            <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>
              {day.main.temp}° {unit === "metric" ? "C" : "F"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
