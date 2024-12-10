import React, { useEffect, useState } from "react";
import "../css/App.scss";
import { fetchData } from "../utils/dataUtils";
//import Unsplash from "unsplash-js";
import SearchContainer from "./SearchContainer";
import PhotoContainer from "./PhotoContainer";
import ErrorContainer from "./ErrorContainer";
//import photos from "unsplash-js/lib/methods/photos";
import UrlErrorContainer from "./UrlErrorContainer";
import LoaderContainer from "./LoaderContainer";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [searchPhotos, setSearchPhotos] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showRandomButton, setShowRandomButton] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!photos.length) {
      fetchData(page, searchValue);
    }
  }, []);

  // async fetchData(value) {
  //   let url = "";
  //   const accessKey = `${process.env.REACT_APP_API_KEY}`;

  //   let show = false;

  //   if (value) {
  //     show = true;
  //     url = `https://api.unsplash.com/search/photos?client_id=${accessKey}&page=${this.state.page}&per_page=14&query=${value}`;
  //     this.setState({ page: this.state.page + 1 });
  //   } else {
  //     show = false;
  //     this.setState({ page: this.state.page + 1 });
  //     url = `https://api.unsplash.com/photos?client_id=${accessKey}&page=${this.state.page}&per_page=14`;
  //   }

  //   try {
  //     const response = await fetch(url, {
  //       method: "get",
  //     });
  //     const allPhotos = await response.json();
  //     const searchPhotos = allPhotos.results;

  //     if (allPhotos.length > 0) {
  //       this.setState({
  //         randomPhotos: [...this.state.randomPhotos, ...allPhotos],
  //         value: value,
  //         showRandomButton: show,
  //         searchError: false,
  //       });
  //     } else if (searchPhotos.length > 0) {
  //       this.setState({
  //         searchPhotos: [...this.state.searchPhotos, ...searchPhotos],
  //         value: value,
  //         showRandomButton: show,
  //         searchError: false,
  //       });
  //     } else {
  //       this.setState({
  //         showRandomButton: show,
  //         searchError: true,
  //       });
  //     }
  //   } catch (error) {
  //     this.setState({
  //       urlError: true,
  //     });
  //   }
  // }

  const loadMorePages = () => {
    if (searchValue) {
      //this.fetchData(searchValue);
    } else {
      //this.fetchData();
    }
  };

  const backToRandom = () => {
    // this.setState({
    //   value: "",
    // });
    // this.fetchData();
  };

  const getTheValue = (value) => {
    // this.setState({
    //   randomPhotos: [],
    //   searchPhotos: [],
    // });
    // this.fetchData(value);
  };

  return (
    <div className="app">
      <SearchContainer
        // handleSearch={this.getTheValue}
        page={page}></SearchContainer>
      {showRandomButton && (
        <div>
          <button className="random-button" onClick={backToRandom}>
            Back To Random Photos
          </button>
        </div>
      )}

      {searchError ? (
        <ErrorContainer />
      ) : urlError ? (
        <UrlErrorContainer />
      ) : (
        <PhotoContainer
          randomPhotos={photos}
          searchPhotos={searchPhotos}
          value={searchValue}
          loadMore={loadMorePages}></PhotoContainer>
      )}
    </div>
  );
};

export default App;
