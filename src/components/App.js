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
      photos: [],
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
    // const secretKey =
    //   "f85c89a68d39a21e4d45f5f7354c137ce392aabab4d7acf95b3aeb7d2802c714";
    let show = false;
    // const unsplash = new Unsplash({
    //   accessKey: accessKey,
    //   headers: {
    //     "X-Per-Page": "30"
    //   }
    // });

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

      if (allPhotos.length > 0) {
        console.log(`3) inside if allphotos.length > 0=>`);

        this.setState({
          photos: allPhotos,
          value: value,
          showRandomButton: show,
          error: false
        });
        console.log(`allPhotos.length>0=>`, this.state.photos); // if there is no value
        // } else if (allPhotos.length > 10) {
        //   console.log(`9) inside if allphotos.length > 10=>`);

        //   this.setState({
        //     photos: this.state.photos,
        //     showRandomButton: show,
        //     error: false
        //   });
        //   console.log(`allPhotos.length>0=>`, this.state.photos); // if there is no value
      } else if (value) {
        console.log(`4) inside value & searchphotos.lenght>0=>`);

        this.setState({
          photos: searchPhotos,
          value: value,
          showRandomButton: show,
          error: false,
          page: this.state.page + 1
        });
        console.log(`4) this.state.photos=>`, this.state.photos); // if there is no value
      } else {
        console.log(`5) inside else`);

        this.setState({
          photos: [],
          showRandomButton: show,
          error: true
        });
        console.log(`5) this.state.photos=>`, this.state.photos); // if there is no value
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
    console.log(`7) loadMorePages onclick...`);
    this.fetchData();
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
            photos={this.state.photos}
            value={this.state.value}
            loadMore={this.loadMorePages}
          ></PhotoContainer>
        )}
      </div>
    );
  }
}

export default App;

// check with the one in your drive
//https://www.robinwieruch.de/react-paginated-list
// figure out why it doesnt go to the next page on click
