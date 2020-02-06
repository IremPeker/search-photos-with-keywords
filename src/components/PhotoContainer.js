import React from "react";
import LoaderContainer from "./LoaderContainer";
import Masonry from "react-masonry-css";

class PhotoContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log(`PROPPPSSS inside photocontainer=>`, props);

    this.state = {
      value: "",
      breakpointColumnsObj: {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
      }
    };
  }

  getValue = value => {
    this.props.handleSearch(value);
    console.log(`VALUEEEE inside PHotoContainer=>`, value);
  };

  render() {
    const breakpointColumnsObj = this.state.breakpointColumnsObj;
    const photos = this.props.photos;
    const randomPhotos = photos.map(el => {
      return (
        <div className="img" key={el.id}>
          <p>Photo by {el.user.name}</p>
          <img
            className="photo-img"
            loader={<LoaderContainer></LoaderContainer>}
            src={el.urls.small}
            title={el.description}
            alt={el.alt_description}
          />
        </div>
      );
    });
    return (
      <div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {randomPhotos}
        </Masonry>
        <button
          type="button"
          onClick={this.props.loadMore}
          className="load-more-btn"
        >
          Next Page
        </button>
        ;
      </div>
    );
  }
}

export default PhotoContainer;
