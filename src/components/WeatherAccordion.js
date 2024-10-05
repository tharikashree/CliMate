import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherAccordion = ({ weatherData }) => {
    const [forecast, setForecast] = useState([]);
    const [loading,setLoading] =useState(false)
    const { name } = weatherData;
    useEffect(() => {

        fetchForecastData(name);
    }, [name]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return `${date.toLocaleDateString('en-US', { weekday: 'long' })}, ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}`; // Get the day of the week
    };
    const fetchForecastData = async (cityName) => {
        setLoading(true);
        try {
            const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
            if (cityName) {
                const urlCity = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
                const { data } = await axios.get(urlCity);
                setForecast(data.list.filter((_, idx) => idx % 8 === 0));
            
            }
            else {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
                    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

                    const { data } = await axios.get(url);
                    setForecast(data.list.filter((idx) => idx % 8 === 0)); 
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
    return (
        <div className="glass weather-accordion">
            {forecast.map((day, idx) => (
                <details key={idx}>
                    <summary>{formatDate(day.dt)}</summary>
                    <img
                        src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                        alt="Weather icon"
                    ></img>
                    <p>{Math.round(day.main.temp)}°C </p>
                    <p>{weatherData.weather[0].description}</p>
                    <span className='min_max'>{Math.round(weatherData.main.temp_min)}°/{Math.round(weatherData.main.temp_max)}°</span>
                    
                </details>
            ))}
        </div>
    );

};

export default WeatherAccordion;
