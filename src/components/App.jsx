import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchData } from "../utils/dataUtils";
import SearchContainer from "./SearchContainer";
import PhotoContainer from "./PhotoContainer";
import ErrorContainer from "./ErrorContainer";
import UrlErrorContainer from "./UrlErrorContainer";
import LoaderContainer from "./LoaderContainer";
import Pagination from "./Pagination";
import ScrollToTopButton from "./ScrollToTop";

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [photos, setPhotos] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const page = Number(searchParams.get("page")) || 1; // Default to page 1
  const searchValue = searchParams.get("search") || "";
  const userName = searchParams.get("userName") || "";
  const perPage = 20;

  useEffect(() => {
    fetchData(page, perPage, searchValue, userName)
      .then((data) => {
        const { photos, totalPages } = data;
        if (photos.length === 0) {
          setSearchError(true);
        } else {
          setSearchError(false);
          setPhotos(photos);
          setTotalPages(totalPages);
        }
      })
      .catch((error) => {
        setUrlError(true);
      });
    setLoading(false);
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
        <>
          <PhotoContainer
            allPhotos={photos}
            value={searchValue}
            userName={userName}
            handleUserName={handleUserName}></PhotoContainer>
          <Pagination
            page={page}
            totalPages={totalPages}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}></Pagination>
          <ScrollToTopButton />
        </>
      )}
      {loading && <LoaderContainer />}
    </div>
  );
};

export default App;
