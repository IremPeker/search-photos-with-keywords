import React from "react";
import Masonry from "react-masonry-css";

const PhotoContainer = ({ allPhotos, userName, setUserName }) => {
  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    1000: 2,
    800: 1,
    600: 1,
  };

  const photos = allPhotos?.map((el) => (
    <div className="photo-wrapper" key={el.id}>
      <p className="photo-wrapper__photo-credit">
        Photo by{" "}
        <a
          className="photo-wrapper__photo-credit__username"
          onClick={() => setUserName(el.user.username)}
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
