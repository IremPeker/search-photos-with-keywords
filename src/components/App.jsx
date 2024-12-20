import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchData } from "../utils/dataUtils";
//import Unsplash from "unsplash-js";
import SearchContainer from "./SearchContainer";
import PhotoContainer from "./PhotoContainer";
import ErrorContainer from "./ErrorContainer";
//import photos from "unsplash-js/lib/methods/photos";
import UrlErrorContainer from "./UrlErrorContainer";
import LoaderContainer from "./LoaderContainer";
import Pagination from "./Pagination";

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [photos, setPhotos] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const page = Number(searchParams.get("page")) || 1; // Default to page 1
  const searchValue = searchParams.get("search") || "";
  const userName = searchParams.get("userName") || "";
  const perPage = 20;

  useEffect(() => {
    fetchData(page, perPage, searchValue, userName)
      .then((data) => {
        const { photos, totalPages } = data;
        if (data.length === 0) {
          setSearchError(true);
        } else {
          setPhotos(photos);
          setTotalPages(totalPages);
        }
      })
      .catch((error) => {
        setUrlError(true);
      });
  }, [photos?.length, page, perPage, searchValue, userName]);
  const updateSearchParams = (newParams) => {
    const params = {
      ...Object.fromEntries(searchParams.entries()),
      ...newParams,
    };
    // Remove keys with empty values
    Object.keys(params).forEach((key) => {
      if (!params[key]) {
        delete params[key];
      }
    });
    setSearchParams(params);
  };

  const handleNextPage = () => {
    updateSearchParams({
      userName: userName ?? "",
      search: searchValue ?? "",
      page: page + 1,
    });
  };

  const handlePreviousPage = () => {
    updateSearchParams({
      userName: userName ?? "",
      search: searchValue ?? "",
      page: Math.max(page - 1, 1),
    });
  };

  const handleSearch = (newSearchValue) => {
    updateSearchParams({ search: newSearchValue, userName: "", page: 1 });
  };

  const handleUserName = (newUserName) => {
    updateSearchParams({ userName: newUserName, search: "", page: 1 });
  };

  return (
    <div className="App">
      <SearchContainer
        handleSearch={handleSearch}
        setPhotos={setPhotos}
        searchValue={searchValue}
        userName={userName}
        handleUserName={handleUserName}
        page={page}></SearchContainer>

      {searchError ? (
        <ErrorContainer />
      ) : urlError ? (
        <UrlErrorContainer />
      ) : (
        <PhotoContainer
          allPhotos={photos}
          value={searchValue}
          userName={userName}
          handleUserName={handleUserName}></PhotoContainer>
      )}
      {!photos?.length && !urlError && !searchError && <LoaderContainer />}
      <Pagination
        page={page}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}></Pagination>
    </div>
  );
};

export default App;
