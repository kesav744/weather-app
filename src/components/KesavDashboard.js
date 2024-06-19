import { useState, useEffect, useCallback } from "react";
import Search from "./Search";
import WeatherDisplay from "./WeatherDisplay";
import Favorites from "./Favorites";
import { getWeather, getForecast } from "../weatherService";
import "./KesavDashboar.css";
import axios from "axios";
// import Header from '../components/Header';

const KesavDashboard = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState("metric");

  const fetchWeather = useCallback(
    async (city) => {
      try {
        const weatherData = await getWeather(city, unit);
        const forecastData = await getForecast(city, unit);
        setWeather(weatherData);
        setForecast(forecastData);
        localStorage.setItem("lastCity", city);
      } catch (error) {
        console.log("show errr", error.response.status);
        localStorage.removeItem("lastCity");
        if (error.response.status === 404) {
          alert("Enter a valid City Name.");
        }
      }
    },
    [unit]
  );

  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      fetchWeather(lastCity);
    }
  }, [fetchWeather]);

  const addFavorite = (city) => {
    if (!favorites.find((item) => item.name === city)) {
      axios
        .post("http://localhost:3001/favorites", { name: city })
        .then((response) => setFavorites([...favorites, response.data]));
    }
  };

  return (
    <>
      {/* <Header></Header> */}
      <div className="dashboard">
        <Search fetchWeather={fetchWeather} />
        {weather && (
          <WeatherDisplay
            weather={weather}
            forecast={forecast}
            unit={unit}
            setUnit={setUnit}
            addFavorite={addFavorite}
          />
        )}
        <Favorites
          favorites={favorites}
          setFavorites={setFavorites}
          fetchWeather={fetchWeather}
        />
      </div>
    </>
  );
};

export default KesavDashboard;
