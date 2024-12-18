import React from "react";
import Masonry from "react-masonry-css";

const PhotoContainer = ({ allPhotos }) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  const photos = allPhotos?.map((el) => (
    <div className="img" key={el.id}>
      <p>Photo by {el.user.name}</p>
      <img
        className="photo-img"
        src={el.urls.small}
        title={el.description}
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
