import React from "react";
import Masonry from "react-masonry-css";
import { capitalizeFirstLetter } from "../utils/stringUtils";

const PhotoContainer = ({
  allPhotos,
  userName,
  searchValue,
  handleUserName,
}) => {
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
          `{el.user.first_name} {el.user.last_name}`
        </a>
      </p>
      <p className="photo-wrapper__photo-description">
        {capitalizeFirstLetter(el.description ?? el.alt_description)}
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
    <div data-testid="photo-container">
      <h2 className="photo-container__header">
        {userName
          ? `Photos from selected user`
          : searchValue
          ? `Photos with keyword "${searchValue}"`
          : "Random Photos from Unsplash"}
      </h2>
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
