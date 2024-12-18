import React from "react";

const SearchContainer = (props) => {
  const { setSearchValue, setPhotos, searchValue } = props;
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
      <div className="search__input-and-button-wrapper">
        <label htmlFor="search-input"></label>
        <input
          id="search-input"
          className="search__input-and-button-wrapper__search-input"
          type="text"
          minLength={2}
          onChange={handleChange}
          value={searchValue}
        />

        <button
          className="search__input-and-button-wrapper__search-button"
          onClick={handleSubmit}>
          Search
        </button>
      </div>

      {warning && <small>Keyword must be at least 3 characters!</small>}
    </div>
  );
};

export default SearchContainer;
