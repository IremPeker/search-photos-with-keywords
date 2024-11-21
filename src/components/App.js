import React from "react";
import "../css/App.scss";
//import Unsplash from "unsplash-js";
import SearchContainer from "./SearchContainer";
import PhotoContainer from "./PhotoContainer";
import ErrorContainer from "./ErrorContainer";
//import photos from "unsplash-js/lib/methods/photos";
import UrlErrorContainer from "./UrlErrorContainer";
import LoaderContainer from "./LoaderContainer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomPhotos: [],
      searchPhotos: [],
      value: "",
      showRandomButton: false,
      searchError: false,
      urlError: false,
      page: 1,
    };
    this.fetchData = this.fetchData.bind(this);
    this.loadMorePages = this.loadMorePages.bind(this);
    this.backToRandom = this.backToRandom.bind(this);
    this.getTheValue = this.getTheValue.bind(this);
  }

  async fetchData(value) {
    let url = "";
    const accessKey = `${process.env.REACT_APP_API_KEY}`;

    let show = false;

    if (value) {
      show = true;
      url = `https://api.unsplash.com/search/photos?client_id=${accessKey}&page=${this.state.page}&per_page=14&query=${value}`;
      this.setState({ page: this.state.page + 1 });
    } else {
      show = false;
      this.setState({ page: this.state.page + 1 });
      url = `https://api.unsplash.com/photos?client_id=${accessKey}&page=${this.state.page}&per_page=14`;
    }

    try {
      const response = await fetch(url, {
        method: "get",
      });
      const allPhotos = await response.json();
      const searchPhotos = allPhotos.results;

      if (allPhotos.length > 0) {
        this.setState({
          randomPhotos: [...this.state.randomPhotos, ...allPhotos],
          value: value,
          showRandomButton: show,
          searchError: false,
        });
      } else if (searchPhotos.length > 0) {
        this.setState({
          searchPhotos: [...this.state.searchPhotos, ...searchPhotos],
          value: value,
          showRandomButton: show,
          searchError: false,
        });
      } else {
        this.setState({
          showRandomButton: show,
          searchError: true,
        });
      }
    } catch (error) {
      this.setState({
        urlError: true,
      });
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  loadMorePages = () => {
    let searchValue = this.state.value;
    if (searchValue) {
      this.fetchData(searchValue);
    } else {
      this.fetchData();
    }
  };

  backToRandom = () => {
    this.setState({
      value: "",
    });
    this.fetchData();
  };

  getTheValue = (value) => {
    this.setState({
      randomPhotos: [],
      searchPhotos: [],
    });
    this.fetchData(value);
  };

  render() {
    return (
      <div className="app">
        <SearchContainer
          handleSearch={this.getTheValue}
          page={this.state.page}></SearchContainer>
        {this.state.showRandomButton && (
          <div>
            <button className="random-button" onClick={this.backToRandom}>
              Back To Random Photos
            </button>
          </div>
        )}

        {this.state.searchError ? (
          <ErrorContainer></ErrorContainer>
        ) : this.state.urlError ? (
          <UrlErrorContainer></UrlErrorContainer>
        ) : (
          <PhotoContainer
            randomPhotos={this.state.randomPhotos}
            searchPhotos={this.state.searchPhotos}
            value={this.state.value}
            loadMore={this.loadMorePages}></PhotoContainer>
        )}
      </div>
    );
  }
}

export default App;
