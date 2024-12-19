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
  const [userName, setUserName] = useState(null);
  const perPage = 20;

  useEffect(() => {
    console.log("inside use effect, user name is changed");

    fetchData(page, perPage, searchValue, userName)
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
  }, [photos?.length, page, perPage, searchValue, urlError, userName]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));

  // const handleUserClick = async (username) => {
  //   const userPhotos = await fetchUserPhotos(page, perPage, searchValue, username);
  //   setPhotos(userPhotos);
  //   //setSelectedUser(username);
  // };

  return (
    <div className="App">
      <SearchContainer
        setSearchValue={setSearchValue}
        setPhotos={setPhotos}
        searchValue={searchValue}
        userName={userName}
        setUserName={setUserName}
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
          setUserName={setUserName}></PhotoContainer>
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
