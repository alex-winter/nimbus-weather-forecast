import React, { useState, useEffect } from "react";
import { LocationResult, searchLocations } from "./services/fetch-location";
import { getWeatherForecast, WeatherForecast } from "./services/fetch-weather";
import SearchBar from "./components/SearchBar";
import LocationList from "./components/LocationList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import WeatherForecastDisplay from "./components/WeatherForecastDisplay";
import Earth from './components/Earth'

interface Position {
  long: number;
  lat: number;
}

function App() {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState<LocationResult[] | null>(null);
  const [weather, setWeather] = useState<WeatherForecast[] | null>(null);
  const [visible, setVisible] = useState<boolean>(true);
  const [position, setPosition] = useState<Position>({ long: 0, lat: 0 });

  useEffect(() => {
    const fetchLocations = async () => {
      if (query.length > 2) {
        const results = await searchLocations(query);
        setLocations(results);
        setVisible(true);
      } else {
        setLocations(null);
        setWeather(null);
      }
    };

    fetchLocations();
  }, [query]);

  const handleLocationSelect = async (location: LocationResult) => {
    const locationName = location.name + ', ' + location.country

    setQuery(locationName);
    setLocations(null);

    setPosition({ long: location.longitude, lat: location.latitude });

    const forecast = await getWeatherForecast(locationName);
    setWeather(forecast);
    setVisible(false);
  };

  return (
      <>
        <Earth latitude={position.lat} longitude={position.long} />
        <div className="container d-flex flex-column">
          <div className="flex-grow-1 text-center">
            <img className="icon m-4" src="/logo-2.png" alt="nimbus icon"/>
            <SearchBar query={query} setQuery={setQuery} />
            <LocationList locations={locations} handleLocationSelect={handleLocationSelect} setVisible={setVisible} visible={visible} />
          </div>
          <div className="flex-grow-1">
            <WeatherForecastDisplay weather={weather} />
          </div>
        </div>
      </>
  );
}

export default App;
