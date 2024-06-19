import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

console.log(API_KEY);

export const getWeather = async (city, unit = "metric") => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
  );
  return response.data;
};

export const getForecast = async (city, unit = "metric") => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
  );

  return response.data.list.filter((item, index) => index % 8 === 0);
};
