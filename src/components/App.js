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

      console.log(`ALLPHOTOS=>`, allPhotos, `SEARCHPHOTOS`, searchPhotos);

      if (!value) {
        console.log(`3) inside if allphotos.length > 0=>`);

        this.setState({
          photos: [...allPhotos, ...this.state.photos],
          value: value,
          showRandomButton: show,
          error: false
        });
        console.log(
          `inside allPhotos.length>0, this.state.photos=>`,
          this.state.photos,
          `allPhotos=>`,
          allPhotos
        );
      } else {
        this.setState({
          photos: [...searchPhotos, ...this.state.photos],
          value: value,
          showRandomButton: show,
          error: false
        });
        console.log(
          `4) inside value`,
          searchPhotos,
          `this.state.photos=>`,
          this.state.photos // this.state.photos holds the old value here
        );
      }
      // else (searchPhotos.length === 10) {
      //   this.setState((prevState, searchPhotos) => {
      //     return {
      //       photos: [...prevState.photos, ...searchPhotos]
      //     };
      //   });

      //   console.log(
      //     `4) inside searchphotos=>`,
      //     `prevState.photos is=>`,
      //     `searchPhotos is=>`,
      //     searchPhotos,
      //     `allPhotos=>`,
      //     allPhotos,
      //     `this.state.photos=>`,
      //     this.state.photos
      //   );
      // }
      // else {
      //   console.log(`5) inside else`);

      //   this.setState({
      //     photos: [],
      //     showRandomButton: show,
      //     error: true
      //   });
      //   // console.log(`5) this.state.photos=>`, this.state.photos); // if there is no value
      // }
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
