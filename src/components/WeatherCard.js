import React from 'react';
import { FaWind, FaTemperatureHigh, FaCloud, FaEye, FaCompressArrowsAlt, FaTint, FaSun, FaMoon } from 'react-icons/fa';

const WeatherCard = ({ weatherData }) => {

    const formatTime = (timestamp) => new Date(timestamp * 1000).toLocaleTimeString();

    return weatherData ? (
        
        <div className="glass current-weather-card">
            <div className='icon-el'> 
                <h2>{weatherData.name}</h2>
                <div>
                    <img
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={weatherData.weather[0].description}
                    />
                    
                </div>
            </div>

            <div>
                <p className='temp-el'>{Math.round(weatherData.main.temp)}°C</p>
                <p>{weatherData.weather[0].description} {Math.round(weatherData.main.temp_min)}°/{Math.round(weatherData.main.temp_max)}°</p>
            </div>

            <div className="weather-grid">
                <div className="weather-card">
                    <FaTemperatureHigh />
                    <p>Feels Like: {weatherData.main.feels_like}°C</p>
                </div>
                <div className="weather-card">
                    <FaTint />
                    <p>Humidity: {weatherData.main.humidity}%</p>
                </div>
                <div className="weather-card">
                    <FaEye />
                    <p>Visibility: {weatherData.visibility / 1000} km</p>
                </div>
                <div className="weather-card">
                    <FaWind />
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                </div>
                <div className="weather-card">
                    <FaCompressArrowsAlt />
                    <p>Air Pressure: {weatherData.main.pressure} hPa</p>
                </div>
                <div className="weather-card">
                    <FaCloud />
                    <p>Sea Level: {weatherData.main.sea_level || 'N/A'} m</p>
                </div>
            </div>

            <div className="sun-times">
                <div className="sun-card">
                    <FaSun />
                    <p>Sunrise: {formatTime(weatherData.sys.sunrise)}</p>
                </div>
                <div className="sun-card">
                    <FaMoon />
                    <p>Sunset: {formatTime(weatherData.sys.sunset)}</p>
                </div>
            </div>
        </div>
        
    ) : (
        <p>Loading...</p>
    );
};

export default WeatherCard;
