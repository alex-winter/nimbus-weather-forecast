import React from "react";
import { LocationResult } from "../services/fetch-location";

interface LocationListProps {
    locations: LocationResult[] | null;
    handleLocationSelect: (location: LocationResult) => void;
    setVisible: (isVisible: boolean) => void;
    visible: boolean;
}

const LocationList: React.FC<LocationListProps> = ({ locations, handleLocationSelect, setVisible, visible }) => {

    if (!locations || locations.length === 0 || !visible) {
        return null;
    }

    const handleClick = (location: LocationResult) => {
        handleLocationSelect(location);
        setVisible(false);
    };

    return (
        <ul className="list-group">
            {locations.map((loc) => (
                <li
                    key={loc.id}
                    className="list-group-item p-3"
                    onClick={() => handleClick(loc)}
                    style={{ cursor: "pointer" }}
                >
                    {loc.name}, {loc.country}
                </li>
            ))}
        </ul>
    );
};

export default LocationList;
