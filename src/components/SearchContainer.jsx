import React from "react";

const SearchContainer = ({
  setSearchValue,
  setPhotos,
  searchValue,
  userName,
  setUserName,
}) => {
  const [warning, setWarning] = React.useState(false);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    setWarning(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.length > 2) {
      setPhotos([]);
    } else {
      setWarning(true);
    }
  };

  return (
    <div className="search">
      <div className="search__search-wrapper">
        <label htmlFor="search-input"></label>
        <input
          id="search-input"
          className="search__search-wrapper__search-input"
          type="text"
          minLength={2}
          onChange={handleChange}
          value={searchValue}
        />
        <div className="search__search-wrapper__button-wrapper">
          <button
            className="search__search-wrapper__button-wrapper__search-button"
            onClick={handleSubmit}>
            Search
          </button>
          {searchValue ||
            (userName && (
              <button
                className="search__search-wrapper__button-wrapper__random-button"
                onClick={() => {
                  setSearchValue("");
                  setUserName(null);
                }}>
                Back To Random Photos
              </button>
            ))}
        </div>
      </div>

      {warning && <small>Keyword must be at least 3 characters!</small>}
    </div>
  );
};

export default SearchContainer;
