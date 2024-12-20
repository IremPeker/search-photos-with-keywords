import React from "react";
import Masonry from "react-masonry-css";

const PhotoContainer = ({ allPhotos, handleUserName }) => {
  const breakpointColumnsObj = {
    default: 4, // 4 columns for default screen size
    1100: 3, // 3 columns for screen widths <= 1100px
    700: 2, // 2 columns for screen widths <= 700px
    500: 1, // 1 column for screen widths <= 500px
  };

  const photos = allPhotos?.map((el) => (
    <div className="photo-wrapper" key={el.id}>
      <p className="photo-wrapper__photo-credit">
        Photo by{" "}
        <a
          className="photo-wrapper__photo-credit__username"
          onClick={() => handleUserName(el.user.username)}
          title="Click if you want to see more photos from this user">
          {el.user.username}
        </a>
      </p>
      <p className="photo-wrapper__photo-description">
        {el.description ?? el.alt_description}
      </p>
      <img
        className="photo-wrapper__photo-img"
        src={el.urls.small}
        title={el.description ?? el.alt_description}
        alt={el.alt_description}
      />
    </div>
  ));

  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {photos}
      </Masonry>
    </div>
  );
};

export default PhotoContainer;
