import React from "react";
import { WeatherForecast } from "../services/fetch-weather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faWind } from "@fortawesome/free-solid-svg-icons";
import { format, parseISO } from "date-fns";
import getWeatherIcon from "./WeatherIcon";

interface WeatherCardProps {
    forecast: WeatherForecast;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ forecast }) => {
    return (
        <div className="card h-100">
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

export default WeatherCard;
