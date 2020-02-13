import React from "react";
import Masonry from "react-masonry-css";

class PhotoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      breakpointColumnsObj: {
        default: 4,
        800: 2
      }
    };
  }

  getValue = value => {
    this.props.handleSearch(value);
  };

  render() {
    const breakpointColumnsObj = this.state.breakpointColumnsObj;
    const random = this.props.randomPhotos;
    const value = this.props.value;
    const all = random.map(el => {
      return (
        <div className="img" key={el.id}>
          <p>Photo by {el.user.name}</p>
          <img
            className="photo-img"
            src={el.urls.small}
            title={el.description}
            alt={el.alt_description}
          />
        </div>
      );
    });
    const searched = this.props.searchPhotos;
    const search = searched.map(el => {
      return (
        <div className="img" key={el.id}>
          <p className="photo-owner">Photo by {el.user.name}</p>
          <img
            className="photo-img"
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
          {value ? search : all}
        </Masonry>
        <button type="button" onClick={this.props.loadMore} className="moreBtn">
          Load More
        </button>
      </div>
    );
  }
}

export default PhotoContainer;
