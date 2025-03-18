import React, { useEffect, useState } from "react";
import { WeatherForecast } from "../../services/fetch-weather.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faWind } from "@fortawesome/free-solid-svg-icons";
import { format, parseISO } from "date-fns";
import getWeatherIcon from "../WeatherIcon.tsx";
import './styles.css'

interface WeatherCardProps {
    forecast: WeatherForecast;
}

const WeatherDayCard: React.FC<WeatherCardProps> = ({ forecast }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`card h-100 weather-card ${isVisible ? 'weather-card-visible' : ''}`}>
            <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title text-center">{format(parseISO(forecast.date), "EEEE / MMM d")}</h5>
                <p className="text-center">{getWeatherIcon(forecast.description)}</p>
                <p className="text-center"><strong>{forecast.description}</strong></p>
                <p className="text-center temp-highs"><FontAwesomeIcon icon={faArrowUp} /> {forecast.temperatureCHigh}°C</p>
                <p className="text-center temp-lows"><FontAwesomeIcon icon={faArrowDown} /> {forecast.temperatureCLow}°C</p>
                <p className="text-center"><FontAwesomeIcon icon={faWind} /> {forecast.windSpeedKph} km/h</p>
            </div>
        </div>
    );
};

export default WeatherDayCard;
