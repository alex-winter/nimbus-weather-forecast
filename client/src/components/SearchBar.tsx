import React from "react";

interface SearchBarProps {
    query: string;
    setQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
    return (
        <div className="d-flex justify-content-center">
            <div className="col-sm-12 col-md-8 col-lg-6 col-xl-6">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Type region, country"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
