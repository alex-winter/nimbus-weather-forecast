import React from "react";
import { WeatherForecast } from "../services/fetch-weather";
import WeatherDayCard from "./weather-day-card/WeatherDayCard.tsx";

interface WeatherForecastProps {
    weather: WeatherForecast[] | null;
}

const WeatherForecastDisplay: React.FC<WeatherForecastProps> = ({ weather }) => {
    if (!weather) return null;

    return (
        <div className="mt-4">
            <div className="d-flex justify-content-center gap-3 flex-wrap">
                {weather.map((day, index) => (
                    <WeatherDayCard key={index} forecast={day} />
                ))}
            </div>
        </div>
    );
};

export default WeatherForecastDisplay;
