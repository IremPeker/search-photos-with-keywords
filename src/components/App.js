import React from "react";
import "../css/App.scss";
import Unsplash from "unsplash-js";
import SearchContainer from "./SearchContainer";
import PhotoContainer from "./PhotoContainer";
import ErrorContainer from "./ErrorContainer";
import photos from "unsplash-js/lib/methods/photos";

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(`10)PROPS INSIDE APP.JS`, props);

    this.state = {
      randomPhotos: [],
      searchPhotos: [],
      value: "",
      showRandomButton: false,
      error: false,
      page: 1
    };
    this.fetchData = this.fetchData.bind(this);
    this.loadMorePages = this.loadMorePages.bind(this);
  }

  async fetchData(value) {
    console.log(`1) fetchdata starts...`);

    let url = "";
    const accessKey = `${process.env.REACT_APP_API_KEY}`;
    let show = false;

    if (value) {
      show = true;
      this.setState({ page: this.state.page + 1 });
      url = `https://api.unsplash.com/search/photos?client_id=${accessKey}&page=${this.state.page}&per_page=10&query=${value}`;
    } else {
      show = false;
      this.setState({ page: this.state.page + 1 });
      url = `https://api.unsplash.com/photos?client_id=${accessKey}&page=${this.state.page}&per_page=10`;
    }

    console.log(`2) url is=>`, url);
    try {
      const response = await fetch(url, {
        method: "get",
        headers: {
          "X-Per-Page": 30
        }
      });
      const allPhotos = await response.json();
      const searchPhotos = allPhotos.results;

      console.log(`ALLPHOTOS=>`, allPhotos, `SEARCHPHOTOS`, searchPhotos);

      if (!value) {
        console.log(`3) inside if allphotos.length > 0=>`);

        this.setState({
          randomPhotos: [...allPhotos, ...this.state.randomPhotos],
          showRandomButton: show,
          error: false
        });
        console.log(
          `inside allPhotos.length>0, this.state.randomPhotos=>`,
          this.state.randomPhotos,
          `allPhotos=>`,
          allPhotos
        );
      } else {
        this.setState({
          searchPhotos: [...searchPhotos, ...this.state.searchPhotos],
          value: value,
          showRandomButton: show,
          error: false
        });
        console.log(
          `4) inside value`,
          searchPhotos,
          `this.state.searchPhotos=>`,
          this.state.searchPhotos
        );
      }
    } catch (error) {
      this.setState({ error: true });
    }
  }

  componentDidMount() {
    console.log(`6) componentDidMount...`);
    this.fetchData();
  }

  loadMorePages = () => {
    let searchValue = this.state.value;
    console.log(`7) loadMorePages onclick...searchValue=>`, searchValue);
    if (searchValue) {
      this.fetchData(searchValue);
    } else {
      this.fetchData();
    }
  };

  render() {
    console.log(`8) render...`);
    return (
      <div className="app">
        <SearchContainer handleSearch={this.fetchData}></SearchContainer>
        {this.state.showRandomButton && (
          <div>
            <button
              className="randomBtn"
              onClick={() => {
                this.fetchData();
              }}
            >
              Back To Random Photos
            </button>
          </div>
        )}

        {this.state.error ? (
          <ErrorContainer></ErrorContainer>
        ) : (
          <PhotoContainer
            randomPhotos={this.state.randomPhotos}
            searchPhotos={this.state.searchPhotos}
            value={this.state.value}
            loadMore={this.loadMorePages}
          ></PhotoContainer>
        )}
      </div>
    );
  }
}

export default App;

// ADD ERROR MESSAGE
