import React, { useEffect, useState } from "react";
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
  const [photos, setPhotos] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  useEffect(() => {
    // const loadPhotos = async () => {
    //   const fetchedPhotos = await fetchData(
    //     page,
    //     perPage,
    //     searchValue,
    //     setUrlError
    //   );
    //   setPhotos(fetchedPhotos);
    // };

    fetchData(page, perPage, searchValue)
      .then((data) => {
        if (data.length === 0) {
          setSearchError(true);
        } else {
          setPhotos(data);
        }
      })
      .catch((error) => {
        setUrlError(true);
      });

    // if (!photos.length) {
    //   loadPhotos();
    // }
    //loadPhotos();
    // if (searchValue) {
    //   console.log("inside use effect, search value is: ", searchValue);
    // }
  }, [photos?.length, page, perPage, searchValue, urlError]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div className="App">
      <SearchContainer
        setSearchValue={setSearchValue}
        setPhotos={setPhotos}
        searchValue={searchValue}
        page={page}></SearchContainer>
      {searchValue && (
        <div>
          <button
            className="app__random-button"
            onClick={() => setSearchValue("")}>
            Back To Random Photos
          </button>
        </div>
      )}

      {searchError ? (
        <ErrorContainer />
      ) : urlError ? (
        <UrlErrorContainer />
      ) : (
        <PhotoContainer allPhotos={photos} value={searchValue}></PhotoContainer>
      )}
      {!photos?.length && !urlError && <LoaderContainer />}
      <Pagination
        page={page}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}></Pagination>
    </div>
  );
};

export default App;
