import React from "react";

interface SearchBarProps {
    query: string;
    setQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
    const handleClear = () => {
        setQuery(''); // Clear the input field
    };

    return (
        <div className="d-flex justify-content-center">
            <div className="col-sm-12 col-md-8 col-lg-6 col-xl-6">
                <div className="mb-3 position-relative">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Type region, country"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {query && ( // Only show the clear button if there is text in the input
                        <button
                            className="btn btn-danger position-absolute clear-button"
                            type="button"
                            onClick={handleClear}
                            aria-label="Clear input"
                        >
                            <span style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>×</span> {/* Cross icon */}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
