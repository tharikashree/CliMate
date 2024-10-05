import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import WeatherAccordion from './components/WeatherAccordion';
import LifestyleTips from './components/LifestyleTips';
import './App.css';
import axios from 'axios';


const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    fetchWeatherData();
  }, []);

  // Function to fetch weather data
  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      if (cityName) {
        const urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
        const { data } = await axios.get(urlCity);
        setCurrentWeather(data);
        setBackgroundImage(getBackgroundImage(data.weather[0].main));
      }
      else {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
          const { data } = await axios.get(url);
          setCurrentWeather(data);
          setBackgroundImage(getBackgroundImage(data.weather[0].main));
        });
      }
    }
    catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Could not fetch weather data. Please check the city name.');
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundImage = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        return '/images/clear-sky.avif';
      case 'Clouds':
        return '/images/cloudy.avif';
      case 'Rain':
        return '/images/rainy.avif';
      case 'Snow':
        return '/images/snowy.avif';
      case 'Mist':
        return '/images/mist.avif';
      case 'Fog':
        return '/images/foggy.avif';
      case 'Thunderstorm':
        return '/images/thunderstorm.avif';
      default:
        return '/images/weather.avif';
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData(city);
    setCity('');
  };

  return (
    <div>
      <h1 className='header-el'>CliMate</h1>
      <div className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="glass">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="search-bar"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
          {currentWeather && (
            <WeatherCard weatherData={currentWeather} />
          )}
          {currentWeather && <WeatherAccordion weatherData={currentWeather} />}
          {currentWeather && <LifestyleTips weatherData={currentWeather} />}
        </div>
      </div>
    </div>


  );
};

export default App;
