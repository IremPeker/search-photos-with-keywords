import React, { useEffect, useState } from "react";

const SearchContainer = ({
  handleSearch,
  setPhotos,
  searchValue,
  userName,
  handleUserName,
}) => {
  const [warning, setWarning] = React.useState(false);
  const [inputValue, setInputValue] = useState(searchValue ?? "");

  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => setWarning(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [warning]);

  const handleChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
    setWarning(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length > 2) {
      setPhotos([]);
      handleSearch(inputValue.trim());
    } else {
      setWarning(true);
    }
  };

  const handleBackToRandomButton = () => {
    setInputValue("");
    handleUserName("");
    setWarning(false);
    handleSearch("");
  };

  const handleClear = () => {
    setInputValue("");
    handleSearch("");
    setWarning(false);
  };

  return (
    <div className="search-container" data-testid="search-container">
      <div className="search-container__search-wrapper">
        <div className="search-container__search-wrapper__input-wrapper">
          <label htmlFor="search-input"></label>
          <input
            id="search-input"
            className="search-container__search-wrapper__input-wrapper__search-input"
            data-testid="search-input"
            type="text"
            minLength={2}
            onChange={handleChange}
            value={inputValue}
          />
          {inputValue && (
            <button
              className="search-container__search-wrapper__input-wrapper__clear-button"
              onClick={handleClear}
              aria-label="Clear input">
              X
            </button>
          )}
        </div>
        <div className="search-container__search-wrapper__button-wrapper">
          <button
            className="search-container__search-wrapper__button-wrapper__search-button"
            data-testid="search-button"
            onClick={handleSubmit}>
            Search
          </button>
          {searchValue || userName ? (
            <button
              className="search-container__search-wrapper__button-wrapper__random-button"
              onClick={handleBackToRandomButton}>
              Back To Random Photos
            </button>
          ) : null}
        </div>
      </div>

      {warning && (
        <small className="search-container__warning">
          Keyword must be at least 3 characters!
        </small>
      )}
    </div>
  );
};

export default SearchContainer;
